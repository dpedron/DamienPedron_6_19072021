let photographers = [];
let _photographer = [];
let media = [];
let _media = [];

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

    const photographerInfoItems = [photographerName, photographerLocation, photographerTagline, photographerTags];

    for(i=0;i<photographerInfoItems.length;i++){
        photographerInfo.appendChild(photographerInfoItems[i]);
    }
    
    const photographerCardItems = [photographerInfo, photographerButton, photographerPortrait];

    for(i=0;i<photographerCardItems.length;i++){
        photographerCard.appendChild(photographerCardItems[i]);
    }

    /* Complete photographers cards informations */

    fetch("../json/FishEyeData.json")
    .then(response => response.json())    
    .then(function(data){
        
        let params = new URLSearchParams(document.location.search.substring(1));
        let id = params.get("id");                                                  /* Get photographer ID */
        photographers = data.photographers;                                         /* All photographers data */
        _photographer = photographers.filter(p => p.id == id);                      /* Selected photographer data */
        media = data.media; 
        _media= media.filter(m => m.photographerId == id);


        for(i=0;i<_photographer.length; i++){
            
                /* Put photographer name as title of the page */
                document.title = _photographer[i].name 

                /* Photographer card creation */ 
                photographerName.innerText = _photographer[i].name;
                photographerLocation.innerText = _photographer[i].city + ", " + _photographer[i].country;
                photographerTagline.innerText = _photographer[i].tagline;
                photographerTags.innerHTML = "";
                photographerPortrait.src = "../images/pictures/Photographers ID Photos/" + _photographer[i].portrait;
                for(j=0;j<_photographer[i].tags.length;j++){
                    photographerTagLink.innerText = _photographer[i].tags[j];
                    hashtag.innerText = "#";
                    photographerTagLink.prepend(hashtag);
                    photographerTag.appendChild(photographerTagLink);
                    photographerTags.appendChild(photographerTag.cloneNode(true));
                }
            photographerButton.innerText = "Contactez-moi";
        }
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
        formFirstInput.setAttribute('placeholder', 'Prénom');
        const formFirstError = document.createElement("p");
        formFirstError.className = "form-error__message"
        const formLastLabel = document.createElement("label")
        formLastLabel.setAttribute('for', 'last');
        const formLastInput = document.createElement("input");
        formLastInput.setAttribute('type', 'text');
        formLastInput.id = "last";
        formLastInput.setAttribute('name', 'last');
        formLastInput.setAttribute('placeholder', 'Nom');
        const formLastError = document.createElement("p");
        formLastError.className = "form-error__message"
        const formEmailLabel = document.createElement("label")
        formEmailLabel.setAttribute('for', 'email');
        const formEmailInput = document.createElement("input");
        formEmailInput.setAttribute('type', 'text');
        formEmailInput.setAttribute('placeholder', 'email@exemple.com');
        formEmailInput.id = "email";
        formEmailInput.setAttribute('name', 'email');        
        const formEmailError = document.createElement("p");
        formEmailError.className = "form-error__message"
        const formMessageLabel = document.createElement("label");
        formMessageLabel.setAttribute('for', 'message');
        const formMessageInput = document.createElement("textarea");
        formMessageInput.setAttribute('type', 'text');
        formMessageInput.id = "message";
        formMessageInput.setAttribute('name', 'message');
        formMessageInput.setAttribute('placeholder', 'Votre message');
        const formMessageError = document.createElement("p");
        formMessageError.className = "form-error__message";
        const formSubmit = document.createElement("button");
        formSubmit.id = "submit";
        const formClose = document.createElement("button");
        formClose.id = "close";

        const formItems = [formHeading, formFirstLabel, formFirstInput, formFirstError, formLastLabel, formLastInput, formLastError, formEmailLabel, formEmailInput, formEmailError, formMessageLabel, formMessageInput, formEmailError, formSubmit, formClose]

        for(i=0;i<formItems.length;i++){
            form.appendChild(formItems[i]);
        }        
        document.querySelector('body').appendChild(form);
        
        formHeading.innerHTML = "Contactez-moi<br>\ " + photographerName.innerText;
        formFirstLabel.innerText = "Prénom";
        formLastLabel.innerText = "Nom";
        formEmailLabel.innerText = "Email";
        formMessageLabel.innerText = "Votre message";
        formSubmit.innerText = "Envoyer";
        formClose.src = "../images/x-vector.svg";

        /* Open form */

        function openModal(){
            form.style.display = "flex";
            document.querySelector('main').style.display = "none";
            document.querySelector('header').style.display = "none";
        }    
        document.getElementById('photographer-card__button').addEventListener('click', openModal);

        /* Close form */

        function closeModal(e){
            e.preventDefault();
            form.style.display = "none";
            document.querySelector('main').style.display = "block";
            document.querySelector('header').style.display = "block";
        }
        document.getElementById('close').addEventListener('click', closeModal);

        /* Form validation */

        const regexName = /^[A-ZÀÈÉÊa-zàäâéêèëçôîùû][A-ZÀÈÉÊa-zàäâéêèëçôîùû\-'\s]+$/; /* First and last name input validation test */
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; /* Email input validation test */

        const unvalidName = "Veuillez remplir le champ ci-dessus (deux caractères au moins)"; 
        const unvalidEmail = 'Veuillez saisir une adresse mail valide (email@exemple.com)';
        const unvalidMessage = "Veuillez saisir votre message (20 caractères minimum)"  
        formFirstError.innerText = unvalidName;
        formLastError.innerText = unvalidName;
        formEmailError.innerText = unvalidEmail;
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
        form.setAttribute('onsubmit', 'event.preventDefault(); return formValidation();') 

        formFirstInput.addEventListener('change', firstValidation);
        formLastInput.addEventListener('change', lastValidation);
        formEmailInput.addEventListener('change', emailValidation);
        formMessageInput.addEventListener('change', messageValidation);
        formSubmit.addEventListener('click', formValidation);

        /* Sort-by creation */

        const picturesSection = document.createElement('section');
        picturesSection.id = "pictures-section";
        const sortBy = document.createElement("div");
        sortBy.className ="sort-by"
        const sortByLabel = document.createElement("label");
        sortByLabel.className = "sort-by__label"
        sortByLabel.innerText = "Trier par";
        const sortBySelect = document.createElement("select");
        sortBySelect.className = "sort-by__select";
        const sortOptions = ['Popularité', 'Date', 'Titre'];
        const sortOptionsValue = ['popularity', 'date', 'title']
        const sortByOption = document.createElement("option");        
        sortByOption.className = "sort-by__select__option";

        document.querySelector('main').appendChild(sortBy);
        sortBy.appendChild(sortByLabel);
        sortBy.appendChild(sortBySelect);        
        for(i=0;i<sortOptions.length;i++){
            sortByOption.innerText = sortOptions[i];
            sortByOption.setAttribute('value', sortOptionsValue[i]);
            sortBySelect.appendChild(sortByOption.cloneNode(true));
        }
        
        /* Likes counter and price */ 
        
        let photographerLikes = []; /* Array of all likes */
        let totalPhotographerLikes = null; /* Total of likes */
        const reducer = (accumulator, currentValue) => accumulator + currentValue; /* Sum of likes */
        for(i=0;i<_media.length;i++){
            photographerLikes.push(_media[i].likes);
            totalPhotographerLikes = photographerLikes.reduce(reducer);
        }

        const likesCounterAndPrice = document.createElement("div");
        likesCounterAndPrice.className = "likes-counter-and-price";
        const likesCounter = document.createElement("p");
        likesCounter.className = "likes-counter";
        const likeIcon = document.createElement("i");
        likeIcon.className = "fas fa-heart like-icon";
        const price = document.createElement("p");
        price.className ="price";

        document.querySelector("main").appendChild(likesCounterAndPrice);
        likesCounterAndPrice.appendChild(likesCounter);
        likesCounter.innerText = totalPhotographerLikes;
        likesCounter.appendChild(likeIcon);
        likesCounterAndPrice.appendChild(price);
        likeIcon.src = "../images/heart-solid.svg";
        
        for(i=0;i<_photographer.length;i++){
                price.innerHTML = photographers[i].price + "€ / jour";
        }
        /* Pictures section creation */

        const pictureCard = document.createElement("article");
        pictureCard.className = "picture-card";
        const pictureLink = document.createElement("a");
        pictureLink.className = "picture-card__link";        
        const picture = document.createElement("img");
        picture.className = "picture-card__link-image";
        const video = document.createElement("video");
        video.className = "picture-card__link-image";
        const videoSource = document.createElement("source");
        const videoIcon = document.createElement("i");
        videoIcon.className = "fas fa-video picture-card__video-icon";
        videoIcon.src = "../images/video-solid.svg"
        const pictureInfo = document.createElement("div");        
        pictureInfo.className = "picture-card__info";
        const pictureTitle = document.createElement("p");        
        pictureTitle.className = "picture-card__info-title";
        const pictureDate = document.createElement("p");
        pictureDate.className = "picture-card__date";
        const pictureLikesNumber = document.createElement("p");        
        pictureLikesNumber.className = "picture-card__info-likes";
        const pictureAddLike = document.createElement("a");
        pictureAddLike.className = "picture-card__info-add-like";
        const pictureLikeIcon = document.createElement("i");        
        pictureLikeIcon.className = "fas fa-heart picture-card__info-likes-icon";
        pictureLikeIcon.src = "../images/heart-solid.svg";

        
        document.querySelector('main').appendChild(picturesSection);

        function createPictureCards(){

            /* Sort the media */

            let action = sortBySelect.value;
            switch(action){                                 // Order the media list ...

                case "popularity":                          // by popularity
                    _media = _media.sort(sortPopularity);
                    break;
        
                case "date":                                // by date
                    _media = _media.sort(sortDate);
                    break;
        
                case "title":                               // by title
                    _media = _media.sort(sortTitle);
                    break;
                }
        
                function sortPopularity(a, b)
                {
                if(a.likes>b.likes)
                {
                    return(-1);
                }
                else if(a.likes<b.likes)
                {
                    return(1);
                }
                else
                {
                    return(0);
                }
                }
        
                function sortDate(a, b)
                {
                if(a.date<b.date)
                {
                    return(-1);
                }
                else if(a.date>b.date)
                {
                    return(1);
                }
                else
                {
                    return(0);
                }
                }
        
                function sortTitle(a, b)
                {
                if(a.title<b.title)
                {
                    return(-1);
                }
                else if(a.title>b.title)
                {
                    return(1);
                }
                else
                {
                    return(0);
                }
                }    
            picturesSection.innerHTML = "";
            for(i=0;i<_media.length;i++){
                pictureCard.innerHTML = "";
                pictureInfo.innerHTML = "";
                pictureAddLike.innerHTML = "";
                pictureLink.innerHTML = "";
                pictureLink.id = _media[i].id;
                    if(_media[i].video){  
                        video.innerHTML = "";                           /* The media is a video */
                        pictureLink.appendChild(video);
                        pictureCard.appendChild(videoIcon); 
                        video.appendChild(videoSource);            
                        videoSource.src = "../images/pictures/" + photographerName.innerHTML + "/" + _media[i].video;
                    }

                    if(_media[i].image){                      /* The media is a picture */ 
                        pictureLink.appendChild(picture);             
                        picture.src = "../images/pictures/" + photographerName.innerHTML + "/" + _media[i].image;
                    }
                    pictureCard.appendChild(pictureLink);
                    pictureCard.appendChild(pictureDate);
                    pictureCard.appendChild(pictureInfo);
                    pictureDate.innerText = _media[i].date;
                    pictureInfo.appendChild(pictureTitle);
                    pictureTitle.innerText = _media[i].title;
                    pictureInfo.appendChild(pictureLikesNumber);
                    pictureLikesNumber.innerText = _media[i].likes;
                    pictureInfo.appendChild(pictureAddLike);
                    pictureAddLike.appendChild(pictureLikeIcon);             
                    picturesSection.appendChild(pictureCard.cloneNode(true));
            } 
        } 
        createPictureCards();
        sortBySelect.addEventListener("change", createPictureCards)

        
        function addOrRemoveLike(e){
            let mediaLikeCount = e.currentTarget.previousSibling;
            if(e.currentTarget.className !== "picture-card__info-add-like liked"){
                e.currentTarget.classList.add("liked");
                mediaLikeCount.innerText++; 
                likesCounter.innerText++;
                likesCounter.appendChild(likeIcon);
            } else {
                e.currentTarget.classList.remove("liked");
                mediaLikeCount.innerText--; 
                likesCounter.innerText--;
                likesCounter.appendChild(likeIcon);
            }
        };

        const allIconLike = document.querySelectorAll('.picture-card__info-add-like');

        allIconLike.forEach(element => {
            element.addEventListener('click', addOrRemoveLike);
        });


        /* Lightbox */

        const lightboxModal = document.createElement('dialog');
        lightboxModal.className = "lightbox";
        const lightboxFigure = document.createElement('figure');
        lightboxFigure.className = "lightbox__figure";
        const lightboxPicture = document.createElement('img');
        lightboxPicture.className = "lightbox__figure-picture";
        const lightboxFigcaption = document.createElement('figcaption');
        lightboxFigcaption.className = "lightbox__figure-figcaption";
        const lightboxLeft = document.createElement('button');
        lightboxLeft.className = "lightbox__arrows";
        const lightboxRight = document.createElement('button');        
        lightboxRight.className = "lightbox__arrows"
        const lightboxClose = document.createElement('button');
        lightboxClose.className = "lightbox__x"

        document.querySelector('body').appendChild(lightboxModal);
        lightboxModal.appendChild(lightboxLeft);
        lightboxModal.appendChild(lightboxFigure);
        lightboxFigure.appendChild(lightboxPicture);
        lightboxFigure.appendChild(lightboxFigcaption);
        lightboxModal.appendChild(lightboxRight);
        lightboxModal.appendChild(lightboxClose);

        const allPicturesLinks = document.querySelectorAll('.picture-card__link');

        function openLigthbox(){
            lightboxModal.style.display = "flex";
            document.querySelector('main').style.display = "none";
            document.querySelector('header').style.display = "none";
        }

        allPicturesLinks.forEach(element => {
            element.addEventListener('click', openLigthbox);
        });   

        function closeLigthbox(){
            lightboxModal.style.display = "none";
            document.querySelector('main').style.display = "block";
            document.querySelector('header').style.display = "block";
        }

        lightboxClose.addEventListener('click', closeLigthbox);

        function nextMedia(){
            for(i=0;i<_media.length;i++){
                lightboxPicture.src = "../images/pictures/" + photographerName.innerHTML + "/" + _media[i+1];
                console.log(_media[i].image);
                break;
            }
        }

        function prevMedia(){
            for(i=0;i<_media.length;i++){
                    lightboxPicture.src = "../images/pictures/" + photographerName.innerHTML + "/" + _media[i-1];
            }
        }

        lightboxRight.addEventListener('click', nextMedia);
        lightboxLeft.addEventListener('click', prevMedia);
    })
}
