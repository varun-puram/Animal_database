$(document).ready(function(){
	$.ajax({
		url : '/api/tempsearchpage/get/',
		type : 'GET',
		dataType : 'json',
		async: false,
		success : function(data) {
			console.log(data);
			$(data).each(function(i,elem){
				elem.eventdate = StringToDate(elem.eventdate);
			});
			tablecall(data);
		},
		error: function(response){
			console.log(response);
		}
	});
	function tablecall(data) {
		$('#table').bootstrapTable({
filterControl: true,
			singleSelect: true,
			data: data
		});
	};
});

$('#myForm').on('submit', function(e){
  $('#myModal').modal('show');
  e.preventDefault();
});

$(function () {
	$('#saveevent').click(function(e) {
	    var basic = {
		    event :$('#eventtext').val(),
		    eventdate :$('#Date').val()

	    }
	    var myJSON = JSON.stringify(basic);
	    $.ajax({
							url: '/api/tempsearchpage/get/',
							data: myJSON,
							datatype: 'json',
							type: 'POST',
							success: function(response) {
								console.log(basic);
								console.log(response);
								$.notify("Data Saved", "info");
							},
							error: function(error) {
								console.log(error)
								$.notify("Data not saved", "danger");
							}
						});
	});

});