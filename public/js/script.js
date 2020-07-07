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
  $('.fa-bars').removeClass('nav-is-open');;
  $('.fa-times').removeClass('nav-is-open');;
}

$('.nav-btn').on('click', function() {
    $('.mobile-nav').toggleClass('nav-is-open');
    $('.page').toggleClass('nav-is-open');
    $('.top').toggleClass('nav-is-open');
    $('.fa-bars').toggleClass('nav-is-open');;
    $('.fa-times').toggleClass('nav-is-open');;
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


  $("#register-form").submit(function(e){
    let pass = $("#pass").val();
    let confirmPass = $("#confirm-pass").val();
    console.log(confirmPass);
    console.log(confirmPass);
    if(pass !== confirmPass) {
      $("#message").html('הסיסמאות אינן תואמות, הקש שנית').css('color', 'red')
      e.preventDefault();
    } else {
      $("#message").html('');
      $(this).submit();
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
          console.log(result);
          location.reload();
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(thrownError);
          alert(xhr.responseText);
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
    closeMobileMenu()
};

function register() {
    loginForm.classList.add("invisible");
    loginForm.classList.remove("visible");
    registerForm.classList.add("visible");
    registerForm.classList.remove("invisible");
    $(".blur").addClass("visible");
    $(".blur").removeClass("invisible");
    closeMobileMenu()
};


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