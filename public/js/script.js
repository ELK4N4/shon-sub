const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const newProjectForm = document.getElementById("new-project-form");
const editProjectForm = document.getElementById("edit-project-form");
const blur = document.getElementById("blur");

let projectName;

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

  $(".edit-text").click(function(){


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
    console.log(link);
    $.ajax({
        url: '/projects/' + link,
        type: 'PUT',
        data: $('#edit-project-form').serialize(),
        success: function(result) {
            location.reload();
        }
    });
    return true;

  });

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

