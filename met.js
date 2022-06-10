const cultureURL = 'https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q=';
const objectURL = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';

document.querySelector('#objectButton')
  .addEventListener('click', (e) => {
    e.preventDefault();
    var myForm = document.forms[0];
    var formData = new FormData(myForm);
    console.log(formData.get('objectID'));
    var objectID = formData.get('objectID');
    // fetch(baseURL)
    // .then(response => response.json())
    // .then(data => console.log('this is departments ',data));
    fetch(objectURL + objectID)
    .then(response => response.json())
    .then(data =>{ 
        console.log(data)
        // Check if the object even has any images to show
        if (data.additionalImages.length > 0) {
            generateImage(data.additionalImages);
        } else {
            window.alert("This object doesn't have any images associated with it.")
        }
    });
    // var chk_status = myForm.checkValidity();
    // myForm.reportValidity();
    // if(chk_status) 
    //   myCheckout.checkout();
  });

  document.querySelector('#cultureButton')
  .addEventListener('click', (e) => {
    e.preventDefault();
    var myForm = document.forms[1];
    var formData = new FormData(myForm);
    console.log(formData.get('culture'));
    var culture = formData.get('culture');
    fetch(cultureURL + culture)
    .then(response => response.json())
    .then(data => { 
      if (data.objectIDs > 0) {
        listObjectIDs(data);
      } else {
        window.alert("Nothing matches the culture you entered.")
      }
    });
});
    // var chk_status = myForm.checkValidity();
    // myForm.reportValidity();
    // if(chk_status) 
    //   myCheckout.checkout();

  function generateImage(data) {
      var mainDiv = document.querySelector('#picture');
      data.forEach(image => {
        var img = document.createElement('img');
        img.setAttribute('id', 'image');
        img.src = image;
        mainDiv.appendChild(img);
      });
  }

  function listObjectIDs(data) {
    console.log(data);
    var mainUL = document.querySelector('#listOfObjects');
    (data.objectIDs).forEach(entry => {
      // Output a list of objectIDs that contain the culture entered
      var p = document.createElement('p');
      p.innerHTML = entry;
      mainUL.appendChild(p);
    });  
  }