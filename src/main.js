const date = document.querySelector("#datepicker").value;

const API_KEY = import.meta.env.VITE_NASA_API_KEY;

fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`)

document.querySelector("#app").innerHTML = "<h1>Just a sec..</h1>";

fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`).
then(response => response.json()).then(data => {
    document.querySelector("#app").innerHTML = `<h1>${data.title}</h1>`;
    if (data.media_type === "image") {
        document.querySelector("#image").innerHTML = `<img src="${data.url}" alt="${data.title}">`;
    }
    else if (data.media_type === "video") {
        document.querySelector("#image").innerHTML = `<video src="${data.url}" controls></video>`;
    }
    else {
        document.querySelector("#image").innerHTML = `<iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>`;
    }
    document.querySelector("#description").innerHTML = `<p>${data.explanation}</p>`;
}).catch(err => {
    document.querySelector("#app").innerHTML = `<p>Error: ${err.message}</p>`;
});