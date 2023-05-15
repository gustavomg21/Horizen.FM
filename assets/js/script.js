let player;

// &q=${genre}&type=video&relevanceLanguage=${langCode}&regionCode=${regionCode}

function loadYouTubeAPI() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
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
        let url = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyDeJe8sits_57FL7bs0JyFNoCGBpMe900w`;
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
        // player.loadVideoById(fetch(url));

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error: \${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data.items[0].id.videoId);
                player.loadVideoById(data.items[0].id.videoId);
            });
    });
});