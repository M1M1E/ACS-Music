
window.onload = function() {

    let backgroundPage = document.querySelector('img');

    /*if(localStorage.getItem("dark")) {
        document.body.classList.toggle('dark');
       
        
        
    } else {
        if(localStorage.getItem("light"))
        document.body.classList.toggle('light');
        backgroundPage.src = "./assets/images/background-sign-light.png";
       
    }*/


    if(!localStorage.getItem('mode')) {
        principalStorage();
      } else {
        setLight();
      }

    

      function principalStorage() {
        localStorage.getItem('mode', 'dark');
        document.body.classList.toggle('dark');
        backgroundPage.src = "./assets/images/sign.svg";
        
        //setLight();
      }

      function setLight() {
        document.body.classList.toggle('light');
        backgroundPage.src = "./assets/images/background-sign-light.png";
        
      }

//////////////////////////////////////////////////////////////

    let email = document.getElementById('email');
    email.addEventListener('change', verifEmail);

   

    //*************************VERIFICATION FORMULAIRE SIGNIN POUR ENVOI

    //ici pas de verification de tous les champs comme dans le signUp, 
    //on se sert des réponses du serveur pour les afficher dans une div
    
    // l'évenement doit agir sur le formulaire et non sur le bouton
    let formIn = document.querySelector('#formSignin');
    formIn.addEventListener('submit', () => {
        
        event.preventDefault();
        //lors du clic, on crée un objet newUser avec clef et valeur
        const newUser = {
            "username" : email.value,
            "password" : pwd.value
           }
           //envoi de l'objet newUser en méthode POST
           fetch('http://api-music.test/api/login',{
               method : 'POST',
               body : JSON.stringify(newUser),
               headers : {'Content-Type':'application/json'},
           })
           .then(response => response.json())
           .then(data => {
               console.log(data);
               //si la réponse comporte un code 401
               if (data.code === 401) {
                //alors on affiche le message dans une div
                   document.querySelector('#messError').innerHTML = data.message;
               }
               else{
                   //sinon envoi du token reçu dans le localstorage
                   sessionStorage.setItem('Token',data.token);
                   // et redirection sur la page songs
                   location.href = 'page-songs.html';
               }
           })
           //traitement de la requête échouée
           .catch(error => console.log(error))
        });
}

//*************************VERIFICATION DE EMAIL

// Expression régulière permettant la vérification syntaxique d'une adresse email
function checkEmail(email)
    {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }


function verifEmail()
{   
    // créer un élément HTML "<p class="error">Votre adresse email invalide</p>
    let error = document.createElement('p');// création du tag html "p"
    error.classList.add('error'); // ajout de la classe css "error"
    error.style.display = "block"; //changement de la valeur du display
    error.innerText = "Error email"; // ajout d'un texte
    
    // si l'adresse email est correct, on met les bordures en vert
    if (checkEmail(this.value)) {
        this.style.borderColor = "#51E62E";
        
        //supprime l'élément suivant le champ "email" si celui-ci existe
        if (!this.nextSibling.length){
            this.nextElementSibling.remove(error);
            errorMail = false;
        }
    }
    else{
        this.style.borderColor = '#FF0077';
        //pour ne pas répéter
        //si aucun élément suit l'élément "email", on ajoute notre message d'erreur
        //.nextSibling = récupère un élément juste après un autre élément
        if (this.nextSibling.length){
            //ajoute le nouvel élément html juste après notre champ email
            this.after(error);
            errorMail = true;
            }
        }
}

