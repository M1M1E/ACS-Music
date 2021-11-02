//api-music : récupération de l'album d'un artiste

window.onload = function() {


    
    ////Light mode detection
    let backgroundPage = document.querySelector('#dotsBackground');

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



//////////////////////////////////////////////////////////////

    //charge les 20 derniers albums
    load_api_music();
    //charge les 8 albums récemment écoutés
    recently();
}

function loadToken (){
    // récupère le Token stockée dans le navigateur avec sessionStorage
    return sessionStorage.getItem('Token');
}

function load_api_music() {

    // récupère le token
    let token = loadToken();
    //création de l'url qui va envoyer la demande à l'api
    let url = 'http://api-music.test/api/albums?page=1';

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
    .then(posts => 
        {
            //initialise l'indice des albums à 1
            let y = 1;
            //initialise le container d'image
            let container_img = "";
            //formate l'affichage de la div avec le contenu de response
            // Boucles sur les données des albums jusqu'à concurrence de 20 albums
            posts.slice(-20).forEach(albums => {
                container_img = container_img + '<div class="album"><a href="#" id="ida' + y +'">';
                container_img = container_img + '<img src="' + albums.picture + '" alt="' + albums.name + '" id="' + albums.id + '">';
                container_img = container_img + "</a></div>";
                //console.log("ID de l'album : " + albums.id);
                y++
            });
            // afficher la structure créée dans la div id="id_scroll" //
            document.getElementById("id_scroll").innerHTML = container_img;

            /* pose un écouteur d'évènement (click) sur les titres des albums*/
            /* les albums = toutes les div de class album*/
            /* les titres = la balise a de chaque div album */
            let t;
            let a = document.querySelectorAll(".album");
            for (let i=0; i<a.length; i++) {
                a[i].addEventListener('click', albumSelect);
            }
        })

    .catch(error => alert('Erreur:'+ error))
}

function recently(){
    // récupère le token
    let token = loadToken();
    //création de l'url qui va envoyer la demande à l'api
    let url = 'http://api-music.test/api/albums/?order=recently_played&page=1';

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
    .then(posts => 
    {
        //initialise l'indice des albums à 1
        let y = 1;
        //initialise le container d'image
        let container_img = "";
        //formate l'affichage de la div avec le contenu de response
        // Boucles sur les données des albums jusqu'à concurrence de 8 albums
        // les 8 albums sont affichés sur 2 lignes
        posts.slice(-8).forEach(albums => {
            if ((y==1) || (y==5)) {
                container_img = container_img + '<div class="div-4">';
            }
            container_img = container_img + '<div id="div-img'+ y +'"><a href="#" class="recent">';
            container_img = container_img + '<img src="' + albums.picture + '" alt="' + albums.name + '" id="'+ albums.id+'">';
            container_img = container_img + "</a></div>";
            if ((y==4) || (y==8)) {
                container_img = container_img + "</div>";
            }
            y = y +1;
        });
        // afficher la structure créée dans la div id="id_scroll" //
        document.getElementById("div-8").innerHTML = container_img;

        /* pose un écouteur d'évènement (click) sur les titres des albums*/
        /* les albums = toutes les div de class album*/
        /* les titres = la balise a de chaque div album */
        let t;
        let a = document.querySelectorAll(".recent");
        for (let i=0; i<a.length; i++) {
            a[i].addEventListener('click', songsSelect);
        }
    })   
}

function albumSelect() {
    // trouve quel album à été sélectionné dans la barre de scroll //
    // renvoie le titre de l'album sélectionné (id de la balise a) //
    let cover = this.firstChild.firstChild.id;
    //console.log("L'album sélectionné est : " + cover);
    load_album_sheet("id=" + cover);
}

function songsSelect() {
    // trouve quel album à été sélectionné dans la liste des albums récemment joués
    let cover = this.firstChild.id;
    //console.log("Le titre récemment joué sélectionné est : " + cover);
    load_album_sheet("id=" + cover);
}

function load_album_sheet(paramkey) {
    //j'ai stocké l'album dans le localStorage
    //j'envoie le paramètre clé avec dans l'URL de la page HTML
    let nouvelleAdresse = "album.html?" + paramkey;
    location.href = nouvelleAdresse;
}