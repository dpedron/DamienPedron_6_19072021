let photographers = [];
let selectedTag = null;

window.onload = function() {

    const toMain = document.getElementById("to-main");

    window.addEventListener('scroll', function(){
        toMain.style.display = "none";
        if(window.pageYOffset > 170){    
        toMain.style.display = "block";
        };        
    })

    const photographersSection = document.getElementById('photographers-section');
    const photographerCard = document.createElement("article");
    photographerCard.className = "photographer-card";
    const photographerLink = document.createElement("a");
    photographerLink.className = "photographer-card__link";
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

    fetch("./json/FishEyeData.json")
    .then(response => response.json())    
    .then(function(data){
        photographers = data.photographers;
        for(i=0;i<photographers.length;i++){
            photographerLink.href = "./pages/photographer.html?id=" + photographers[i].id;
            photographerPortrait.src = "./images/pictures/portraits/" + photographers[i].portrait;
            photographerName.innerText = photographers[i].name;
            photographerLocation.innerText = photographers[i].city + ", " + photographers[i].country;
            photographerTagline.innerText = photographers[i].tagline;
            photographerPrice.innerText = photographers[i].price + "€/jour";
            photographerTags.innerHTML = "";
            for(j=0;j<photographers[i].tags.length;j++){
                photographerTagLink.innerText = photographers[i].tags[j];
                hashtag.innerText = "#";
                photographerTagLink.prepend(hashtag);
                photographerTag.appendChild(photographerTagLink);
                photographerTags.appendChild(photographerTag.cloneNode(true));
            }
            let pC = photographerCard.cloneNode(true);
            pC.id = "pc_" + photographers[i].id;
            photographersSection.appendChild(pC);
        }


        /* Filters */

    let allTags = document.querySelectorAll('.tag__link');

       function applyFilter(e){
            e.preventDefault();
            for(i=0; i<photographers.length; i++){
                if(photographers[i].tags.any(tag => tag==selectedTag))
              {
                document.getElementById("pc_" +  photographers[i].id).style.display = "flex";
              }
              else
              {
                document.getElementById("pc_" +  photographers[i].id).style.display = "none";
              }
            }

            // si un tag était précédement sélectionné...
            if(selectedTag!=null)
            {
              // .. alors on l' "éteint" 
              selectedTag.classList.remove("tag_selected");
            }

            // si le tag sur lequel on a cliqué maintenant, est le même qui était déjà sélectionné...
            if(selectedTag==e.currentTarget)
            {
              // ... il a déja été "éteint", et on marque qu'actuellement, plus aucun tag n'est sélectionné.
              selectedTag = null;
            }
            else
            {
              // ... sinon, on sauvegarde le tag sélectionné pour le prochain appel de la fonction,
              selectedTag = e.currentTarget;
              // et on "allume" le nouveau  tag sélectionné.
              e.currentTarget.classList.add("tag_selected");
            }
        };

        allTags.forEach(element => {
            element.addEventListener('click', applyFilter);
        });
        

    });
};


