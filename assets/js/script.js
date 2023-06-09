let player;
let currentVideoIndex = 0;
// create new '<script>' element, sets its source to the youtube iframe api url, inserts it into the DOM
function loadYouTubeAPI() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// Set up the YouTube player instance
function onYouTubeIframeAPIReady() {
    const playerContainer = document.getElementById('player');
    const containerWidth = playerContainer.clientWidth;
    const containerHeight = containerWidth * 9 / 16;
    player = new YT.Player('player', {
        height: containerHeight,
        width: containerWidth,
        events: {
            onReady: onPlayerReady
        }
    });
}

// Handle when the YouTube player is ready
// selects a random integer
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
function onPlayerReady() {
    currentVideoIndex++;
    const videoId = selectedValues[currentVideoIndex];
    player.loadVideoById(videoId);
    player.playVideo();
}

// Extract the video ID from a YouTube URL
function extractVideoId(url) {
    const regex = /[?&]([^=#]+)=([^&#]*)/;
    let match;
    while ((match = regex.exec(url))) {
        if (match[1] === 'v') {
            return match[2];
        }
    }
    return url;
}

// Select a random integer
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
function playVideo() {
};


}

let submitButton = document.getElementById('submit');
let selectedValues = [];

// Add event listener
document.addEventListener('DOMContentLoaded', function () {
    submitButton.addEventListener('click', function () { // this code adds an event listener to a submit button, triggering the callback function when the button is clicked.
        const apikey = "AIzaSyDqDkFIMSCb4LEPC7FRPe6DIPGM3UX0BAM"
        let url = `https://www.googleapis.com/youtube/v3/search?key=${apikey}`;
        let checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

        checkboxes.forEach(function (checkbox) {
            selectedValues.push(checkbox.value);
        });

        selectedValues.forEach((x, i) => {
            if (i === 0) {
                url += `${x}`;
            } else {
                url += `${x}`;
            }
        });

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                var randomer = getRandomInt(0, data.items.length);
                player.loadVideoById(data.items[randomer].id.videoId);
            });
    });

    // Get the saved checkbox values from localStorage
    const savedValues = localStorage.getItem('selectedValues');
    if (savedValues) {
        selectedValues = JSON.parse(savedValues);
        selectedValues.forEach(value => {
            const checkbox = document.querySelector(`input[value="${value}"]`);
            if (checkbox) {
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