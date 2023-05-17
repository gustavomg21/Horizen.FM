let player;
let currentVideoIndex = 0;
// create new '<script>' element, sets its source to the youtube iframe api url, inserts it into the DOM
function loadYouTubeAPI() {
    const tag = document.createElement('script'); // this line creates a new '<script>' element and assigns it to the variable 'tag'. this element will be used to load the youtube iframe api.
    tag.src = 'https://www.youtube.com/iframe_api'; // the 'src' property of the 'tag' element is set to the url of the youtube iframe api. this url points to the javascript file that contains the necessarty functions and code for interacting with the youtube player.
    const firstScriptTag = document.getElementsByTagName('script')[0]; // here the first '<script>' element on the page is obtained using the 'getElementsByTagName' method, which returns a collection of elements with the specified tag name. the '[0]' index is used to select the first script element.
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); // the 'insertBefore' method is called on the parent node of the 'firstScriptTag' element. this method inserts the 'tag' element as a child node just before the 'firstScriptTag' element. this effectively adds the dynamically created '<script>' element to the DOM, triggering the loading of the youtube iframe api.
}
// sets up th youtube player instance
function onYouTubeIframeAPIReady() {
    const playerContainer = document.getElementById('player'); // this line retrieves the DOM element with the id 'player' and assigns it to the variable 'playerContainer'. this element serves as the container for the youtube player
    const containerWidth = playerContainer.clientWidth; // the width of the 'playerContainer' element is obtained using the 'clientWidth' property. this represents the visible width of the container.
    const containerHeight = containerWidth * 9 / 16; // 'containerHeight' is calculated by multiplying the 'containerWidth' by the aspect ratio of 9:16. this ensures that the height of the player maintains the correct proportions
    player = new YT.Player('player', { // a new instance of the youtube 'player' object is created and assigned to the variable 'player'. it is initialized with the 'player' DOM element, specifying the desired 'height' and 'width' based on the calculated 'containerHeight' and 'containerWidth' values.
        height: containerHeight,
        width: containerWidth,
        events: { // the 'events' property is set to an object that contains event handlers. in this case, the 'onReady' event is specified, which will call the 'onPlayerReady' function when the player is ready to receive commands.
            onReady: onPlayerReady
        }
    });
}

// selects a random integer
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
function onPlayerReady() {
  currentVideoIndex++; // Increment the current video index
  const videoId = selectedValues[currentVideoIndex]; // Get the video ID from the updated index
  player.loadVideoById(videoId);
  player.playVideo(); // Autoplay the video
}

function extractVideoId(url) {
    const regex = /[?&]([^=#]+)=([^&#]*)/g; // this line defines a regular expression 'regex' pattern that matches query parameters in a url. it looks for patterns in the form of '?key=value' or '&key=value' and captures the key and value parts.
    let match; // this initializes the variable 'match' which will be used to store the results of the regular expression match.
    while ((match = regex.exec(url))) { // this while loop executes the regular expression match on the 'url' string and iterates over all the matches found.
        if (match[1] === 'v') { // inside the loop, it checks if the captured key 'match[1]' is equal to 'v', which indicates the video ID in a youtube url. if a match is found, it returns the corresponding value 'match[2]', which represents the video id.
            return match[2];
        }
    }
    return url; // if no video id is found in the url, the function returns the orginal 'url' string.
}

function playVideo() {



}

let submitButton = document.getElementById('submit');
let selectedValues = [];

// add event listener
document.addEventListener('DOMContentLoaded', function () {
    submitButton.addEventListener('click', function () { // this code adds an event listener to a submit button, triggering the callback function when the button is clicked.
        const apikey = "AIzaSyDeJe8sits_57FL7bs0JyFNoCGBpMe900w"
        let url = `https://www.googleapis.com/youtube/v3/search?key=${apikey}`;
        let checkboxes = document.querySelectorAll('input[type="checkbox"]:checked'); // this line retrieves all the checked checkboxes with the type 'checkbox' from the document and assigns them to the 'checkboxes' variable.

        checkboxes.forEach(function (checkbox) { // a loop iterates over each checked checkbox, and the value of each checkbox is added to the 'selectedValues' array.
            selectedValues.push(checkbox.value);
        });
        console.log(selectedValues);
        selectedValues.forEach((x, i) => { // another loop iterates over each value in the 'selectedValues' array. it appends the values to the 'url' string, creating a comma-separated list of values to be included in the api request.
            if (i === 0) {
                url += `${x}`;
            } else {
                url += `${x}`;
            }
        });
        console.log(url);

        fetch(url) // the 'fetch' function is used to send an HTTP GET request to the constructed 'url'. the response is then processed in the subsequent 'then' blocks.
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error: \${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                var randomer = getRandomInt(0, data.items.length); // a random integer between 0 and the length of the 'items' array in the retrieved 'data' is generated using the 'getRandomInt' function.
                player.loadVideoById(data.items[randomer].id.videoId); // the 'loadVideoById' function is called on the 'player' object to load a video based on the randomly selected video id from the 'data' response.
            });
    });
    // Get the saved checkbox values from localStorage
    const savedValues = localStorage.getItem('selectedValues');
    // if there are ANY checkmarks
    if (savedValues) {
        // this converts the JSON of the saved checks into a JS object
        selectedValues = JSON.parse(savedValues);
        // Check the corresponding checkboxes based on the saved values
        selectedValues.forEach(value => {
            const checkbox = document.querySelector(`input[value="${value}"]`);
            if (checkbox) {
                // makes sure to that the set checkboxes are definitley set to true
                checkbox.checked = true;
            }
        });
    }

});
// Listens for a checkbox 'click' and saves to localStorage 
document.addEventListener('change', function (event) {
    // if input is a checkbox
    if (event.target.matches('input[type="checkbox"]')) {
        // basically creates an array of all the checkboxes that have been checked
        selectedValues = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
            // .map is used because it will remember the order
            .map(checkbox => checkbox.value);
        // converts the selected boxes to a JSON string
        localStorage.setItem('selectedValues', JSON.stringify(selectedValues));
    }
});

let unsplashApi = "5nKmn5B6ZGiuWslMAID0LAGwtdxXeDr6dsNIWWOI6q4"
document.body.setAttribute('id', 'background-container');

async function fetchAndSetBackground() {
    const selectedValues = localStorage.getItem('selectedValues');
    const response = await fetch(`https://api.unsplash.com/search/photos?query=music&per_page=20&client_id=${unsplashApi}`, {
    });
    const data = await response.json();
    console.log(data);
    const imageUrl = data.results[0].urls.regular;
    document.getElementById('background-container').style.backgroundImage = `url(${imageUrl})`;
}

fetchAndSetBackground();