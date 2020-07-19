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
        comments.forEach((comment) => {
            commentsDiv.appendChild(createListElement(comment));
        })
    });
}

function createListElement(comment) {
  const liElement = document.createElement('li');
  liElement.innerText = comment.message;
  return liElement;
}

google.charts.load("current", {packages:["timeline"]});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var container = document.getElementById('timeline-container');
  var chart = new google.visualization.Timeline(container);
  var dataTable = new google.visualization.DataTable();

  dataTable.addColumn({ type: 'string', id: 'Role' });
  dataTable.addColumn({ type: 'string', id: 'Organization' });
  dataTable.addColumn({ type: 'date', id: 'Start' });
  dataTable.addColumn({ type: 'date', id: 'End' });
  dataTable.addRows([
    [ 'Software Engineer Intern', 'Microsoft R&D India', new Date(2020, 4, 11), new Date(2020, 6, 3) ],
    [ 'President', 'Teach Code for Good', new Date(2019, 10, 4), new Date() ],
    [ 'Fellow', 'Women Techmakers Engineering Fellowship', new Date(2019, 5, 1), new Date() ]]);

  var options = {
    timeline: { groupByRowLabel: false }
  };

  chart.draw(dataTable, options);
}

window.onload = drawChart;

$(window).resize(function(){
  drawChart();
});