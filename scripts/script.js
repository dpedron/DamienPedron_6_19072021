let photographers = [];
let selectedTag = null;

window.onload = function() {
  
  /* Return to main */
  const toMain = document.getElementById("to-main");

  window.addEventListener('scroll', function(){
      toMain.style.display = "none";
      if(window.pageYOffset > 170){    
      toMain.style.display = "block";
      }        
  })

  /* Header DOM */

  const categories = document.createElement("nav");
  categories.setAttribute("aria-label", "photographer categories");
  const headerTags = document.createElement("ul");
  headerTags.className = "categories categories--banner";
  const headerTag = document.createElement("li");
  headerTag.className = "tag";
  const headerTagLink = document.createElement("a");
  headerTagLink.className = "tag__link";
  headerTagLink.setAttribute("role", "link");
  headerTagLink.href = " ";

  document.querySelector("header").appendChild(categories);
  categories.appendChild(headerTags);

  /* Photographers cards DOM */

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

  photographerLink.appendChild(photographerPortrait);
  photographerLink.appendChild(photographerName);
  
  const photographerCardItems = [photographerLink, photographerLocation, photographerTagline, photographerPrice, photographerTags];

  for(let i=0;i<photographerCardItems.length;i++){
      photographerCard.appendChild(photographerCardItems[i]);
  }

  fetch("./json/FishEyeData.json")    // Get all the data for photographers and media
  .then(response => response.json())    
  .then(function(data){

    photographers = data.photographers;

    /* Header filters */

    let allFilters = [];
    for(let i=0;i<photographers.length;i++){        // Get all tags ...
      photographers[i].tags.forEach(element => {
      allFilters.push(element);
      });
    }
    
    let allUniqueFilters = [...new Set(allFilters)]; // ... and select only one by name ...

    for(let i=0;i<allUniqueFilters.length;i++){     // ... add them to the header
      headerTagLink.innerText = allUniqueFilters[i];
      hashtag.innerText = "#";
      headerTagLink.prepend(hashtag);
      headerTag.appendChild(headerTagLink);
      headerTags.appendChild(headerTag.cloneNode(true));
    }

    /* Complete photographers cards with data */

    for(let i=0;i<photographers.length;i++){
        photographerLink.href = "./pages/photographer.html?id=" + photographers[i].id;
        photographerPortrait.src = "./images/pictures/portraits/" + photographers[i].portrait;
        photographerPortrait.alt = " ";
        photographerName.innerText = photographers[i].name;
        photographerLocation.innerText = photographers[i].city + ", " + photographers[i].country;
        photographerTagline.innerText = photographers[i].tagline;
        photographerPrice.innerText = photographers[i].price + "€/jour";
        photographerTags.innerHTML = "";
        for(let j=0;j<photographers[i].tags.length;j++){
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
        for(let i=0; i<photographers.length; i++){
          let selectedTag = e.currentTarget;
          if(photographers[i].tags.some(tag => "#" + tag==selectedTag.innerText)){            // Show cards with selected tag ...
            document.getElementById("pc_" +  photographers[i].id).style.display = "flex";
          } else {                                                                            // ... hide others
            document.getElementById("pc_" +  photographers[i].id).style.display = "none";
          }
        }

        if(selectedTag!=null){                                                                // A tag is already selected ...
          for(let i=0; i<allTags.length; i++){
            if(allTags[i].innerText !== e.currentTarget.innerText){                           // ... unselect him
              allTags[i].classList.remove("tag__selected");
            }    
          }
        }

        if(e.currentTarget.classList.contains("tag__selected")){                                 // The selected tag is already selected ...
          selectedTag = null;
          for(let i=0; i<photographers.length; i++){
              document.getElementById("pc_" +  photographers[i].id).style.display = "flex";
          }
          for(let i=0; i<allTags.length; i++){                                                    // ... unselect him ...
            if(allTags[i].innerText == e.currentTarget.innerText){
              allTags[i].classList.remove("tag__selected");
            }    
          }      
        } else {                                                                                  // ... if the tag is not already selected, select him.
          selectedTag = e.currentTarget;
          for(let i=0; i<allTags.length; i++){
            if(allTags[i].innerText == e.currentTarget.innerText){
              allTags[i].classList.add("tag__selected");
            }             
          }
        }
    }

    allTags.forEach(element => {
        element.addEventListener('click', applyFilter);
    });     

  });
};