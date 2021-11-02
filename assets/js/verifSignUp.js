// déclaration de variables qui permettront de verifier si chaque fonction 
// est vrai ou fausse pour verifier la condition avant l'envoi
let errorName = false;
let errorMail = false;
let errorPwd = false;

window.onload = function() {


    let backgroundPage = document.querySelector('img');

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



    // variables qui ciblent les input
    // on leur affecte un ecouteur d'evenement

    let email = document.getElementById('email');
    email.addEventListener('change', verifEmail);

    let pwd = document.querySelector('#pwd');
    pwd.addEventListener('change', verifMdp);

    let nom = document.querySelector('#name');
    nom.addEventListener('change', verifName);
    

 //*************************VERIFICATION FORMULAIRE SIGNUP POUR ENVOI
 
 //l'évenement doit agir sur le formulaire complet et non sur le bouton
 let formUp = document.querySelector('#formSignup');
 formUp.addEventListener('submit', () => {
     
    //prevent.Default evite le chargement d'une autre page après le clique
     event.preventDefault();
     
     //si tous les champs n'ont pas d'erreur...
     if(errorName === false && errorMail === false && errorPwd === false){
         
        // création d'un objet newUser contenant une clef et une valeur(valeur des input)
         const newUser = {
             "name" : nom.value,
             "email" : email.value,
             "password" : pwd.value
            }
            //envoi de l'objet newUser avec une requete POST via la méthode fetch
            //url récupérée dans l'api
            fetch('http://api-music.test/api/users',{
                method : 'POST',
                body : JSON.stringify(newUser),
                headers : {'Content-Type':'application/json'},
            })
            .then(response => response.json())
            .then(data => {
                //si lors de la récupéreation de donnée il y a une erreur de type 
                // 'an error occured' dans le title de la réponse...
                if (data.title === 'An error occurred') {
                    //alors on affiche dans la div(#messError) le détail de la réponse
                    document.querySelector('#messError').innerHTML = data.detail;
                }
                else{
                    //sinon on est renvoyé sur la page Sign In
                    location.href = 'signin.html';
                }
            })
            //traitement de la requête échouée
            .catch(error => console.log(error))
        }
        //sinon on affiche le message 'please...' dans la div(#messError)
        else{
            document.querySelector('#messError').innerHTML = 'Please complete all form fields';
        }     
        
    })
    
}


//*************************VERIFICATION NAME
function verifName()
{
    let error = document.querySelector('#nameError');
    
    if(this.value.length == 0){
        this.style.borderColor =  '#FF0077';
        error.style.display = 'block';
        errorName = true;
    }
    else{
        this.style.borderColor = "#51E62E";
        error.style.display = 'none';
        errorName = false;
    }
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


//*************************VERIFICATION DU MDP

function verifMdp()
    {
        let error = document.querySelector('#pwdError');
        //this correspond à l'élément ayant enclenché cette fonction, soit dans notre cas de figure "pseudo"
        // console.log(this.value);
        // on vérifie que le nombre de caractères soit égal ou supérieur à 5
        if(this.value.length >=12){
            //si la longueur de la saisie est supérieur ou égale à 5
            //la bordure sera de couleur verte
            this.style.borderColor = '#51E62E';
            //et on cache le <p>
            error.style.display = 'none';
            errorPwd = false;
        }
        else{
            ///sinon la bordure sera rouge et on fait apparaitre le <P>
            this.style.borderColor =  '#FF0077';
            error.style.display = 'block';
            errorPwd = true;
        }
    }    