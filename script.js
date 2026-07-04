const animals = [
    { name: "lion", key: "l", sound: "sounds/lion.mp3" },
    { name: "elephant", key: "e", sound: "sounds/elephant.mp3" },
    { name: "monkey", key: "m", sound: "sounds/monkey.mp3" },
    { name: "tiger", key: "t", sound: "sounds/tiger.mp3" },
    { name: "parrot", key: "p", sound: "sounds/parrot.mp3" },
    { name: "frog", key: "f", sound: "sounds/frog.mp3" },
    { name: "snake", key: "s", sound: "sounds/snake.mp3" }
];

const animalCards = document.querySelectorAll(".animal");
const backgroundMusic = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

let currentAnimalSound = null;
let musicStarted = false;

function startBackgroundMusic() {
    if (!musicStarted) {
        backgroundMusic.volume = 0.25;
        backgroundMusic.play();
        musicStarted = true;
    }
}

document.addEventListener("click", startBackgroundMusic);

function playAnimalSound(animalName) {
    if (currentAnimalSound) {
        currentAnimalSound.pause();
        currentAnimalSound.currentTime = 0;
    }

    for (let i = 0; i < animals.length; i++) {
        if (animals[i].name === animalName) {
            currentAnimalSound = new Audio(animals[i].sound);
            currentAnimalSound.play();

            highlightAnimal(animalName);
            saveLastAnimal(animalName);
            break;
        }
    }
}

function highlightAnimal(animalName) {
    animalCards.forEach(function (card) {
        card.classList.remove("active");

        if (card.dataset.animal === animalName) {
            card.classList.add("active");

            setTimeout(function () {
                card.classList.remove("active");
            }, 600);
        }
    });
}

animalCards.forEach(function (card) {
    card.addEventListener("click", function () {
        let animalName = card.dataset.animal;
        playAnimalSound(animalName);
    });
});

document.addEventListener("keydown", function (event) {
    let pressedKey = event.key.toLowerCase();

    for (let i = 0; i < animals.length; i++) {
        if (animals[i].key === pressedKey) {
            playAnimalSound(animals[i].name);
        }
    }
});

musicButton.addEventListener("click", function () {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        musicStarted = true;
        musicButton.textContent = "Stop Background Music";
    } else {
        backgroundMusic.pause();
        musicButton.textContent = "Play Background Music";
    }
});

/*
JavaScript element not learned in class: localStorage.
localStorage saves information inside the browser even after refreshing the page.
Here we save the last animal that the user clicked.
*/
function saveLastAnimal(animalName) {
    localStorage.setItem("lastAnimal", animalName);
}