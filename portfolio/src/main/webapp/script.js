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

function showHelloMessage() {
    console.log('Fetching message.');
    fetch('/data').then(response => response.text()).then((message) => {
        document.getElementById('message-container').innerHTML = message;
    });
}
