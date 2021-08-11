let photographers = [];

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

        
        let params = new URLSearchParams(document.location.search.substring(1));
        let id = params.get("id");        
        photographers = data.photographers[i];

        /* Photographer card creation */
    
        photographerName.innerText = photographers.name;
        photographerLocation.innerText = photographers.city + ", " + photographers.country;
        photographerTagline.innerText = photographers.tagline;
        photographerTags.innerHTML = "";
        for(j=0;j<photographers.tags.length;j++){
            photographerTagLink.innerText = photographers.tags[j];
            hashtag.innerText = "#";
            photographerTagLink.prepend(hashtag);
            photographerTag.appendChild(photographerTagLink);
            photographerTags.appendChild(photographerTag.cloneNode(true));
        }
        photographerButton.innerText = "Contactez-moi";
        photographerPortrait.src = "../images/pictures/portraits/" + photographers.portrait;
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
        const formMessageLabel = document.createElement("label");
        formMessageLabel.setAttribute('for', 'message');
        const formMessageInput = document.createElement("textarea");
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
        
        formHeading.innerHTML = "Contactez-moi<br>\ " + photographers.name;
        formFirstLabel.innerText = "Prénom";
        formLastLabel.innerText = "Nom";
        formEmailLabel.innerText = "Email";
        formMessageLabel.innerText = "Votre message";
        formSubmit.innerText = "Envoyer";
        formClose.innerText = "X";

        function openModal(){
            form.style.display = "flex";
            document.querySelector('main').style.display = "none";
            document.querySelector('header').style.display = "none";
        }

        function closeModal(){
            form.style.display = "none";
            document.querySelector('main').style.display = "flex";
            document.querySelector('header').style.display = "block";
        }
    
        document.getElementById('photographer-card__button').addEventListener('click', openModal);
        document.getElementById('close').addEventListener('click', closeModal);

        /* Sort-by creation */


        
        /* Pictures section creation */

        const media = data.media;

        const picturesSection = document.createElement('section');
        picturesSection.id = "pictures-section";
        const sortBy = document.createElement("div");
        const sortByLabel = document.createElement("label");
        sortByLabel.innerText = "Trier par";
        const sortBySelect = document.createElement("select");
        const sortOptions = ['Popularité', 'Date', 'Titre'];
        const option = document.createElement("option");
        const pictureCard = document.createElement("article");
        pictureCard.className = "picture-card";
        const pictureLink = document.createElement("a");
        pictureLink.className = "picture-card__link";
        const picture = document.createElement("img");
        picture.className = "picture-card__link-image";
        const pictureInfo = document.createElement("div");        
        pictureInfo.className = "picture-card__info";
        const pictureTitle = document.createElement("p");        
        pictureTitle.className = "picture-card__info-title";
        const pictureLikesNumber = document.createElement("p");        
        pictureLikesNumber.className = "picture-card__info-likes";        
        const pictureLikeIcon = document.createElement("i");        
        pictureLikeIcon.className = "fas fa-heart";
        pictureLikeIcon.src = "../images/heart-solid.svg";

        document.querySelector('main').appendChild(sortBy);
        document.querySelector('main').appendChild(picturesSection);
        sortBy.appendChild(sortByLabel);
        sortBy.appendChild(sortBySelect);        
        for(i=0;i<sortOptions.length;i++){
            option.innerText = sortOptions[i];
            sortBySelect.appendChild(option.cloneNode(true));
        }
        for(i=0;i<media.length;i++){

            if(media[i].photographerId == id){
                pictureCard.appendChild(pictureLink);
                pictureLink.appendChild(picture);               
                picture.src = "../images/pictures/Mimi/" + media[i].image;
                pictureCard.appendChild(pictureInfo);
                pictureInfo.appendChild(pictureTitle);
                pictureTitle.innerText = media[i].title;
                pictureInfo.appendChild(pictureLikesNumber);
                pictureLikesNumber.innerText = media[i].likes;
                pictureLikesNumber.appendChild(pictureLikeIcon);                
                picturesSection.appendChild(pictureCard.cloneNode(true)); 
            }

        }
    })
}
