console.log("Javascript file is linked.");

(() => {

  // VARIABLES
    const hotspots = document.querySelectorAll(".Hotspot");
    const materialTemplate = document.querySelector("#material-template");
    const materialList = document.querySelector("#material-list");
    const loaderCon = document.querySelector("#loader-con");
    const loader = document.querySelector("#loader");
    const loaderCon2 = document.querySelector("#loader-con-2");
    const loader2 = document.querySelector("#loader-2");

   
  // FUNCTIONS
  
    // loads hotspots information
    function loadInfoBoxes() {

      loader.classList.remove("hidden");

      fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then(response => response.json())
      .then(infoBoxes => {
        const container = document.createElement("div");

        infoBoxes.forEach((infoBox, index) => {
          let selected = document.querySelector(`#hotspot-${index + 1}`);
    
          const imageElement = document.createElement('img');
          imageElement.src = infoBox.thumbnail;

          const titleElement = document.createElement('h3');
          titleElement.textContent = infoBox.heading;
    
          const textElement = document.createElement('p');
          textElement.textContent = infoBox.description;
    
          selected.innerHTML = "";
          selected.append(imageElement, titleElement, textElement);
        });

        loader.classList.add("hidden");
        loaderCon.innerHTML = "";
        loaderCon.appendChild(container);
  
      })
      .catch(error => {
        console.error(error);
        const errorMessage = document.createElement("p");
        errorMessage.textContent = `We're so sorry! Apparently something went wrong, please test your internet connection or try again later — ERROR: [${error}]`;

        loaderCon.innerHTML = "";
        loaderCon.appendChild(loader);
        loaderCon.appendChild(errorMessage);
      });
  
    }

    loadInfoBoxes();
  
    // loads material information 
    function loadMaterialInfo() {
      loader2.classList.remove("hidden");
  
      fetch("https://swiftpixel.com/earbud/api/materials")
      .then(response => response.json())
      .then(materialListData => {
          const container = document.createElement("div");

          materialListData.forEach(material => {
            // clone the template
          const clone = materialTemplate.content.cloneNode(true);
            //populate with data
          const materialHeading = clone.querySelector(".material-heading");
          materialHeading.textContent = material.heading;
    
          const materialDescription = clone.querySelector(".material-description");
          materialDescription.textContent = material.description;
    
          materialList.appendChild(clone);
       });

       loader2.classList.add("hidden");
       loaderCon2.innerHTML = "";
       loaderCon2.appendChild(container);
        
      })
      .catch(error => {
        console.error(error);
        
        const errorMessage = document.createElement("p");
        errorMessage.textContent = `We're so sorry! Apparently something went wrong, please test your internet connection or try again later — ERROR: [${error}]`;

        loaderCon2.innerHTML = "";
        loaderCon2.appendChild(loader2);
        loaderCon2.appendChild(errorMessage);
      });
    }
  
    function showInfo() {
      let selected = document.querySelector(`#${this.slot}`);
      gsap.to(selected, 1, { autoAlpha: 1 });
    }
  
    function hideInfo() {
      let selected = document.querySelector(`#${this.slot}`);
      gsap.to(selected, 1, { autoAlpha: 0 });
    }
  
    loadMaterialInfo();
    
  // EVENT LISTENERS
  hotspots.forEach(hotspot => {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
});
  
  })();
  
  