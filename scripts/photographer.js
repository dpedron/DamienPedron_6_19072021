let photographers = [];
let _photographer = [];
let media = [];
let _media = [];

window.onload = function() {

    /* Photographers cards DOM */

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
    photographerPortrait.alt = "";

    const photographerInfoItems = [photographerName, photographerLocation, photographerTagline, photographerTags];    
    const photographerCardItems = [photographerInfo, photographerButton, photographerPortrait];

    for(let i=0;i<photographerInfoItems.length;i++){
        photographerInfo.appendChild(photographerInfoItems[i]);
    }

    for(let i=0;i<photographerCardItems.length;i++){
        photographerCard.appendChild(photographerCardItems[i]);
    }

    fetch("../json/FishEyeData.json")                                               // Get all the data for photographers and media
    .then(response => response.json())    
    .then(function(data){
        
        let params = new URLSearchParams(document.location.search.substring(1));
        let id = params.get("id");                                                  // Get photographer ID selected on the home page
        photographers = data.photographers;                                         // All photographers data
        _photographer = photographers.filter(p => p.id == id);                      // Selected photographer data
        media = data.media;                                                         // All media
        _media= media.filter(m => m.photographerId == id);                          // Selected photographer media


        for(let i=0;i<_photographer.length; i++){
            
                /* Put photographer name as title of the page */
                document.title = _photographer[i].name 

                /* Complete photographer card with data */ 
                photographerName.innerText = _photographer[i].name;
                photographerLocation.innerText = _photographer[i].city + ", " + _photographer[i].country;
                photographerTagline.innerText = _photographer[i].tagline;
                photographerTags.innerHTML = "";
                photographerPortrait.src = "../images/pictures/Photographers ID Photos/" + _photographer[i].portrait;
                for(let j=0;j<_photographer[i].tags.length;j++){
                    photographerTagLink.innerText = _photographer[i].tags[j];
                    photographerTagLink.ariaLabel = _photographer[i].tags[j];
                    hashtag.innerText = "#";
                    photographerTagLink.prepend(hashtag);
                    photographerTag.appendChild(photographerTagLink);
                    photographerTags.appendChild(photographerTag.cloneNode(true));
                }
            photographerButton.innerText = "Contactez-moi";
        }
        document.querySelector('main').appendChild(photographerCard.cloneNode(true));

        /* Media filter */

        const allTags = document.querySelectorAll(".tag__link");

        function mediaFilter(e){
            e.preventDefault();
            const selectedTag = e.currentTarget;
            const allPictureCard = document.querySelectorAll(".picture-card");
            for(let i=0;i<_media.length;i++){
                if(selectedTag.innerText == "#"+_media[i].tags.join()){                  // A filter is selected ...
                    document.getElementById('pC_' + _media[i].id).style.display = "block";// ... show all selected media ...
                } else {
                    document.getElementById('pC_' + _media[i].id).style.display = "none";// ... and close all non-selected media
                }
            }
            
            if(selectedTag.classList.contains("tag__link--selected")){                 // The selected filter is already selected ...
                selectedTag.classList.remove("tag__link--selected");                   // ... unselect him ...               
                allPictureCard.forEach(element => {                                    // ... show all media of the photographer
                    element.style.display = "block";                    
                });
            } else {               
                allTags.forEach(element => {                                             // Another filter is selected ...
                    element.classList.remove("tag__link--selected");                    // ... remove the filter selected before ...           
                });
                selectedTag.classList.add("tag__link--selected");                        // ... and select the new filter
            }
        }

        allTags.forEach(element => {
            element.addEventListener('click', mediaFilter)
        });

        /* Sort-by DOM */

        const picturesSection = document.createElement('section');
        picturesSection.id = "pictures-section";
        const sortBy = document.createElement("div");
        sortBy.className ="sort-by";
        const sortByLabel = document.createElement("label");
        sortByLabel.className = "sort-by__label";
        sortByLabel.innerText = "Trier par";
        const sortBySelect = document.createElement("select");
        sortBySelect.className = "sort-by__select";
        sortBySelect.ariaLabel = "trier par";
        const sortOptions = ['Popularité', 'Date', 'Titre'];
        const sortOptionsValue = ['popularity', 'date', 'title']
        const sortByOption = document.createElement("option");        
        sortByOption.className = "sort-by__select__option";
        document.querySelector('main').appendChild(sortBy);
        sortBy.appendChild(sortByLabel);
        sortBy.appendChild(sortBySelect);        
        for(let i=0;i<sortOptions.length;i++){
            sortByOption.innerText = sortOptions[i];
            sortByOption.setAttribute('value', sortOptionsValue[i]);
            sortBySelect.appendChild(sortByOption.cloneNode(true));
        }
        
        /* Likes counter and price */ 
        
        let photographerLikes = [];                                                     
        let totalPhotographerLikes = null;                                              
        const reducer = (accumulator, currentValue) => accumulator + currentValue; 
        for(let i=0;i<_media.length;i++){                                               
            photographerLikes.push(_media[i].likes);                                    // Array of all likes 
            totalPhotographerLikes = photographerLikes.reduce(reducer);                 // Total of the sum of all likes
        }

        const likesCounterAndPrice = document.createElement("div");
        likesCounterAndPrice.className = "likes-counter-and-price";
        const likesCounter = document.createElement("p");
        likesCounter.className = "likes-counter";
        const likeIcon = document.createElement("i");
        likeIcon.className = "far fa-heart like-icon";
        const likeIconFull = document.createElement("i");
        likeIconFull.className = "fas fa-heart like-icon";
        const price = document.createElement("p");
        price.className ="price";

        document.querySelector("main").appendChild(likesCounterAndPrice);
        likesCounterAndPrice.appendChild(likesCounter);
        likesCounter.innerText = totalPhotographerLikes;
        likesCounterAndPrice.appendChild(likeIconFull);
        likesCounterAndPrice.appendChild(price);
        
        for(let i=0;i<_photographer.length;i++){
                price.innerHTML = photographers[i].price + "€ / jour";
        }

        /* Pictures section DOM*/

        const pictureCard = document.createElement("article");
        pictureCard.className = "picture-card";
        const pictureLink = document.createElement("a");
        pictureLink.className = "picture-card__link";
        pictureLink.href = "";
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
        pictureAddLike.ariaLabel = "likes";
        pictureAddLike.href = "";
        const pictureLikeIcon = document.createElement("i");        
        pictureLikeIcon.className = "far fa-heart picture-card__info-likes-icon";  

        /* Sort the media */
        function sortMedia(){

            const allPictureCard = document.querySelectorAll(".picture-card");
            const action = sortBySelect.value;
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

                picturesSection.innerHTML = "";
                
                for(let i=0;i<_media.length;i++){ 
                    allPictureCard.forEach(element => {
                        if(element.id == "pC_" + _media[i].id){
                            picturesSection.appendChild(element);
                        }
                    });                
                }

                function sortPopularity(a, b){               // function to order by popularity
                    if(a.likes>b.likes){
                        return(-1);
                    }else if(a.likes<b.likes){
                        return(1);
                    }else{
                        return(0);
                    }
                }
        
                function sortDate(a, b){                     // function to order by date
                    if(a.date<b.date){
                        return(-1);
                    }else if(a.date>b.date){
                        return(1);
                    }else{
                        return(0);
                    }
                }
        
                function sortTitle(a, b){                    // function to order by title
                    if(a.title<b.title){
                        return(-1);
                    }else if(a.title>b.title){
                        return(1);
                    }else{
                        return(0);
                    }
                }
            }
        
            document.querySelector('main').appendChild(picturesSection);

            picturesSection.innerHTML = "";                     // Empty picture section ...
            sortMedia();                                        // ... sort the media by user preference ...
            for(let i=0;i<_media.length;i++){                   // ... fill the picture section
                pictureCard.innerHTML = "";
                pictureInfo.innerHTML = "";
                pictureAddLike.innerHTML = "";
                pictureLink.innerHTML = "";
                pictureCard.id ="pC_" + _media[i].id;
                pictureLink.id = "pC-link_" + _media[i].id;
                    if(_media[i].video){ 
                        pictureCard.appendChild(videoIcon); 
                        video.innerHTML = "";                // The media is a video
                        pictureLink.appendChild(video); 
                        video.appendChild(videoSource);            
                        videoSource.src = "../images/pictures/" + photographerName.innerHTML + "/" + _media[i].video;
                        video.title = _media[i].title;
                    }

                    if(_media[i].image){                      // The media is a picture 
                        pictureLink.appendChild(picture);             
                        picture.src = "../images/pictures/" + photographerName.innerHTML + "/" + _media[i].image;
                        picture.alt = _media[i].title;
                    }
                    pictureCard.prepend(pictureLink);
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

        sortBySelect.addEventListener("change", sortMedia);

        /* Likes */
        
        function addOrRemoveLike(e){
            e.preventDefault();
            let mediaLikeCount = e.currentTarget.previousSibling;
            if(e.currentTarget.className !== "picture-card__info-add-like liked"){           // The media is not already "liked", add a like
                e.currentTarget.classList.add("liked");
                mediaLikeCount.innerText++; 
                likesCounter.innerText++;
                e.currentTarget.firstChild.className = "fas fa-heart picture-card__info-likes-icon";
            } else {                                                                         // The media is already "liked", remove a like
                e.currentTarget.classList.remove("liked");
                mediaLikeCount.innerText--; 
                likesCounter.innerText--;
                e.currentTarget.firstChild.className = "far fa-heart picture-card__info-likes-icon";
            }
        }

        const allIconLike = document.querySelectorAll('.picture-card__info-add-like');

        allIconLike.forEach(element => {
            element.addEventListener('click', addOrRemoveLike);
        });

        allIconLike.forEach(element => {
            element.addEventListener('keypress', function (e){
                if(e.key === 'Enter'){
                    addOrRemoveLike(e);
                }
            });
        });

        /* Lightbox DOM */

        const lightboxModal = document.createElement('dialog');
        lightboxModal.className = "lightbox";
        lightboxModal.ariaLabel = "image en vue agrandie";
        const mediaContainer = document.createElement('div');
        mediaContainer.className = "media-container";
        const lightboxVideo = document.createElement('video');
        lightboxVideo.className = "lightbox__video";
        lightboxVideo.setAttribute('controls', "");
        const lightboxVideoSource = document.createElement('source');
        const lightboxVideoTitle = document.createElement('p');
        lightboxVideoTitle.className = "lightbox__video-title";
        const lightboxFigure = document.createElement('figure');
        lightboxFigure.className = "lightbox__figure";
        const lightboxPicture = document.createElement('img');
        lightboxPicture.className = "lightbox__figure-picture";
        lightboxPicture.tabIndex = "0";
        const lightboxFigcaption = document.createElement('figcaption');
        lightboxFigcaption.className = "lightbox__figure-figcaption";
        const lightboxLeft = document.createElement('button');
        lightboxLeft.className = "lightbox__arrows left-arrow";
        lightboxLeft.ariaLabel = "média précédent";
        const lightboxRight = document.createElement('button');        
        lightboxRight.className = "lightbox__arrows right-arrow";
        lightboxRight.ariaLabel = "média suivant";
        const lightboxClose = document.createElement('button');
        lightboxClose.className = "lightbox__x";
        lightboxClose.ariaLabel = "fermer";

        document.querySelector('body').appendChild(lightboxModal);

        const allPicturesLinks = document.querySelectorAll('.picture-card__link');
        let mediaPosition = 0;                                              //position of active media in the lightbox        

        /* Open and create lightbox */

        function openLigthbox(e){ 
            e.preventDefault();
            mediaContainer.innerHTML = "";  
            lightboxModal.appendChild(lightboxLeft);
            lightboxModal.appendChild(mediaContainer);
            lightboxModal.appendChild(lightboxRight);
            lightboxModal.style.display = "flex";
            document.querySelector('main').style.display = "none";
            document.querySelector('header').style.display = "none";
            for(let i=0;i<_media.length;i++){
                if("pC-link_" + _media[i].id == e.currentTarget.id){ 
                    if(_media[i].video){                                    // The media is a video
                        mediaContainer.appendChild(lightboxVideo);
                        lightboxVideo.appendChild(lightboxVideoSource);    
                        mediaContainer.appendChild(lightboxVideoTitle);          
                        lightboxVideoSource.src = "../images/pictures/" + photographerName.innerHTML + "/" + _media[i].video;
                        lightboxVideo.setAttribute("title", _media[i].description);                  
                        lightboxVideoTitle.innerText = _media[i].title;
                        mediaPosition = _media.indexOf(_media[i]);    
                        lightboxVideo.focus();  
                    }
                    if(_media[i].image){                                    // The media is a picture 
                        mediaContainer.appendChild(lightboxFigure);
                        lightboxFigure.appendChild(lightboxPicture);
                        lightboxFigure.appendChild(lightboxFigcaption);        
                        lightboxPicture.src = "../images/pictures/" + photographerName.innerHTML + "/" + _media[i].image;
                        lightboxPicture.setAttribute("alt", _media[i].description);
                        lightboxFigcaption.innerHTML = _media[i].title;
                        mediaPosition = _media.indexOf(_media[i]);
                        lightboxPicture.focus();    
                    }
                } 
            }
            mediaContainer.appendChild(lightboxClose);
        }

        allPicturesLinks.forEach(element => {
            element.addEventListener('click', openLigthbox);
        }); 
        
        /* Close lightbox */

        function closeLigthbox(){
            lightboxModal.style.display = "none";
            document.querySelector('main').style.display = "block";
            document.querySelector('header').style.display = "block";
        }

        lightboxClose.addEventListener('click', closeLigthbox);

        /* Lightbox navigation */

        let position = null;

        function lightboxNavigation(){

            mediaContainer.innerHTML = "";

            if(position == _media.length){                                  // This is the last picture go back to the first
                position = 0;
            }
            if(position == -1){                                             // This is the first picture and click to see the last
                position = _media.length - 1;
            }

            if(_media[position].image){                                     // The media new is a picture 
                mediaContainer.appendChild(lightboxFigure);
                lightboxFigure.appendChild(lightboxPicture);
                lightboxFigure.appendChild(lightboxFigcaption);        
                lightboxPicture.src = "../images/pictures/" + photographerName.innerHTML + "/" + _media[position].image;
                lightboxPicture.setAttribute("alt", _media[position].description);
                lightboxFigcaption.innerHTML = _media[position].title;
                mediaPosition = _media.indexOf(_media[position]);
                lightboxPicture.focus();                
            }
            if(_media[position].video){                                     // The media new is a video
                mediaContainer.appendChild(lightboxVideo);
                lightboxVideo.appendChild(lightboxVideoSource);            
                lightboxVideoSource.src = "../images/pictures/" + photographerName.innerHTML + "/" + _media[position].video;
                lightboxVideo.setAttribute("title", _media[position].description);
                mediaContainer.appendChild(lightboxVideoTitle);               
                lightboxVideoTitle.innerText = _media[position].title;
                mediaPosition = _media.indexOf(_media[position]);
                lightboxVideo.focus();   
            }
            mediaContainer.appendChild(lightboxClose);
        }        

        function lightboxKeyboard(e){
            if(e.key === "ArrowLeft"){                                         // Previous media with keyboard arrow
                position = mediaPosition - 1;
                lightboxNavigation();
            } 
            if(e.key === "ArrowRight"){                                        // Next media                                                      
                position = mediaPosition + 1;
                console.log(position)
                lightboxNavigation();
            }
            if(e.key == "Escape"){                                          // "Escape" to close
                closeLigthbox();
            }
            console.log(position)
        }

        function lightboxClick(e){          
            if(e.currentTarget == document.querySelector(".left-arrow")){  // Previous media by mouse click
                position = mediaPosition - 1;
                lightboxNavigation();
            } 
            if(e.currentTarget == document.querySelector(".right-arrow")){ // Next media by mouse click                                                     
                position = mediaPosition + 1;
                lightboxNavigation();
            }
        }     

        lightboxLeft.addEventListener('click', lightboxClick);
        lightboxRight.addEventListener('click', lightboxClick);        
        window.addEventListener("keydown", lightboxKeyboard);

        /* Form */

        document.querySelector('body').appendChild(form);
        
        formHeading.innerHTML = "Contactez-moi<br> " + photographerName.innerText;
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

        formFirstInput.addEventListener('change', firstValidation);
        formLastInput.addEventListener('change', lastValidation);
        formEmailInput.addEventListener('change', emailValidation);
        formMessageInput.addEventListener('change', messageValidation);
    })
}

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
const formMessageValidation = document.createElement("div");
formMessageValidation.className ="form-validation";
formMessageValidation.innerHTML = "<br><br>Votre message a bien été transmis.<br>Nous vous remercions."


const formItems = [formHeading, formFirstLabel, formFirstInput, formFirstError, formLastLabel, formLastInput, formLastError, formEmailLabel, formEmailInput, formEmailError, formMessageLabel, formMessageInput, formMessageError, formSubmit, formClose,formMessageValidation];

for(let i=0;i<formItems.length;i++){
    form.appendChild(formItems[i]);
}  

/* Form validation */

const regexName = /^[A-ZÀÈÉÊa-zàäâéêèëçôîùû][A-ZÀÈÉÊa-zàäâéêèëçôîùû\-'\s]+$/; // First and last name input validation test
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email input validation test    

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
    console.log(formFirstInput.value + " " + formLastInput.value + " a laissé le message suivant : " + formMessageInput.value + " , il souhaite être contacté à l'adresse suivante : " + formEmailInput.value);
    formMessageValidation.style.display = "block";
}

form.addEventListener('submit', formValidation);

