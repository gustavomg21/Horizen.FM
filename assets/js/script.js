'https://youtube.googleapis.com/youtube/v3/search?part=snippet&location=mexico&maxResults=10&order=rating&q=cumbia&safeSearch=moderate&key=AIzaSyDeJe8sits_57FL7bs0JyFNoCGBpMe900w'


fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyDeJe8sits_57FL7bs0JyFNoCGBpMe900w&q=&part=snippet`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
