document.addEventListener('DOMContentLoaded', (event) => {
    fetchDogs();
    fetchDogBreeds();
    renderBreedList();
});

function fetchDogs(){
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(resp => resp.json())
    .then(dogs => renderDogs(dogs));
}

function renderDogs(json){
    const imageDiv = document.getElementById("dog-image-container");
    json.message.forEach(dog => {
        const img = document.createElement("img");
        img.src = dog
        imageDiv.append(img)
    })
}

function fetchDogBreeds(){
    fetch("https://dog.ceo/api/breeds/list/all")
    .then(resp => resp.json())
    .then(dogs => renderDogsBreed(dogs));
}

function renderDogsBreed(json){
    console.log(json);
    const dogBreedList = document.getElementById("dog-breeds");
    const dropDown = document.getElementById("breed-dropdown");

    //const dogList = document.getElementsByTagName("li");
    //json.message.forKeyIn(breed => {
    for (key in json.message){
            if (key.startsWith(dropDown.value)){
                const li = document.createElement("li");
                li.textContent = key
                dogBreedList.append(li);
                li.addEventListener('click', (event) => {
                   li.style.color = "purple";
             });
        }
     }
}

function renderBreedList(){
    const dropDown = document.getElementById("breed-dropdown");
    dropDown.addEventListener("change", (event) => {
        document.getElementById("dog-breeds").textContent = "";
        fetchDogBreeds();
    });
}