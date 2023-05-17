let player;
let currentVideoIndex = 0;
// function that loads the embedded player from the YouTube iframe API
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
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}

function onPlayerReady() {
  // Player is ready
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    playVideo(); // Call the playVideo function to load and play the next video
  }
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
  currentVideoIndex++; // Increment the current video index
  const videoId = selectedValues[currentVideoIndex]; // Get the video ID from the updated index
  player.loadVideoById(videoId);
  player.playVideo(); // Autoplay the video
}

// selects a random integer
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

let submitButton = document.getElementById('submit');
let selectedValues = [];

document.addEventListener('DOMContentLoaded', function () {
  submitButton.addEventListener('click', function () {
    currentVideoIndex = 0; // Reset the current video index to 0
    const apikey = "AIzaSyAOivyNFTdTuBztSQCEz6o5AYOqPciGWC4";
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
        player.playVideo();
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