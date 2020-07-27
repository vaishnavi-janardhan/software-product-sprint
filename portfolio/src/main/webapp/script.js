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

jQuery.validator.addMethod("containsAtleastOneLetter", function(value, element) {
    return this.optional(element) || value.match(/[a-zA-Z]/);
  },
  'Comment must have at least one letter'
);

$(function() {
  $("form[name='comment-form']").validate({
    rules: {
      "comment-message": {
        required: true,
        minlength: 3,
        containsAtleastOneLetter: true
      }  
    },
    messages: {
      "comment-message": {
        required: "Please enter some message",
        minlength: "The message must be at least 3 characters long"
      }
    },
    submitHandler: function(form,e) {
      e.preventDefault();
      $.ajax({
        url: "/data",
        type: "POST",
        data: $('#comment-form').serialize(),
        contentType: "application/x-www-form-urlencoded",
        success: function () {
          showComments();
        },
        error: function(response) {
          alert('Invalid comment message');
          for (key in response) {
            console.log(key + ": " + JSON.stringify(response[key]));
          }
          console.log("Error: " + response);
        }
      });
      $("#comment-form").trigger("reset");
    }
  });
});

function showComments() {
  console.log('Fetching comments.');
  fetch('/data').then(response => response.json()).then((comments) => {
    console.log(comments);
    const commentsDiv = document.getElementById('comments-container');
    commentsDiv.innerHTML = '';
    const hElement = document.createElement('h3');
    hElement.innerText = "Comments";
    commentsDiv.appendChild(hElement);
    comments.forEach((comment) => {
      commentsDiv.appendChild(createCommentItem(comment));
    })
  });
}

function createCommentItem(comment) {
  const pElement = document.createElement('p');
  pElement.innerText = comment.message;
  return pElement;
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
