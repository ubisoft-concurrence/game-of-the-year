function showImage() {
    var selectElement = document.getElementById("imageSelect");
    var selectedValue = selectElement.value;
    var imgElement = document.getElementById("selectedImage");
    
    imgElement.src = selectedValue;
  }



  
  function showImagesJobs() {
    var selectElement = document.getElementById("imageSelectJobs");
    var selectedValue = selectElement.value;
    var imgContainer = document.getElementById("selectedImagesJobs");
    
    // Clear the container
    imgContainer.innerHTML = "";
    
    // Split the selected value by the delimiter "|"
    var imagePaths = selectedValue.split("|");
    
    // Display each image in the container
    imagePaths.forEach(function(path) {
      var imgElement = document.createElement("img");
      imgElement.src = path;
      imgElement.alt = "Selected Image";
      imgContainer.appendChild(imgElement);
      document.getElementById("checkbox").style.display = "flex";
    });
  }

  const selectElement = document.getElementById('imageSelectJobs');
  const messageElement = document.getElementById('stats-jobs');
  
  selectElement.addEventListener('change', function() {
    const selectedValue = this.value;
  
    if (selectedValue === '../images/sprites/icon/Slasher1.png|../images/sprites/icon/Slasher2.png') {
      messageElement.innerHTML = 'Slasher<br> HP : 50<br> ATK : 15';
    } else if (selectedValue === '../images/sprites/icon/Wall1.png|../images/sprites/icon/Wall2.png') {
      messageElement.innerHTML = 'Wall<br> HP : 70<br> ATK : 20';
    } else if (selectedValue === '../images/sprites/icon/Killer1.png|../images/sprites/icon/Killer2.png') {
      messageElement.innerHTML = 'Killer<br> HP : 40<br> ATK : 25';
    } else if (selectedValue === '../images/sprites/icon/Monster1.png|../images/sprites/icon/Monster2.png') {
        messageElement.innerHTML = 'Monster<br> HP : 100<br> ATK : 10';
    } else if (selectedValue === '../images/sprites/icon/Gunner1.png|../images/sprites/icon/Gunner2.png') {
        messageElement.innerHTML = 'Gunner<br> HP : 60<br> ATK : 15';
    } else {
      messageElement.innerHTML = '';
    }
  });


function test() {
  fetch('/characters')
  .then(response => response.json())
  .then(data => {
      let PtitDej = document.querySelector("#PtitDej");
      let PrixDej = document.querySelector("#PrixDej");
      let Entree = document.querySelector("#Entree");
      let PrixEntree = document.querySelector("#PrixEntree");
      let Plats = document.querySelector("#Plats");
      let PrixPlats = document.querySelector("#PrixPlats");
      let Desserts = document.querySelector("#Desserts");
      let PrixDesserts = document.querySelector("#PrixDesserts");
      let PlatsKID = document.querySelector("#PlatsKID");
      let PrixPlatsKID = document.querySelector("#PrixPlatsKID");
      let DessertsKID = document.querySelector("#DessertsKID");
      let PrixDessertsKID = document.querySelector("#PrixDessertsKID");
      let AvecA = document.querySelector("#AvecA");
      let PrixAvecA = document.querySelector("#PrixAvecA");
      let SansA = document.querySelector("#SansA");
      let PrixSansA = document.querySelector("#PrixSansA");
      data.forEach((data) => {
        console.log(data)
            

        });
    })
}
