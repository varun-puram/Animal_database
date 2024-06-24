$(document).ready(function(){
	$('input').each( function(i,elem) {
		if(elem.placeholder=="YYYY-MM-DD"){elem.value = '1990-01-30';}
		else{
			if(elem.id == "animalname" || elem.id == "pasturenumberreproduction"){}
			else if(elem.id == "udderscore"){elem.value = 0.00;}
			else{elem.value = 0;}
		}
	});
});
$("#add_calf").click(function(){
	var data = {
			animalname : $('#animalname').val(),
			bcsbreeding : $('#bcsbreeding').val(),
			bcscalving : $('#bcscalving').val(),
			bcsweaning : $('#bcsweaning').val(),
			email_id : $("#email")[0].textContent,
			breeding : $('#breeding option:selected').text(),
			bulldisposition : $('#bulldisposition option:selected').text(),
			bullframescore : $('#bullframescore').val(),
			bullhtprebreeding : $('#bullhtprebreeding').val(),
			bullwtprebreeding : $('#bullwtprebreeding').val(),
			calfatside : $('#calfatside').val(),
			calfbirthweight : $('#calfbirthweight').val(),
			calfdob : $('#calfdob').val(),
			calfsex : $('#calfsex option:selected').text(),
			calvingease : $('#calvingease option:selected').text(),
			conc : $('#conc').val(),
			conditionscorecalving : $('#conditionscorecalving').val(),
			cowframescore : $('#cowframescore').val(),
			cowhtbreeding : $('#cowhtbreeding').val(),
			cowhtcalving : $('#cowhtcalving').val(),
			cowhtweaning : $('#cowhtweaning').val(),
			cowwtbreeding : $('#cowwtbreeding').val(),
			cowwtcalving : $('#cowwtcalving').val(),
			cowwtweaning : $('#cowwtweaning').val(),
			currentcalf : $('#currentcalf').val(),
			customcowht : $('#customcowht').val(),
			customcowwt : $('#customcowwt').val(),
			damageatbirth : $('#damageatbirth').val(),
			damcalvingdisposition : $('#damcalvingdisposition option:selected').text(),
			damdisposition : $('#damdisposition option:selected').text(),
			date : $('#date').val(),
			deadabnormal : $('#deadabnormal').val(),
			fertility : $('#fertility').val(),
			hiphtbreeding : $('#hiphtbreeding').val(),
			hiphtweaning : $('#hiphtweaning').val(),
			mobility : $('#mobility').val(),
			pasturenumber : $("#pasturenumberreproduction").val(),
			pregnancy : $('#pregnancy option:selected').text(),
			previouscalf : $('#previouscalf').val(),
			siblingcode : $('#siblingcode option:selected').text(),
			totalcalves : $('#totalcalves').val(),
			udderscore : $('#udderscore').val(),
			entry_date : StringToDateTimeZone(new Date())
	}
	var myJSON = JSON.stringify(data)
	$.ajax({
		url: '/api/reproduction/record/',
		type : 'POST',
		data : myJSON,
		async: false,
		success : function(data) {
			location.reload();
			$.notify("Animal Data Added.")
		},
		error: function(response){
			$.notify("Not Added. Please contact IT")
		}
	});
	setTimeout(function() {
		location.reload();
	}, 2000);
});