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
    photographerTagLink.href = " ";
    const hashtag = document.createElement("span");
    hashtag.setAttribute('aria-hidden', 'true');
    const photographerButton = document.createElement("button");
    photographerButton.id = "photographer-card__button";
    photographerButton.setAttribute('type', 'button')
    const photographerPortrait = document.createElement("img");
    photographerPortrait.className = "photographer-card__picture";
    photographerPortrait.alt = " ";

    const photographerInfoItems = [photographerName, photographerLocation, photographerTagline, photographerTags];    
    const photographerCardItems = [photographerInfo, photographerButton, photographerPortrait];

    for(i=0;i<photographerInfoItems.length;i++){
        photographerInfo.appendChild(photographerInfoItems[i]);
    }

    for(i=0;i<photographerCardItems.length;i++){
        photographerCard.appendChild(photographerCardItems[i]);
    }

    fetch("../json/FishEyeData.json")
    .then(response => response.json())    
    .then(function(data){
        
        let params = new URLSearchParams(document.location.search.substring(1));
        let id = params.get("id");                                                  // Get photographer ID
        photographers = data.photographers;                                         // All photographers data
        _photographer = photographers.filter(p => p.id == id);                      // Selected photographer data
        media = data.media;                                                         // All media
        _media= media.filter(m => m.photographerId == id);                          // Selected photographer media


        for(i=0;i<_photographer.length; i++){
            
                /* Put photographer name as title of the page */
                document.title = _photographer[i].name 

                /* Photographer card DOM */ 
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

        /* Media filter */

        const allTags = document.querySelectorAll(".tag__link");

        function mediaFilter(e){
            e.preventDefault();
            const selectedTag = e.currentTarget;
            const allPictureCard = document.querySelectorAll(".picture-card");
            for(i=0;i<_media.length;i++){
                if(selectedTag.innerText == "#"+_media[i].tags.join()){                 // A filter is selected ...
                    document.getElementById('pC_' + _media[i].id).style.display = "block";                          // ... show all selected media ...
                } else {
                    document.getElementById('pC_' + _media[i].id).style.display = "none";                           // ... and close all non-selected media
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
        };

        allTags.forEach(element => {
            element.addEventListener('click', mediaFilter)
        });
        
        

        const formItems = [formHeading, formFirstLabel, formFirstInput, formFirstError, formLastLabel, formLastInput, formLastError, formEmailLabel, formEmailInput, formEmailError, formMessageLabel, formMessageInput, formMessageError, formSubmit, formClose]

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

        formFirstInput.addEventListener('change', firstValidation);
        formLastInput.addEventListener('change', lastValidation);
        formEmailInput.addEventListener('change', emailValidation);
        formMessageInput.addEventListener('change', messageValidation);

        /* Sort-by DOM */

        const picturesSection = document.createElement('section');
        picturesSection.id = "pictures-section";
        const sortBy = document.createElement("div");
        sortBy.className ="sort-by";
        const sortByLabel = document.createElement("label");
        sortByLabel.className = "sort-by__label";
        sortByLabel.innerText = "Trier par";
        const customSelect = document.createElement("div");
        customSelect.className = "custom-select";
        const sortBySelect = document.createElement("select");
        sortBySelect.className = "sort-by__select";
        const sortOptions = ['Popularité', 'Date', 'Titre'];
        const sortOptionsValue = ['popularity', 'date', 'title']
        const sortByOption = document.createElement("option");        
        sortByOption.className = "sort-by__select__option";

        document.querySelector('main').appendChild(sortBy);
        sortBy.appendChild(sortByLabel);
        sortBy.appendChild(customSelect);
        customSelect.appendChild(sortBySelect);        
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
        /* Pictures section DOM*/

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
        pictureLikeIcon.setAttribute('aria-label', 'likes');      

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
                
                for(i=0;i<_media.length;i++){
                    allPictureCard.forEach(element => {
                        if(element.id == "pC_" + _media[i].id){
                            element.style.order = i;
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
            };
        
        document.querySelector('main').appendChild(picturesSection);

            picturesSection.innerHTML = "";                 // Empty picture section ...
            sortMedia();                                    // ... sort the media by user preference ...
            for(i=0;i<_media.length;i++){                   // ... fill the picture section
                pictureCard.innerHTML = "";
                pictureInfo.innerHTML = "";
                pictureAddLike.innerHTML = "";
                pictureLink.innerHTML = "";
                pictureCard.id ="pC_" + _media[i].id;
                pictureLink.id = "pC-link_" + _media[i].id;
                    if(_media[i].video){  
                        video.innerHTML = "";                // The media is a video
                        pictureLink.appendChild(video);
                        pictureCard.appendChild(videoIcon); 
                        video.appendChild(videoSource);            
                        videoSource.src = "../images/pictures/" + photographerName.innerHTML + "/" + _media[i].video;
                    }

                    if(_media[i].image){                      // The media is a picture 
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

        sortBySelect.addEventListener("change", sortMedia);
        
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

        /* Lightbox DOM */

        const lightboxModal = document.createElement('dialog');
        lightboxModal.className = "lightbox";
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
        const lightboxFigcaption = document.createElement('figcaption');
        lightboxFigcaption.className = "lightbox__figure-figcaption";
        const lightboxLeft = document.createElement('button');
        lightboxLeft.className = "lightbox__arrows left-arrow";
        const lightboxRight = document.createElement('button');        
        lightboxRight.className = "lightbox__arrows"
        const lightboxClose = document.createElement('button');
        lightboxClose.className = "lightbox__x"

        document.querySelector('body').appendChild(lightboxModal);

        const allPicturesLinks = document.querySelectorAll('.picture-card__link');
        let mediaPosition = 0; //position of active media in the lightbox        

        /* Open lightbox */

        function openLigthbox(e){ 
            mediaContainer.innerHTML = "";  
            lightboxModal.appendChild(lightboxLeft);
            lightboxModal.appendChild(mediaContainer);
            lightboxModal.appendChild(lightboxRight);  
            lightboxModal.style.display = "flex";
            document.querySelector('main').style.display = "none";
            document.querySelector('header').style.display = "none";
            for(i=0;i<_media.length;i++){
                if("pC-link_" + _media[i].id == e.currentTarget.id){ 
                    if(_media[i].video){                                    // The media is a video
                        mediaContainer.appendChild(lightboxVideo);
                        lightboxVideo.appendChild(lightboxVideoSource);            
                        lightboxVideoSource.src = "../images/pictures/" + photographerName.innerHTML + "/" + _media[i].video;
                        lightboxVideo.setAttribute("title", _media[i].description);
                        mediaContainer.appendChild(lightboxVideoTitle);                    
                        lightboxVideoTitle.innerText = _media[i].title;
                        mediaPosition = _media.indexOf(_media[i]);    
                    }
                    if(_media[i].image){                                    // The media is a picture 
                        mediaContainer.appendChild(lightboxFigure);
                        lightboxFigure.appendChild(lightboxPicture);
                        lightboxFigure.appendChild(lightboxFigcaption);        
                        lightboxPicture.src = "../images/pictures/" + photographerName.innerHTML + "/" + _media[i].image;
                        lightboxPicture.setAttribute("alt", _media[i].description);
                        lightboxFigcaption.innerHTML = _media[i].title;
                        mediaPosition = _media.indexOf(_media[i]);    
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

        function nextMedia(){
            mediaContainer.innerHTML = "";
            let next = mediaPosition + 1;
            if(next == _media.length){
                next = 0;
            }if(_media[next].video){                               // The media is a video
                mediaContainer.appendChild(lightboxVideo);
                lightboxVideo.appendChild(lightboxVideoSource);            
                lightboxVideoSource.src = "../images/pictures/" + photographerName.innerHTML + "/" + _media[next].video;
                lightboxVideo.setAttribute("title", _media[next].description);
                mediaContainer.appendChild(lightboxVideoTitle);                    
                lightboxVideoTitle.innerText = _media[next].title;
                mediaPosition = _media.indexOf(_media[next]);  
            }
            if(_media[next].image){                             // The media is a picture 
                mediaContainer.appendChild(lightboxFigure);
                lightboxFigure.appendChild(lightboxPicture);
                lightboxFigure.appendChild(lightboxFigcaption);        
                lightboxPicture.src = "../images/pictures/" + photographerName.innerHTML + "/" + _media[next].image;
                lightboxPicture.setAttribute("alt", _media[next].description);
                lightboxFigcaption.innerHTML = _media[next].title;
                mediaPosition = _media.indexOf(_media[next]);               
            }
            mediaContainer.appendChild(lightboxClose);
        }

        function prevMedia(){
            mediaContainer.innerHTML = ""; 
            let prev = mediaPosition - 1;
            if(prev == -1){
                prev = _media.length - 1;
            }if(_media[prev].video){                         // The media is a video
                mediaContainer.appendChild(lightboxVideo);
                lightboxVideo.appendChild(lightboxVideoSource);            
                lightboxVideoSource.src = "../images/pictures/" + photographerName.innerHTML + "/" + _media[prev].video;
                lightboxVideo.setAttribute("title", _media[prev].description);
                mediaContainer.appendChild(lightboxVideoTitle);                    
                lightboxVideoTitle.innerText = _media[prev].title;
                mediaPosition = _media.indexOf(_media[prev]);  
            }
            if(_media[prev].image){                                // The media is a picture 
                mediaContainer.appendChild(lightboxFigure);
                lightboxFigure.appendChild(lightboxPicture);
                lightboxFigure.appendChild(lightboxFigcaption);        
                lightboxPicture.src = "../images/pictures/" + photographerName.innerHTML + "/" + _media[prev].image;
                lightboxPicture.setAttribute("alt", _media[prev].description);
                lightboxFigcaption.innerHTML = _media[prev].title;
                mediaPosition = _media.indexOf(_media[prev]);  
            }
            mediaContainer.appendChild(lightboxClose);
        }

        lightboxRight.addEventListener('click', nextMedia);
        lightboxLeft.addEventListener('click', prevMedia);

        /* Lightbox keyboard navigation */

        function keyboardNavigation(key){
            if(key.keyCode =="27"){         // "Escape" to close
                closeLigthbox();
            }
            if(key.keyCode == "37"){         // "arrow left" to previous media
                prevMedia();
            }
            if(key.keyCode == "39"){         // "arrow right" to next media
                nextMedia();
            }
        }
        
        window.addEventListener("keydown", keyboardNavigation);
    })
}

        