let photographers = [];
let photographersName = [];

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
        photographers = data.photographers;

        /* Photographer card creation */

        for(i=0;i<photographers.length; i++){
            if(id == photographers[i].id){  

                /* Put photographer name as title of the page */
        
                document.title = data.photographers[i].name;
                
                
                photographerName.innerText = photographers[i].name;
                photographerLocation.innerText = photographers[i].city + ", " + photographers[i].country;
                photographerTagline.innerText = photographers[i].tagline;
                photographerTags.innerHTML = "";
                photographerPortrait.src = "../images/pictures/portraits/" + photographers[i].portrait;
                for(j=0;j<photographers[i].tags.length;j++){
                    photographerTagLink.innerText = photographers[i].tags[j];
                    hashtag.innerText = "#";
                    photographerTagLink.prepend(hashtag);
                    photographerTag.appendChild(photographerTagLink);
                    photographerTags.appendChild(photographerTag.cloneNode(true));
                }
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
        
        formHeading.innerHTML = "Contactez-moi<br>\ " + photographerName.innerText;
        formFirstLabel.innerText = "Prénom";
        formLastLabel.innerText = "Nom";
        formEmailLabel.innerText = "Email";
        formMessageLabel.innerText = "Votre message";
        formSubmit.innerText = "Envoyer";
        formClose.innerText = "X";

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

        const regexEmail = /[a-z][0-9]+(\.[a-z][0-9]+)*@[a-z][0-9]\.[a-z][0-9]{2,4}/;

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
        const sortByOption = document.createElement("option");        
        sortByOption.className = "sort-by__select__option";

        document.querySelector('main').appendChild(sortBy);
        sortBy.appendChild(sortByLabel);
        sortBy.appendChild(sortBySelect);        
        for(i=0;i<sortOptions.length;i++){
            sortByOption.innerText = sortOptions[i];
            sortBySelect.appendChild(sortByOption.cloneNode(true));
        }

        const media = data.media;
        
        /* Likes counter and price */ 
        
        let photographerLikes = []; /* Array of all likes */
        let totalPhotographerLikes = null; /* Total of likes */
        const reducer = (accumulator, currentValue) => accumulator + currentValue; /* Sum of likes */
            for(i=0;i<media.length;i++){               
                if(media[i].photographerId == id){
                    photographerLikes.push(media[i].likes);
                    totalPhotographerLikes = photographerLikes.reduce(reducer); 
            }    
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
        
        for(i=0;i<photographers.length;i++){
            if(id == photographers[i].id){
                price.innerHTML = photographers[i].price + "€ / jour";
            }
        }
        /* Pictures section creation */

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
        pictureLikeIcon.className = "fas fa-heart picture-card__info-likes-icon";
        pictureLikeIcon.src = "../images/heart-solid.svg";

        function addLike(){
            console.log('ok');
        };

        const allIconLike = document.querySelectorAll('.picture-card__info-likes-icon');

        allIconLike.forEach(element => {
            element.addEventListener('click', addLike);
        });  

        document.querySelector('main').appendChild(picturesSection);
        for(i=0;i<media.length;i++){

            if(media[i].photographerId == id){
                pictureCard.appendChild(pictureLink);
                pictureLink.appendChild(picture);
                pictureLink.id = media[i].id;               
                picture.src = "../images/pictures/" + photographerName.innerHTML + "/" + media[i].image;
                pictureCard.appendChild(pictureInfo);
                pictureInfo.appendChild(pictureTitle);
                pictureTitle.innerText = media[i].title;
                pictureInfo.appendChild(pictureLikesNumber);
                pictureLikesNumber.innerText = media[i].likes;
                pictureLikesNumber.appendChild(pictureLikeIcon);                
                picturesSection.appendChild(pictureCard.cloneNode(true));
            }
        }

        /* Lightbox */

        const lightboxModal = document.createElement('dialog');
        lightboxModal.className = "lightbox";
        const lightboxFigure = document.createElement('figure');
        lightboxFigure.className = "lightbox__figure";
        const lightboxPicture = document.createElement('img');
        lightboxPicture.className = "lightbox__figure-picture";
        const lightboxFigcaption = document.createElement('figcaption');
        lightboxFigcaption.className = "lightbox__figure-figcaption";
        const lightboxLeft = document.createElement('i');
        lightboxLeft.className = "lightbox__arrows fas fa-chevron-left";
        const lightboxRight = document.createElement('i');        
        lightboxRight.className = "lightbox__arrows fas fa-chevron-right"
        const lightboxClose = document.createElement('i');
        lightboxClose.className = "lightbox__x fas fa-times"

        document.querySelector('body').appendChild(lightboxModal);
        lightboxModal.appendChild(lightboxLeft);
        lightboxModal.appendChild(lightboxFigure);
        lightboxFigure.appendChild(lightboxPicture);
        lightboxFigure.appendChild(lightboxFigcaption);
        lightboxModal.appendChild(lightboxRight);
        lightboxModal.appendChild(lightboxClose);

        const allPicturesLinks = document.querySelectorAll('.picture-card__link');

        function openLigthbox(e){
            lightboxModal.style.display = "flex";
            document.querySelector('main').style.display = "none";
            document.querySelector('header').style.display = "none";
            for(i=0;i<media.length;i++){
                if(e.currentTarget.id == media[i].id){
                    lightboxPicture.src = "../images/pictures/" + photographerName.innerHTML + "/" + media[i].image;
                }
            }
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
            for(i=0;i<photographerMedia.length;i++){
                lightboxPicture.src = "../images/pictures/" + photographerName.innerHTML + "/" + photographerMedia[i+1];
                break;
            }
        }

        function previousMedia(){
            for(i=0;i<photographerMedia.length;i++){
                    lightboxPicture.src = "../images/pictures/" + photographerName.innerHTML + "/" + photographerMedia[i-1];
                    break;
            }
        }

        lightboxRight.addEventListener('click', nextMedia);
        lightboxLeft.addEventListener('click', previousMedia);
    })
}
