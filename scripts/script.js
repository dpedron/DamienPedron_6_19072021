
window.onload = function() {

    const toMain = document.getElementById("to-main");
    window.addEventListener('scroll', function(){
        toMain.style.display = "none";
        if(window.pageYOffset > 150){    
        toMain.style.display = "block";
        };        
    })

    const photographersSection = document.getElementById('photographers-section');
    const photographerCard = document.createElement("article");
    photographerCard.className = "photographer-card";
    const photographerLink = document.createElement("a");
    photographerLink.className = "photographer-card__link";
    photographerLink.href = "#";
    const photographerPortrait = document.createElement("img");
    photographerPortrait.src = "./images/pictures/portraits/"
    photographerPortrait.className = "photographer-card__picture";
    const photographerName = document.createElement("h2");
    photographerName.className = "photographer-card__name";
    const photographerLocation = document.createElement("p");
    photographerLocation.className = "photographer-card__location";
    const photographerTagline = document.createElement("p");
    photographerTagline.className = "photographer-card__description";
    const photographerPrice = document.createElement("p");
    photographerPrice.className = "photographer-card__price";
    const photographerTags = document.createElement("ul");
    photographerTags.className = "categories photographer-card__categories";
    const photographerTag = document.createElement("li");
    photographerTag.className = "tag";
    const photographerTagLink = document.createElement("a");
    photographerTagLink.className = "tag__link";
    photographerTagLink.href = "";
    photographerTagLink.setAttribute('role', 'link');
    const hashtag = document.createElement("span");
    hashtag.setAttribute('aria-hidden', 'true');

    /* Photographers cards creation */

    photographerLink.appendChild(photographerPortrait);
    photographerLink.appendChild(photographerName);
    
    const photographerCardItems = [photographerLink, photographerLocation, photographerTagline, photographerPrice, photographerTags];

    for(i=0;i<photographerCardItems.length;i++){
        photographerCard.appendChild(photographerCardItems[i]);
    }

    /* Complete photographers cards informations */

    fetch("../json/FishEyeData.json")
    .then(response => response.json())    
    .then(function(data){
        for(i=0;i<data.photographers.length;i++){
            photographerPortrait.src = "../images/pictures/portraits/" + data.photographers[i].portrait;
            photographerName.innerText = data.photographers[i].name;
            photographerLocation.innerText = data.photographers[i].city + ", " + data.photographers[i].country;
            photographerTagline.innerText = data.photographers[i].tagline;
            photographerPrice.innerText = data.photographers[i].price + "€/jour";
            photographerTags.innerHTML = "";
            for(j=0;j<data.photographers[i].tags.length;j++){
                photographerTagLink.innerText = data.photographers[i].tags[j];
                hashtag.innerText = "#";
                photographerTagLink.prepend(hashtag);
                photographerTag.appendChild(photographerTagLink);
                photographerTags.appendChild(photographerTag.cloneNode(true));
            }
            photographersSection.appendChild(photographerCard.cloneNode(true));
        }
    });
};


