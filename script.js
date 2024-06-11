// C1 - DATE
let today = new Date();
let day = today.getDate();
let month = today.getMonth();

today = `${day} / ${month} / ${today.getFullYear()}`;
document.getElementById("date").innerHTML = today;

function time() {
    let today = new Date();
    document.getElementById('time').innerHTML = today.toLocaleTimeString('en-US');
}

var myVar = setInterval(function () {
    time();
}, 1000);

// WEATHER PLANNER
function load() {
    fetch('https://api.quotable.io/random')
        .then(response => response.json())
        .then(data => {
            document.getElementById('quote').innerText = data.content;
            document.getElementById('author').innerText = `- ${data.author}`;
        })
        .catch(error => {
            console.error('Error fetching the quote:', error);
            document.getElementById('quote').innerText = 'Failed to load quote.';
        });
}

document.addEventListener('DOMContentLoaded', function() {
    load(); 
});