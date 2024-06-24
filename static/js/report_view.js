$(document).ready(function(){
	$.ajax({
		url : '/api/report/get/',
		type : 'POST',
		dataType : 'json',
		async: false,
		success : function(data) {
			$(data).each(function(i,elem){
				elem.start_date = StringToDate(elem.start_date);
				elem.end_date = StringToDate(elem.end_date);
				var value = JSON.parse(elem.parameters);
				var attributes = "";
				$(value).each(function(i,elem){
					attributes += elem;
					attributes += ", ";
				});
				elem.parameters = attributes.replace(/,\s*$/, "");
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
			disableUnusedSelectOptions: true,
			singleSelect: true,
			data: data
		});
	};
});


$("#ViewReport").click(function(){
    var log= $('#table').bootstrapTable('getSelections');
    console.log(log);
    var result = alertbox("Please click 'OK' if you want to View the Report for the following Herd\n'"+log[0].name +"' \nClick 'Cancel' if not");
    if (result == 1){
        setTimeout(function() {
    		window.location.href = '/report/view?name='+log[0].ID+'&start_date='+log[0].start_date+'&end_date='+log[0].end_date
    	}, 2000);
    }
    else{
        alert("User Denied the request");
    }
});