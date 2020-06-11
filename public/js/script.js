const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const newProjectForm = document.getElementById("new-project-form");
const editProjectForm = document.getElementById("edit-project-form");
const newEpisodeForm = document.getElementById("new-episode-form");
const editEpisodeForm = document.getElementById("edit-episode-form");
const blur = document.getElementById("blur");

let projectName;
let episodeNumber;

$(document).ready(function(){

  $(".closeForm").click(function(){
    if($(this).attr("id") == "blur") {
        $(loginForm).addClass("invisible");
        $(loginForm).removeClass("visible");
        $(registerForm).addClass("invisible");
        $(registerForm).removeClass("visible");
        $(newProjectForm).addClass("invisible");
        $(newProjectForm).removeClass("visible");
        blur.classList.add("invisible");
        blur.classList.remove("visible");
    } 
    else {
        $(this).parent().addClass("invisible");
        $(this).parent().removeClass("visible");
        blur.classList.add("invisible");
        blur.classList.remove("visible");
      }
  });

  $(".edit-project").click(function(){


    var values = $(this).parent().parent().find('.project-fields').serializeArray();
    values.forEach(value => {
        $(`#edit-project-form input[name=${value.name}]`).val(value.value);
        $(`#edit-project-form textarea[name=${value.name}`).val(value.value);
        $(`#edit-project-form select[name=${value.name}`).val(value.value);
    });

    projectName = $(`#edit-project-form input[name=name]`).val();

    $("#edit-project-form").addClass("visible");
    $("#edit-project-form").removeClass("invisible");
  });



  $(".update-project").click(function(e){
    e.preventDefault();
    let link = projectName.replace(/ /g,"-");

    var form = $("#edit-project-form")[0]; // Need to use standard javascript object here
    var formData = new FormData(form);

    formData.getAll('name');
    // Attach file
    formData.append('image', $('input[type=file]')[0].files[0]);

    $.ajax({
        url: '/projects/' + link,
        type: 'PUT',
        data: formData,
        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false, // NEEDED, DON'T OMIT THIS
        success: function(result) {
            location.reload();
        }
    });
    return true;

  });


  $(".delete-project").click(function(e){
    e.preventDefault();
    let link = projectName.replace(/ /g,"-");
    console.log(link);
    $.ajax({
        url: '/projects/' + link,
        type: 'DELETE',
        success: function(result) {
            location.reload();
        }
    });
    return true;

  });

  $(".new-episode-btn").click(function(){
    $("#new-episode-form").addClass("visible");
    $("#new-episode-form").removeClass("invisible");
  });


  $(".edit-episode").click(function(){


    var values = $(this).parent().parent().find('.episode-fields').serializeArray();
    values.forEach(value => {
        $(`#edit-episode-form input[name=${value.name}]`).val(value.value);
        $(`#edit-episode-form textarea[name=${value.name}`).val(value.value);
        $(`#edit-episode-form select[name=${value.name}`).val(value.value);
    });

    episodeNumber = $(`#edit-episode-form input[name=episodeNumber]`).val();
    console.log(episodeNumber);

    $("#edit-episode-form").addClass("visible");
    $("#edit-episode-form").removeClass("invisible");
  });



  $(".update-episode").click(function(e){
    e.preventDefault();
    let link = `${window.location.pathname}/${episodeNumber}`;
    var form = $("#edit-episode-form")[0]; // Need to use standard javascript object here
    var formData = new FormData(form);

    formData.getAll('name');
    // Attach file
    formData.append('image', $('input[type=file]')[0].files[0]);

    $.ajax({
        url: link,
        type: 'PUT',
        data: formData,
        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false, // NEEDED, DON'T OMIT THIS
        success: function(result) {
            location.reload();
        }
    });
    return true;

  });


  $(".delete-episode").click(function(e){
    e.preventDefault();
    let link = `${window.location.pathname}/${episodeNumber}`;
    $.ajax({
        url: link,
        type: 'DELETE',
        success: function(result) {
            location.reload();
        }
    });
    return true;

  });

  $(".new-episode-btn").click(function(){
    $("#new-episode-form").addClass("visible");
    $("#new-episode-form").removeClass("invisible");
  });


  /*
  $(".add-episode").click(function(e){
    //e.preventDefault();
    

    let link = window.location.pathname;
    console.log(link);
    $.ajax({
        url: link,
        type: 'POST',
        cache: false,
        contentType: false,
        processData: false,
        data: $('#new-episode-form').serialize(),
        success: function(result) {
            location.reload();
        }
    });
    return true;

  });
  */

});

function showForm(form) {
    form.classList.add("invisible");
    form.classList.remove("visible");
    blur.classList.add("invisible");
    blur.classList.remove("visible");
};


function login() {
    loginForm.classList.add("visible");
    loginForm.classList.remove("invisible");
    registerForm.classList.add("invisible");
    registerForm.classList.remove("visible");
    blur.classList.add("visible");
    blur.classList.remove("invisible");
};

function register() {
    loginForm.classList.add("invisible");
    loginForm.classList.remove("visible");
    registerForm.classList.add("visible");
    registerForm.classList.remove("invisible");
    blur.classList.add("visible");
    blur.classList.remove("invisible");
};

function newProject() {
    newProjectForm.classList.add("visible");
    newProjectForm.classList.remove("invisible");
    loginForm.classList.add("invisible");
    loginForm.classList.remove("visible");
    registerForm.classList.add("invisible");
    registerForm.classList.remove("visible");
    blur.classList.add("visible");
    blur.classList.remove("invisible");
};

