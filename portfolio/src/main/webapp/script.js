$(document).ready(function() {
  var options = {
    strings: ['More updates coming soon', 'Stay home, stay safe', 'Code, Coffee, Sleep, Repeat'],
    loop: true,
    startDelay: 1000,
    typeSpeed: 50,
    backDelay: 1000,
    backSpeed: 50
  };
  var typed = new Typed('.typed', options);
});

function showComments() {
    console.log('Fetching comments.');
    fetch('/data').then(response => response.json()).then((comments) => {
        console.log(comments);
        const commentsDiv = document.getElementById('comments-container');
        for (var it in comments) {
            commentsDiv.appendChild(createListElement(comments[it]));
        }
    });
}

function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}
