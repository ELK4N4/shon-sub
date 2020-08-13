const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const blur = document.getElementsByClassName("blur");

function closeAllForms() {
  $(".blur").addClass("invisible");
  $(".blur").removeClass("visible");
  $(".fixed-form").addClass("invisible");
  $(".fixed-form").removeClass("visible");
}



window.onscroll = function() {
  scrollFunction()
};


function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.documentElement.style.setProperty('--header-height', '5rem');
  } else {
    document.documentElement.style.setProperty('--header-height', '6.5rem');
  }
}


function closeMobileMenu() {
  $('.mobile-nav').removeClass('nav-is-open');
  $('.page').removeClass('nav-is-open');
  $('.top').removeClass('nav-is-open');
  $('.fa-bars').removeClass('nav-is-open');
  $('.fa-times').removeClass('nav-is-open');
}

$('.nav-btn').on('click', function() {
  $('.nav-blur').toggleClass('nav-is-open');
  $('.mobile-nav').toggleClass('nav-is-open');
  $('.page').toggleClass('nav-is-open');
  $('.top').toggleClass('nav-is-open');
  $('.fa-bars').toggleClass('nav-is-open');
  $('.fa-times').toggleClass('nav-is-open');
});

$('.nav-blur').on('click', function() {
  $('.nav-blur').toggleClass('nav-is-open');
  $('.mobile-nav').toggleClass('nav-is-open');
  $('.page').toggleClass('nav-is-open');
  $('.top').toggleClass('nav-is-open');
  $('.fa-bars').toggleClass('nav-is-open');
  $('.fa-times').toggleClass('nav-is-open');
});


$(document).ready(function(){
  //force HTTPS 
  /*
  if (location.protocol != 'https:') {
    location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
  }
  */

  $(".closeForm").click(function(){
    closeAllForms();
  });

  $("#login-form").submit(function(e){
    e.preventDefault();

    let email = $(this).find('input[name=email]').val();
    let password = $(this).find('input[name=password]').val();
    let remember = $(this).find('input[name=remember]').val();
    
    let data = {
      email: email,
      password: password,
      remember
    }

    $.ajax({
      url: '/auth/login',
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      dataType: 'json',
      success: function(result) {
        showAlert('success', 'מתחבר...');
        location.reload();
      },
      error: function (error) {
        showAlert('error', error.responseText);
      }
    });
  });


  $("#register-form").submit(function(e){
    e.preventDefault();

    let email = $(this).find('input[name=email]').val();
    let name = $(this).find('input[name=name]').val();
    let pass = $("#pass").val();
    let confirmPass = $("#confirm-pass").val();
    if(pass !== confirmPass) {
      $("#message").html('הסיסמאות אינן תואמות, הקש שנית').css('color', 'red')
    } else {
      $("#message").html('');
      showAlert('info', 'טוען...');

      let data = {
        name: name,
        email: email,
        password: pass
      }
      $.ajax({
        url: '/auth/register',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: 'json',
        success: function(result) {
          showAlert('success', 'הרשמתך לאתר בוצעה בהצלחה! אין צורך לאמת משתמש במייל');
          closeAllForms();
          login();
        },
        error: function (error) {
          showAlert('error', error.responseText);
        }
    });
    }
  });


  $("#update-profile-form").submit(function(e){
    e.preventDefault();
    
    var form = $("#update-profile-form")[0]; // Need to use standard javascript object here
    var formData = new FormData(form);

    // important! - body-parser don't support formData object //
    
    let data ={}
    //convert formData to a object
    for (let [key, value] of formData.entries()) { 
      data[key] = value;
    }

    if(data.password == '') {
      delete data.password;
    }

    $.ajax({
        url: '/user/profile',
        type: 'PUT',
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: 'json',
        success: function(result) {
          showAlert('success', 'הפרופיל עודכן בהצלחה!');
          location.reload();
        },
        error: function (error) {
          showAlert('error', error.responseText);
        }
    });
    return true;

  });

  $(".new-comment-btn").click(function(){
      $("#new-comment-form").addClass("visible");
      $("#new-comment-form").removeClass("invisible");
  });

  $(".add-comment").click(function(e){
    e.preventDefault();

    let link = `${window.location.pathname}/comments`;
    let message = $(`#new-comment-form textarea[name=message]`).val();
    $("#new-comment-form").removeClass("visible");
    $("#new-comment-form").addClass("invisible");

    $.ajax({
        url: link,
        type: 'POST',
        data: JSON.stringify({message: message}),
        contentType: 'application/json',
        success: function(result) {
          showAlert('success', 'טוען...');
          location.reload();
        },
        error: function (error) {
            showAlert('error', error.responseText);
            $("#new-comment-form").addClass("visible");
            $("#new-comment-form").removeClass("invisible");
        }
    });
    return true;

    });

    $(".delete-comment").click(function(e){
      e.preventDefault();

      let id = $(this).parent().parent().parent().find('.comment-fields [name=id]').val();
      let link = `${window.location.pathname}/comments/${id}`;

      
      $.ajax({
          url: link,
          type: 'DELETE',
          success: function(result) {
              location.reload();
          },
          error: function (error) {
              showAlert('error', error.responseText);
          }
      });
      return true;

    });

    let id;
    let link;
    let message;
    $(".edit-comment").click(function(e){

      id = $(this).parent().parent().parent().find('.comment-fields [name=id]').val();
      link = `${window.location.pathname}/comments/`;
      message = $(this).parent().parent().parent().find('.message').text();
      $(`#edit-comment-form textarea[name=message]`).val(message);
      $("#edit-comment-form").addClass("visible");
      $("#edit-comment-form").removeClass("invisible");
    });

    $(".update-comment").click(function(e){
      e.preventDefault();

      $("#edit-comment-form").removeClass("visible");
      $("#edit-comment-form").addClass("invisible");
      let newMessage = $(`#edit-comment-form textarea[name=message]`).val();
      $.ajax({
        url: link,
        type: 'PUT',
        data: JSON.stringify({
          id: id,
          message: newMessage
        }),
        contentType: 'application/json',
        success: function(result) {
          showAlert('success', 'מעדכן...');
          location.reload();
        },
        error: function (error) {
            showAlert('error', error.responseText);
            $("#edit-comment-form").addClass("visible");
            $("#edit-comment-form").removeClass("invisible");
        }
      });
      return true;

    });
  
});


function login() {
    loginForm.classList.add("visible");
    loginForm.classList.remove("invisible");
    registerForm.classList.add("invisible");
    registerForm.classList.remove("visible");
    $(".blur").addClass("visible");
    $(".blur").removeClass("invisible");
    $(".nav-blur").removeClass("nav-is-open");
    closeMobileMenu()
};

function register() {
    loginForm.classList.add("invisible");
    loginForm.classList.remove("visible");
    registerForm.classList.add("visible");
    registerForm.classList.remove("invisible");
    $(".blur").addClass("visible");
    $(".blur").removeClass("invisible");
    $(".nav-blur").removeClass("nav-is-open");
    closeMobileMenu()
};

//Alerts//
function showAlert(alert, message) {
  var newAlert = $(`<div class='alert ${alert}'></div>`);
  var alertText = $(`<div class='alert-text'></div>`).text(message);
  newAlert.append(alertText);

  var closeBtn = $(`<span class='close-alert'>&times;</span>`).on("click", function(){
    cleanAlert(newAlert);
  });
  newAlert.append(closeBtn);
  $(".alerts-container").append(newAlert);      // Append the new elements
  setTimeout(function(){ cleanAlert(newAlert)}, 5000); //clean after 5s
}

function cleanAlert(alert) {
  console.log(alert);
  alert.addClass('invisible');
  setTimeout(function(){ alert.css("display", "none")}, 600);
}

$(".close-alert").on("click", function(){
  cleanAlert($(this).parent());
});


 // Declare all variables
 let i, tabcontent, tablinks;

 // Get all elements with class="tabcontent" and hide them
 tabcontent = document.getElementsByClassName("tab-content");
 if(tabcontent[0]) { //prevent an error on another pages
  tabcontent[0].style.display = "block";
 }
function openTab(evt, tabName) {
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tab-btn");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the link that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}