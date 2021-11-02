window.onload = function() {
////Light mode detection
let backgroundPage = document.querySelector('img');

if(!localStorage.getItem('mode')) {
   principalStorage();
 } else {
   setLight();
 }



 function principalStorage() {
   localStorage.getItem('mode', 'dark');
   document.body.classList.toggle('dark');
   backgroundPage.src = "./assets/images/dotsv2.svg";
   
   //setLight();
 }

 function setLight() {
   document.body.classList.toggle('light');
   backgroundPage.src = "./assets/images/dots-light.svg";
 }

/////////////////////////////////////////////////////////////////////////




    let params = new URLSearchParams(document.location.search.substring(1));
    //console.log(params.get("id"));
    
    //affiche l'ID de l'album
    //let idalbum = '<p>' + params.get("id") + '</p>';
    //document.querySelector('div').innerHTML = idalbum;

    loadalbumtracks (params.get("id"))

}

function loadToken (){
    // récupère le Token stockée dans le navigateur avec sessionStorage
    return sessionStorage.getItem('Token');
}

function loadalbumtracks (param) {
    // récupère le token
    let token = loadToken();
    //création de l'url qui va envoyer la demande à l'api
    let url = 'http://api-music.test/api/albums/' + param;

    //fetch communique avec l'API par l'intermediaire de l'URL
    fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
          }
    })
    //récupération de la promesse de réponse
    //formatage de la réponse en JSON
    .then(response => response.json())
    .then(post => 
    {
        //affiche le titre de l'album
        let title = document.querySelector("h1");
        title.innerText = post.name;
        //affiche l'image de l'album
        let myalbum = '<img src="' + post.picture + '" alt="Artist" id="img">';
        document.querySelector("#div1").innerHTML = myalbum;
        //recherche le nom de l'artiste de l'album
        apiArtist(post.artist);
        //recherche les pistes de l'album
        apitracks(post.tracks);
 /**
  * recherche les timer des tracks
  * 
  * apitrack(post.time)
  *  */       
    })
}

function loadToken (){
    // récupère le Token stockée dans le navigateur avec sessionStorage
    return sessionStorage.getItem('Token');
}

function apitracks (tracks) {
    // récupère le token
    let token = loadToken();
    let myuldiv = document.createElement('ul');
        tracks.forEach(track => {
            fetch('http://api-music.test' + track, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        
            //récupération de la promesse de réponse
            //formatage de la réponse en JSON
            .then(response => response.json())
            .then(piste => 
                {
                    console.log("Nom de la piste musicale : " + piste.name)
                    console.log("id de la piste "+piste.id);
                    console.log("li : " +'<a href="album.html?id="' + piste.id + '" class="trackEvent">'  + piste.name + "</a><span>/" + piste.time + "</span>");
                    //crée la ligne LI avec le titre de la piste, le temps et l'ID
                    let li = document.createElement('li');
                    li.innerHTML = '<a href="player.html?id=' + piste.id + '" class="trackEvent">'  + piste.name + "</a><span>/" + timeTrack(piste.time) + "</span>";
                    myuldiv.append(li);

                    document.querySelector("#div2").append(myuldiv);
                })
            .catch(error => alert('Erreur:'+ error))
        });
}

function apiArtist(artist) {
    // récupère le token
    let token = loadToken();


    fetch('http://api-music.test' + artist, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    //récupération de la promesse de réponse
    //formatage de la réponse en JSON
    .then(response => response.json())
    .then(artistAlbum => 
        {
            //console.log("Nom de l'artiste' : " + artistAlbum.username);

            let mydiv = document.querySelector(".containerNom");
            let p = document.createElement('p');
            p.innerText = artistAlbum.username;
            mydiv.append(p);

        })
    .catch(error => alert('Erreur:'+ error))
}




function timeTrack(timestamp) {

    //let today = new Date();
    //let str = today.toUTCString()

    //console.log(str)

    let date = new Date(timestamp*1000);
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    return minutes + ':' + seconds;

    //console.log(time);


    //return Math.floor(timestamp/60)
    //let toto = Math.floor(timestamp/60);
    //let titi = Math.floor(timestamp-toto/60);
    //console.log(toto);
    //console.log(titi);
}