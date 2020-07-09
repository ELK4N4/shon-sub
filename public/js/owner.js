$(document).ready(function(){

    $.ajax({
        url: '/user/admins/',
        type: 'GET',
        success: function(admins) {
          admins.forEach(admin => {
            $(".admins-list").append(`<li class="ltr"><span class='admin-name'>${admin.name}</span>  <i class="fas fa-times-circle remove-admin-btn ltr"></i>`);
          });
        },
        error: function (error) {
          showAlert('error', error.responseText)
        }
    });


    /*
    $("#add-admin-form").submit(function(e){
    e.preventDefault();
    
    var form = $("#add-admin-form")[0]; // Need to use standard javascript object here
    var formData = new FormData(form);

    // important! - body-parser don't support formData object //
    
    let data ={}
    //convert formData to a object
    for (let [key, value] of formData.entries()) { 
      data[key] = value;
    }
    console.log(data);

    $.ajax({
        url: '/user/admins/add',
        type: 'PUT',
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: 'json',
        success: function(result) {
          console.log(result);
          location.reload();
        }
    });
    return true;

    });
    */
});


$(document).on('click', '.remove-admin-btn', function() {
    let adminElement = $(this).parent();
    let adminName = adminElement.find('.admin-name').text();
    console.log(adminName);

    $.ajax({
        url: '/user/admins/',
        type: 'DELETE',
        data: JSON.stringify({name: adminName}),
        contentType: 'application/json',
        dataType: 'json',
        success: function(result) {
          adminElement.remove();
          showAlert('success', "נמחק בהצלחה!");
        },
        error: function (error) {
          showAlert('error', error.responseText);
        }
    });
    return true;
});