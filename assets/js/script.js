let player;
// function that loads the embedded player from the youtube iframe api
function loadYouTubeAPI() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}
// determines the size of the embedded player
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

function onPlayerReady() {

}

function extractVideoId(url) {
    const regex = /[?&]([^=#]+)=([^&#]*)/g;
    let match;
    while ((match = regex.exec(url))) {
        if (match[1] === 'v') {
            return match[2];
        }
    }
    return url;
}

function playVideo() {
    const videoId = "jsLCBDlsB0k";
    player.loadVideoById(videoId);

}
let submitButton = document.getElementById('submit');
let selectedValues = [];

document.addEventListener('DOMContentLoaded', function () {
    submitButton.addEventListener('click', function () {
        const apikey = "AIzaSyDeJe8sits_57FL7bs0JyFNoCGBpMe900w"
        let url = `https://www.googleapis.com/youtube/v3/search?key=${apikey}`;
        let checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

        checkboxes.forEach(function (checkbox) {
            selectedValues.push(checkbox.value);
        });
        console.log(selectedValues);
        selectedValues.forEach((x, i) => {
            if (i === 0) {
                url += `${x}`;
            } else {
                url += `${x}`;
            }
        });
        console.log(url);

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error: \${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                player.loadVideoById(data.items[0].id.videoId);
            });
    });
    // Retrieve the saved checkbox values from localStorage
    const savedValues = localStorage.getItem('selectedValues');
    if (savedValues) {
        selectedValues = JSON.parse(savedValues);
        // Check the corresponding checkboxes based on the saved values
        selectedValues.forEach(value => {
            const checkbox = document.querySelector(`input[value="${value}"]`);
            if (checkbox) {
                checkbox.checked = true;
            }
        });
    }

});
// Save the selected checkbox values to localStorage when a checkbox is clicked
document.addEventListener('change', function (event) {
    if (event.target.matches('input[type="checkbox"]')) {
        selectedValues = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.value);
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