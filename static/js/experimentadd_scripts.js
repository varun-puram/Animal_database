$('.selectallexperiment').click(function() {
    if ($(this).is(':checked')) {
        $('.groupaddinput3').attr('checked', true);
    } else {
        $('.groupaddinput3').attr('checked', false);
    }
});

$(document).ready(function(){
	$.ajax({
		url: '/api/herd/name',
		data: $('form').serialize(),
		type: 'GET',
		async : false,
		success: function(data) {
			console.log(data);
			$(data).each(function(j,elem){
				$("<option value='"+elem.name+"'> "+elem.name+"</option>").appendTo("#name");
			});
		},
		error: function(error) {
			console.log(error);
			$.notify("Group number doesnt exist", "danger");
		}
	});
});

$('#create_experiment').click(function(){
	var name = $('#name').val();
	var jsonattributes = [];
	var newattributes;
	$(".groupaddinput3").each(function(i, elem){
		if($(this).is(":checked")){
			newattributes = $(elem).val();
			jsonattributes.push(newattributes);
		}

	});
	var string = JSON.stringify(jsonattributes);
	if (string == "[]"){
	    alert("Please select some attributes");
	}
	else{
	    var json = {
    		name : name,
    		string : string
    	}
    	var myJSON = JSON.stringify(json);
    	$.ajax({
    		url: '/api/herd/name/',
    		data: myJSON,
    		datatype: 'json',
    		type: 'PATCH',
    		success: function(response) {
    			console.log(response);
    			alert("Data Saved", "info");
    			setTimeout(function() {
    				window.location.href = '/experiment/edit?herdname='+name
    			}, 2000);
    		},
    		error: function(error) {
    			console.log(error)
    			$.notify("Data not saved", "danger");
    		}
    	});
	}

});

