$(document).ready(function () {
	$.ajax({
		url : '/api/DemoDataInBetweenDates/get/',
		type : 'GET',
		dataType : 'json',
		async: false,
		success : function(data) {
			console.log(data);
			$(data).each(function(i,elem){
				elem.Date(Registered) = StringToDate(elem.Date(Registered));
				
				
			});
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

$(function () {
	var $table = $('#table');
	$('#toolbar').find('select').change(function () {
    $table.bootstrapTable('refreshOptions', {
      exportDataType: $(this).val()
    });
  });
});


$(function() {
  $('#search').click(function() {
    var start_date = $("#start_date").val();
    console.log(start_date)
    var end_date = $("#end_date").val();
    console.log(end_date)
$.ajax({
  url : '/api/DemoDataInBetweenDates/'+'/'+start_date+'/'+end_date,
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
      
  });
});