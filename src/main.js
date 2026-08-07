import './style.css'

const API_KEY = import.meta.env.VITE_NASA_API_KEY;

document.querySelector("#app").innerHTML = "<h1>Just a sec..</h1>";
document.querySelector("#loading").innerHTML = `<img src="src/loading.gif" alt="loading">`;

function reload(date){
    if (date){
        fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`).
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
            document.querySelector("#loading").innerHTML = "";

        }).catch(err => {
            document.querySelector("#app").innerHTML = `<p>Error: ${err.message}</p>`;
        });
    }
    else{
        fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`).
        then(response => response.json()).then(data => {
            document.querySelector("#app").innerHTML = `<h1>${data.title}</h1>`;
            if (data.media_type === "image") {
                document.querySelector("#image").innerHTML = `<img src="${data.url}" alt="${data.title}">`;
            }
            else if (data.media_type === "video") {
                document.querySelector("#image").innerHTML = `<video src="${data.url}" controls></video>`;
            }
            else{
                document.querySelector("#image").innerHTML = `<iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>`;
            }
            document.querySelector("#description").innerHTML = `<p>${data.explanation}</p>`;
            document.querySelector("#loading").innerHTML = "";

        }).catch(err => {
            document.querySelector("#app").innerHTML = `<p>Error: ${err.message}</p>`;
            document.querySelector("#image").innerHTML = "";
            document.querySelector("#description").innerHTML = "";
        })
    }
}

reload()

document.querySelector("#datepicker").addEventListener("change", () => {
  const date = document.querySelector("#datepicker").value;
  reload(date);
});


