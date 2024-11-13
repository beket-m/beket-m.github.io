// API endpoint
const apiEndpoint = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single"; 

// Select paragraph and button elements
const jokeText = document.getElementById("jokeText");
const getJokeButton = document.getElementById("getJokeButton");

getJokeButton.addEventListener("click", getJoke);

// Fetch a random joke from the API
function getJoke() {
    console.log("Button clicked!"); // Check button click in console

    // Fetch data from endpoint
    fetch(apiEndpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            return response.json();
        })
        .then(data => {
            console.log(data.joke);
            displayRes(data.joke); 
        })
        .catch(error => {
            console.error("Fetch error: ", error); 
            alert("An error occurred while fetching the joke. Please try again."); 
        });
}

// Displays the joke in the paragraph
function displayRes(joke) {
    jokeText.textContent = joke;
}
