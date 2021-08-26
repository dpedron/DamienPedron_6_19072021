


/* Form modal DOM*/
const form = document.createElement("form");
form.id = "photographer-form";
form.setAttribute('onsubmit', 'event.preventDefault(); return formValidation();') 
const formHeading = document.createElement("h1");
const formFirstLabel = document.createElement("label");
formFirstLabel.setAttribute('for', 'first');
const formFirstInput = document.createElement("input");
formFirstInput.setAttribute('type', 'text');
formFirstInput.id = "first";
formFirstInput.setAttribute('name', 'first');
formFirstInput.setAttribute('placeholder', 'Prénom');
const formLastLabel = document.createElement("label")
formLastLabel.setAttribute('for', 'last');
const formLastInput = document.createElement("input");
formLastInput.setAttribute('type', 'text');
formLastInput.id = "last";
formLastInput.setAttribute('name', 'last');
formLastInput.setAttribute('placeholder', 'Nom');
const formEmailLabel = document.createElement("label")
formEmailLabel.setAttribute('for', 'email');
const formEmailInput = document.createElement("input");
formEmailInput.setAttribute('type', 'text');
formEmailInput.setAttribute('placeholder', 'email@exemple.com');
formEmailInput.id = "email";
formEmailInput.setAttribute('name', 'email');
const formMessageLabel = document.createElement("label");
formMessageLabel.setAttribute('for', 'message');
const formMessageInput = document.createElement("textarea");
formMessageInput.setAttribute('type', 'text');
formMessageInput.id = "message";
formMessageInput.setAttribute('name', 'message');
formMessageInput.setAttribute('placeholder', 'Votre message');
const formSubmit = document.createElement("button");
formSubmit.id = "submit";
const formClose = document.createElement("button");
formClose.id = "close";

/* Form validation */

const regexName = /^[A-ZÀÈÉÊa-zàäâéêèëçôîùû][A-ZÀÈÉÊa-zàäâéêèëçôîùû\-'\s]+$/; // First and last name input validation test
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email input validation test
const unvalidName = "Veuillez remplir le champ ci-dessus (deux caractères au moins)"; 
const unvalidEmail = 'Veuillez saisir une adresse mail valide (email@exemple.com)';
const unvalidMessage = "Veuillez saisir votre message (20 caractères minimum)";
const formFirstError = document.createElement("p");
formFirstError.className = "form-error__message"  
formFirstError.innerText = unvalidName;
const formLastError = document.createElement("p");
formLastError.className = "form-error__message";
formLastError.innerText = unvalidName;        
const formEmailError = document.createElement("p");
formEmailError.className = "form-error__message";
formEmailError.innerText = unvalidEmail;
const formMessageError = document.createElement("p");
formMessageError.className = "form-error__message";
formMessageError.innerText = unvalidMessage;

function firstValidation(){
    if(!regexName.test(formFirstInput.value)){
        formFirstError.style.display = "block";
        formFirstInput.classList.add("input-error");
        return false;
    } else {                
        formFirstError.style.display = "none";
        formFirstInput.classList.remove("input-error");
        return true;
    }
} 

function lastValidation(){        
    if(!regexName.test(formLastInput.value)){
        formLastError.style.display = "block";
        formLastInput.classList.add("input-error");
        return false;
    } else {                
        formLastError.style.display = "none";
        formLastInput.classList.remove("input-error");
        return true;
    }
} 

function emailValidation(){        
    if(!regexEmail.test(formEmailInput.value)){
        formEmailError.style.display = "block";
        formEmailInput.classList.add("input-error");
        return false;
    } else {                
        formEmailError.style.display = "none";
        formEmailInput.classList.remove("input-error");
        return true;
    }
}

function messageValidation(){        
    if(formMessageInput.value.length < 20){
        formMessageError.style.display = "block";
        formMessageInput.classList.add("input-error");
        return false;
    } else {                
        formMessageError.style.display = "none";
        formMessageInput.classList.remove("input-error");
        return true;
    }
}  

function formValidation(){
            
    let arrayValidation = [firstValidation(), lastValidation(), emailValidation(), messageValidation()];   

    for(let i = 0; i < arrayValidation.length; i++){  
        if(arrayValidation[i]==false){
            return false;
        }
    }
    form.style.display = "none";
            document.querySelector('main').style.display = "block";
            document.querySelector('header').style.display = "block";
            console.log(formFirstInput.value + " " + formLastInput.value + " a laissé le message suivant : " + formMessageInput.value + " , il souhaite être contacté à l'adresse suivante : " + formEmailInput.value)
}