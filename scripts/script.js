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
    photographerPortrait.setAttribute('alt','""');
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

        /* Filters */

        let allFilters = [];

        /* Get all tags */
        for(i=0;i<photographers.length;i++){
          photographers[i].tags.forEach(element => {
          allFilters.push(element);
          });
        };

        /* Get all UNIQUE tags */
        let allUniqueFilters = [...new Set(allFilters)];

        const categories = document.createElement("nav");
        categories.setAttribute("aria-label", "photographer categories");
        const headerTags = document.createElement("ul");
        headerTags.className = "categories categories--banner";
        const headerTag = document.createElement("li");
        headerTag.className = "tag";
        const headerTagLink = document.createElement("a");
        headerTagLink.className = "tag__link";
        headerTagLink.setAttribute("role", "link")

        document.querySelector("header").appendChild(categories);
        categories.appendChild(headerTags);

        for(i=0;i<allUniqueFilters.length;i++){
          headerTagLink.innerText = allUniqueFilters[i];
          hashtag.innerText = "#";
          headerTagLink.prepend(hashtag);
          headerTag.appendChild(headerTagLink);
          headerTags.appendChild(headerTag.cloneNode(true));
      }



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
              let selectedTag = e.currentTarget;
              if(photographers[i].tags.some(tag => "#" + tag==selectedTag.innerText))
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
              for(i=0; i<allTags.length; i++){
                if(allTags[i].innerText !== e.currentTarget.innerText){
                  allTags[i].classList.remove("tag__selected");
                }    
              }
            }
            // si le tag sur lequel on a cliqué maintenant, est le même qui était déjà sélectionné...
            if(e.currentTarget.className=="tag__link tag__selected")
            {
              // ... il a déja été "éteint", et on marque qu'actuellement, plus aucun tag n'est sélectionné.
              selectedTag = null;
              for(i=0; i<photographers.length; i++){
                  document.getElementById("pc_" +  photographers[i].id).style.display = "flex";
              }
              for(i=0; i<allTags.length; i++){
                if(allTags[i].innerText == e.currentTarget.innerText){
                  allTags[i].classList.remove("tag__selected");
                }    
              }      
            }
            else
            {
              // ... sinon, on sauvegarde le tag sélectionné pour le prochain appel de la fonction,
              selectedTag = e.currentTarget;
              // et on "allume" le nouveau  tag sélectionné.
              for(i=0; i<allTags.length; i++){
                if(allTags[i].innerText == e.currentTarget.innerText){
                  allTags[i].classList.add("tag__selected");
                }             
              }
            }
        };

        allTags.forEach(element => {
            element.addEventListener('click', applyFilter);
        });     

    });
};