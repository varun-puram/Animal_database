$(document).ready(function () {
	$.ajax({
		url : '/api/test/',
		type : 'PATCH',
		dataType : 'json',
		async: false,
		success : function(data) {
			console.log(data);
			$(data).each(function(i,elem){
			    elem.registered_at = StringToDate(elem.registered_at);
			})
			tablecall(data);
		},
		error: function(response){
			console.log(response);
		}
	});
});

function tablecall(data) {
    $('#table').bootstrapTable({
		filterControl: true,
		disableUnusedSelectOptions: true,
		singleSelect: true,
        data: data
    });
};

$('#Add').click(function() {
    $("#UserAddModal").modal("show");
});

$('#Edit').click(function() {
  var log= $('#table').bootstrapTable('getSelections');
  if (log == 0){
      alert("Please select an User first");
  }
  else{
    $("#UserEditModal").modal("show");
    document.getElementById('Role_Edit').value =log[0].roles;
    $("#user_email").val(log[0].email_id);
  }
});

$("#User_Edit_Modal_Yes").click(function(){
    var log= $('#table').bootstrapTable('getSelections');
    var data = {
        email_id : log[0].email_id,
        roles : $("#Role_Edit").val()
    }
    var dataJson = JSON.stringify(data);
	console.log(dataJson);
	$.ajax({
		url: '/api/test/',
		data: dataJson,
		type: 'POST',
		dataType: 'json',
		success: function(response) {
			console.log(response);
			alert("User Role changed");
			location.reload();
		},
		error: function(response) {
			console.log(response);
			alert("Role Not saved");
		}
	});

});

$('#Delete').click(function() {
  var log= $('#table').bootstrapTable('getSelections');
  if (log == 0){
      alert("Please select an User first");
  }
  else{
    var data = {
        email_id : log[0].email_id
    }
    r = alertbox("Are you sure you want to delete the user\t "+log[0].email_id+"?");
    if (r == 1){
        var dataJson = JSON.stringify(data);
    	console.log(dataJson);
    	$.ajax({
    		url: '/api/test/',
    		data: dataJson,
    		type: 'DELETE',
    		dataType: 'json',
    		success: function(response) {
    			console.log(response);
    			alert("Deleted");
    			location.reload();
    		},
    		error: function(response) {
    			console.log(response);
    			$.notify("Data Not saved", "error");
    		}
    	});
    }
    else{
        alert("You selected CANCEL");
    }
  }
});