document.addEventListener('DOMContentLoaded', () => {
  fetchDogImages();
  fetchDogBreeds();
})

function fetchDogImages() {
  fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(resp => resp.json())
    .then(dogImages => renderDogImages(dogImages))
}

// will add the images to the DOM
function renderDogImages(json) {
  json.message.forEach(image => {
    const allImagesDiv = document.getElementById("dog-image-container")
    const imageDiv = document.createElement('div')
    const img = document.createElement('img')
    img.src = image
    img.width = '400'
    img.height = '300'
    allImagesDiv.appendChild(imageDiv).appendChild(img)
  })
}

function fetchDogBreeds() {
  fetch('https://dog.ceo/api/breeds/list/all')
    .then(resp => resp.json())
    .then(dogBreeds => renderDogBreeds(dogBreeds))
}

// will list all the dog breeds and add some eventListeners
function renderDogBreeds(json) {
  // console.log(json) 
  const breedList = document.getElementById('dog-breeds')
  const breedDropdown = document.getElementById('breed-dropdown')
  // iterate across object to get each key value(=breed name)

  for (key in json.message) {
    if (key.startsWith(breedDropdown.value)) {
      const breedListItem = document.createElement('li')
      breedList.appendChild(breedListItem)
      breedListItem.innerText = key

      breedListItem.addEventListener('click', () => {
        breedListItem.style.color = 'purple'
      })
    }
  }

  breedDropdown.addEventListener('change', () => {
    document.getElementById('dog-breeds').innerHTML = ""
    // fetchDogBreeds will fetch and render dog breeds
    // renderDogBreeds will list all the dog breeds that start with the dropdown value
    fetchDogBreeds();
  })
}

