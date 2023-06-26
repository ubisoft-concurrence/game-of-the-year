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
    });
  }