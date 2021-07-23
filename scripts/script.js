
window.onload = function() {

    const photographersSection = document.getElementById('photographers-section');
    const photographerCard = document.createElement("article");
    photographerCard.className = "photographer-card";
    const photographerLink = document.createElement("a");
    photographerLink.className = "photographer-card__link";
    const photographerPortrait = document.createElement("div");
    photographerPortrait.className = "photographer-card__picture";
    const photographerName = document.createElement("h2");
    photographerName.className = "photographer-card__name";
    const photographerLocation = document.createElement("p");
    photographerLocation.className = "photographer-card__location";
    const photographerTagline = document.createElement("p");
    photographerTagline.className = "photographer-card__description";
    const photographerPrice = document.createElement("p");
    photographerPrice.className = "photographer-card__price";
    
    /* Photographers cards creation */
    
    const photographerCardItems = [photographerName, photographerPortrait, photographerLocation, photographerTagline, photographerPrice];

    for(i=0;i<photographerCardItems.length;i++){
        photographerCard.appendChild(photographerCardItems[i]);
    }

    /* Complete photographers cards informations */

    fetch("../FishEyeData.json")
    .then(response => response.json())    
    .then(function(data){
        for(i=0;i<data.photographers.length;i++){
            photographerPortrait.innerText = data.photographers[i].portrait;
            photographerName.innerText = data.photographers[i].name;
            photographerLocation.innerText = data.photographers[i].city + ", " + data.photographers[i].country;
            photographerTagline.innerText = data.photographers[i].tagline;
            photographerPrice.innerText = data.photographers[i].price + "€";
            photographersSection.appendChild(photographerCard.cloneNode(true));
        }
    });
};

