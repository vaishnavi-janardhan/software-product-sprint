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
      commentsDiv.appendChild(createListElement(comment));
    })
  });
}

function createListElement(comment) {
  const liElement = document.createElement('li');
  liElement.innerText = comment.message;
  return liElement;
}
