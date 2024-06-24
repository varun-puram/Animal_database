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

$('#create_report').click(function(){
	var name = $('#name').val();
	var jsonattributes = [];
	var newattributes;
	var start_date = $("#start_date").val();
	var end_date = $("#end_date").val();
	$(".groupaddinput1").each(function(i, elem){
		if($(this).is(":checked")){
			newattributes = $(elem).val();
			jsonattributes.push(newattributes);
		}

	});
	$(".groupaddinput2").each(function(i, elem){
		if($(this).is(":checked")){
			newattributes = $(elem).val();
			jsonattributes.push(newattributes);
		}

	});
	$(".groupaddinput3").each(function(i, elem){
		if($(this).is(":checked")){
			newattributes = $(elem).val();
			jsonattributes.push(newattributes);
		}

	});
	$(".groupaddinput4").each(function(i, elem){
		if($(this).is(":checked")){
			newattributes = $(elem).val();
			jsonattributes.push(newattributes);
		}

	});
	$(".groupaddinput5").each(function(i, elem){
		if($(this).is(":checked")){
			newattributes = $(elem).val();
			jsonattributes.push(newattributes);
		}

	});
	$(".groupaddinput6").each(function(i, elem){
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
    		parameters : string,
    		start_date : start_date,
    		end_date : end_date
    	}
    	var myJSON = JSON.stringify(json);
        alert(myJSON);
        $.ajax({
    		url: '/api/report/create/',
    		data: myJSON,
    		datatype: 'json',
    		type: 'POST',
    		success: function(response) {
    			console.log(response);
    			alert("Data Saved", "info");
    			setTimeout(function() {
    				window.location.href = '/report/view?name='+response+'&start_date='+start_date+'&end_date='+end_date
    			}, 2000);
    		},
    		error: function(error) {
    			console.log(error)
    			$.notify("Data not saved", "danger");
    		}
    	});
	}

});


$('.advanced').click(function() {
    if ($('.advanced').is(':checked')) {
        $('.groupaddinput2').attr('checked', true);
    } else {
        $('.groupaddinput2').attr('checked', false);
    }
});

$('.basics').click(function() {
    if ($(this).is(':checked')) {
        $('.groupaddinput1').attr('checked', true);
    } else {
        $('.groupaddinput1').attr('checked', false);
    }
});

$('.experiment').click(function() {
    if ($(this).is(':checked')) {
        $('.groupaddinput3').attr('checked', true);
    } else {
        $('.groupaddinput3').attr('checked', false);
    }
});
$('.reproduction').click(function() {
    if ($(this).is(':checked')) {
        $('.groupaddinput4').attr('checked', true);
    } else {
        $('.groupaddinput4').attr('checked', false);
    }
});
$('.medical').click(function() {
    if ($(this).is(':checked')) {
        $('.groupaddinput5').attr('checked', true);
    } else {
        $('.groupaddinput5').attr('checked', false);
    }
});
$('.grazing').click(function() {
    if ($(this).is(':checked')) {
        $('.groupaddinput6').attr('checked', true);
    } else {
        $('.groupaddinput6').attr('checked', false);
    }
});
