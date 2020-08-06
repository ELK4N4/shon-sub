const newProjectForm = document.getElementById("new-project-form");
const editProjectForm = document.getElementById("edit-project-form");
const newEpisodeForm = document.getElementById("new-episode-form");
const editEpisodeForm = document.getElementById("edit-episode-form");

let projectName;
let episodeNumber;

$(document).ready(function(){
    $(".new-project-btn").click(function(){
        newProjectForm.classList.add("visible");
        newProjectForm.classList.remove("invisible");
        loginForm.classList.add("invisible");
        loginForm.classList.remove("visible");
        registerForm.classList.add("invisible");
        registerForm.classList.remove("visible");
        blur.classList.add("visible");
        blur.classList.remove("invisible");
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
        let link = projectName.replace(/ /g,"-").replace(/(\?)/g,"%3F").replace(/\//g,"%2F").replace(/\\/g, '%5C');

        var form = $("#edit-project-form")[0]; // Need to use standard javascript object here
        var formData = new FormData(form);

        formData.getAll('name');
        // Attach file
        //formData.append('image', $('input[type=file]')[0].files[0]);
        $.ajax({
            url: '/projects/' + link,
            type: 'PUT',
            data: formData,
            contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
            processData: false, // NEEDED, DON'T OMIT THIS
            success: function(result) {
                window.location.replace("/projects/" + $('#edit-project-form').find('[name=name]').val().replace(/ /g,"-").replace(/(\?)/g,"%3F").replace(/\//g,"%2F").replace(/\\/g, '%5C') );
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError);
                alert(xhr.responseText);
            }
        });
        return true;

    });


    $(".delete-project").click(function(e){
        e.preventDefault();
        let link = projectName.replace(/ /g,"-").replace(/ /g,"-").replace(/(\?)/g,"%3F").replace(/\//g,"%2F").replace(/\\/g, '%5C');
        console.log(link);
        $.ajax({
            url: '/projects/' + link,
            type: 'DELETE',
            success: function(result) {
                location.replace('/projects');
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError);
                alert(xhr.responseText);
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
        

        $("#edit-episode-form").addClass("visible");
        $("#edit-episode-form").removeClass("invisible");
    });



    $(".update-episode").click(function(e){
        e.preventDefault();

        let link = `${window.location.pathname}/${episodeNumber}`;
        if(window.location.pathname.split('/')[3]) {
            link = `${window.location.pathname.split('/')[0]}/${window.location.pathname.split('/')[1]}/${window.location.pathname.split('/')[2]}/${episodeNumber}`;
        }
        var form = $("#edit-episode-form")[0]; // Need to use standard javascript object here
        var formData = new FormData(form);

        formData.getAll('name');
        // Attach file
        //formData.append('image', $('input[type=file]')[0].files[0]);

        $.ajax({
            url: link,
            type: 'PUT',
            data: formData,
            contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
            processData: false, // NEEDED, DON'T OMIT THIS
            success: function(result) {
                location.reload();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError);
                alert(xhr.responseText);
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
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError);
                alert(xhr.responseText);
            }
        });
        return true;

    });

    $(".new-episode-btn").click(function(){
        $("#new-episode-form").addClass("visible");
        $("#new-episode-form").removeClass("invisible");
    });

});