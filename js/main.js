(() => {

  //variables
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");

  //This information needs to be removed then pulled with an AJAX Call using the Fetch API
  //this is the api url https://swiftpixel.com/earbud/api/infoboxes"

  //This information needs to be removed then pulled with an AJAX Call using the Fetch API
  //this is the api url https://swiftpixel.com/earbud/api/materials"

  
  //functions
  function loadInfoBoxes() {

    fetch("https://swiftpixel.com/earbud/api/infoboxes")
    .then(response => response.json())
    .then(infoBoxes => {
      infoBoxes.forEach((infoBox, index) => {
        let selected = document.querySelector(`#hotspot-${index + 1}`);
  
        const titleElement = document.createElement('h2');
        titleElement.textContent = infoBox.heading;
  
        const textElement = document.createElement('p');
        textElement.textContent = infoBox.description;
  
        selected.appendChild(titleElement);
        selected.appendChild(textElement);
      });

    })
    .catch();
    // error message

  }
  loadInfoBoxes();


  function loadMaterialInfo() {

    fetch("https://swiftpixel.com/earbud/api/materials")
    .then(response => response.json())
    .then(materialListData => {
        materialListData.forEach(material => {
          // clone the template
        const clone = materialTemplate.content.cloneNode(true);
          //populate with data
        const materialHeading = clone.querySelector(".material-heading");
        materialHeading.textContent = material.heading;
  
        const materialDescription = clone.querySelector(".material-description");
        materialDescription.textContent = material.description;
  
        materialList.appendChild(clone);
     })
      
    })
    .catch();
    // error message
  }
  loadMaterialInfo();


  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //Event listeners

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

})();

