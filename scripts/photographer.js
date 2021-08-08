window.onload = function() {

    const photographerCard = document.createElement("section");
    photographerCard.className = "photographer-card";
    const photographerInfo = document.createElement("div");
    photographerInfo.className = "photographer-card__info";
    const photographerName = document.createElement("h1");
    photographerName.className = "photographer-card__name";
    const photographerLocation = document.createElement("p");
    photographerLocation.className = "photographer-card__location";
    const photographerTagline = document.createElement("p");
    photographerTagline.className = "photographer-card__description";
    const photographerTags = document.createElement("ul");
    photographerTags.className = "categories photographer-card__categories";
    const photographerTag = document.createElement("li");
    photographerTag.className = "tag";
    const photographerTagLink = document.createElement("a");
    photographerTagLink.className = "tag__link";
    photographerTagLink.href = "";
    const hashtag = document.createElement("span");
    hashtag.setAttribute('aria-hidden', 'true');
    const photographerButton = document.createElement("button");
    photographerButton.id = "photographer-card__button";
    photographerButton.setAttribute('type', 'button')
    const photographerPortrait = document.createElement("img");
    photographerPortrait.className = "photographer-card__picture";

    /* Photographers cards creation */
    photographerInfo.appendChild(photographerName);
    photographerInfo.appendChild(photographerLocation);
    photographerInfo.appendChild(photographerTagline);
    photographerInfo.appendChild(photographerTags);
    
    const photographerCardItems = [photographerInfo, photographerButton, photographerPortrait];

    for(i=0;i<photographerCardItems.length;i++){
        photographerCard.appendChild(photographerCardItems[i]);
    }

    /* Complete photographers cards informations */

    fetch("../json/FishEyeData.json")
    .then(response => response.json())    
    .then(function(data){
            photographerName.innerText = data.photographers[i].name;
            photographerLocation.innerText = data.photographers[i].city + ", " + data.photographers[i].country;
            photographerTagline.innerText = data.photographers[i].tagline;
            photographerTags.innerHTML = "";
            for(j=0;j<data.photographers[i].tags.length;j++){
                photographerTagLink.innerText = data.photographers[i].tags[j];
                hashtag.innerText = "#";
                photographerTagLink.prepend(hashtag);
                photographerTag.appendChild(photographerTagLink);
                photographerTags.appendChild(photographerTag.cloneNode(true));
            }
            photographerButton.innerText = "Contactez-moi";
            photographerPortrait.src = "../images/pictures/portraits/" + data.photographers[i].portrait;
            document.querySelector('main').appendChild(photographerCard.cloneNode(true));

            /* Form modal creation */
            const form = document.createElement("form");
            form.id = "photographer-form";
            const formHeading = document.createElement("h1");
            const formFirstLabel = document.createElement("label");
            formFirstLabel.setAttribute('for', 'first');
            const formFirstInput = document.createElement("input");
            formFirstInput.setAttribute('type', 'text');
            formFirstInput.id = "first";
            formFirstInput.setAttribute('name', 'first');
            const formLastLabel = document.createElement("label")
            formLastLabel.setAttribute('for', 'last');
            const formLastInput = document.createElement("input");
            formLastInput.setAttribute('type', 'text');
            formLastInput.id = "last";
            formLastInput.setAttribute('name', 'last');
            const formEmailLabel = document.createElement("label")
            formEmailLabel.setAttribute('for', 'email');
            const formEmailInput = document.createElement("input");
            formEmailInput.setAttribute('type', 'text');
            formEmailInput.id = "email";
            formEmailInput.setAttribute('name', 'email');
            const formMessageLabel = document.createElement("label")
            formMessageLabel.setAttribute('for', 'message');
            const formMessageInput = document.createElement("input");
            formMessageInput.setAttribute('type', 'text');
            formMessageInput.id = "message";
            formMessageInput.setAttribute('name', 'message');
            const formSubmit = document.createElement("button");
            formSubmit.id = "submit"
            const formClose = document.createElement("button");
            formClose.id = "close"

            form.appendChild(formHeading);
            form.appendChild(formFirstLabel);
            form.appendChild(formFirstInput);    
            form.appendChild(formLastLabel);    
            form.appendChild(formLastInput);
            form.appendChild(formEmailLabel);    
            form.appendChild(formEmailInput);
            form.appendChild(formMessageLabel);    
            form.appendChild(formMessageInput);
            form.appendChild(formSubmit);
            form.appendChild(formClose);                 
            document.querySelector('body').appendChild(form);
            
            formHeading.innerHTML = "Contactez-moi<br>\ " + data.photographers[i].name;
            formFirstLabel.innerText = "Prénom";
            formLastLabel.innerText = "Nom";
            formEmailLabel.innerText = "Email";
            formMessageLabel.innerText = "Votre message";
            formSubmit.innerText = "Envoyer";
            formClose.innerText = "X";

            function openModal(){
                form.style.display = "flex";
                document.querySelector('main').style.display = "none";
            }
        
            document.getElementById('photographer-card__button').addEventListener('click', openModal);
    })
}
