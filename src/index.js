const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";
const mainDogs = document.querySelector("#dog-image-container");
const breedList = document.querySelector("#dog-breeds");
const liTag = document.getElementsByTagName("li");
const breedSelector = document.querySelector("#breed-dropdown");

function getDogs() {
  fetch(imgUrl)
    .then((response) => response.json())
    .then(renderDOg);
}

function getBreeds() {
  fetch(breedUrl)
    .then((response) => response.json())
    .then((data) => renderBreeds(data))
    .catch((e) => console.log(e.message));
}

function generateRandomColor() {
  let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  return randomColor;
}

function renderDOg(arr) {
  arr.message.forEach((dogImg) => {
    let img = document.createElement("img");
    img.src = `${dogImg}`;
    img.width = 150;
    img.height = 150;
    mainDogs.append(img);
  });
}

function renderBreeds(arr) {
  for (key in arr.message) {
    let li = document.createElement("li");
    li.innerText = key;
    li.className = "bred";
    li.addEventListener("click", (e) => {
      li.style.color = generateRandomColor();
    });
    breedList.appendChild(li);
  }
}

function search() {
  let allBreeds = document.getElementsByClassName("bred");
  breedSelector.addEventListener("change", (e) => {
    let bred = e.target.value;

    for (const breed of allBreeds) {
      if (breed.innerText[0] === bred) {
        breed.style.display = "block";
      } else {
        breed.style.display = "none";
      }
    }
  });
}

getDogs();
getBreeds();
search();
