let player;


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

document.addEventListener('DOMContentLoaded', function() {
    var submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', function() {
      var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
      var selectedValues = [];
      checkboxes.forEach(function(checkbox) {
        selectedValues.push(checkbox.value);
      });
      console.log(selectedValues);



      playVideo()
    });
  });