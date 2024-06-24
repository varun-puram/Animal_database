$(document).ready(function () {
	$.ajax({
		url : '/api/tables/',
		type : 'GET',
		dataType : 'json',
		async: false,
		success : function(data) {
			console.log(data);
			tablecall(data);
		},
		error: function(response){
			console.log(response);
		}
	});
})

function tablecall(data) {
    $('#tablesTable').bootstrapTable({
		filterControl: true,
		disableUnusedSelectOptions: true,
		singleSelect: true,
        data: data
    });
};

$(function () {
	var $table = $('#tablesTable');
	$('#toolbar').find('select').change(function () {
    $table.bootstrapTable('refreshOptions', {
      exportDataType: $(this).val()
    });
  });
});

$('#tablesDelete').click(function() {
	
	console.log("clicked on delete");
	var log= $('#tablesTable').bootstrapTable('getSelections');
	var tbName = log[0].TABLE_NAME;
	console.log(log[0].TABLE_NAME)
	var result = alertbox("Please click 'OK' if you want to delete the table '"+log[0].TABLE_NAME+"'\nClick 'Cancel' if not");
	if (result == 1){
	$.ajax({
		url : '/api/tables/deleteTable/'+log[0].TABLE_NAME+'/',
		type : 'DELETE',
		dataType : 'json',
		async: false,
		success : function(data) {
			console.log(data);
			location.reload();
					
		},
		error: function(response){
			console.log(response);
		}
	});	
}
else{
	$.notify("unable to delete table "+ tbName);
  }
  });

 