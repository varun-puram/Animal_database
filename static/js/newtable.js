$(document).ready(function () {
	$.ajax({
		url : '/api/cow_2014_list/get',
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
    $('#table').bootstrapTable({
		filterControl: true,
		disableUnusedSelectOptions: true,
		singleSelect: true,
        data: data
    });
};

$(function () {
	var $table = $('#table');
	$('#toolbar').find('select').change(function () {
    $table.bootstrapTable('refreshOptions', {
      exportDataType: $(this).val()
    });
  });
});		

