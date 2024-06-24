$('#SearchButton').click(function() {
	var searchboxvalue = $('#SearchAnimal').val();
	console.log(searchboxvalue);
	$.notify("Search for Animal:"+ searchboxvalue, "info");
	window.location.href = '/animal/update?animalname='+searchboxvalue;
});

$(document).ready(function(){
	var animalname = getQueryVariable("animalname");
	$.ajax({
		url: '/api/health/add/'+animalname,
		data: $('form').serialize(),
		type: 'GET',
		success: function(response) {
			var Animal_ID = response[0].Animal_ID;
			$.ajax({
			url: '/api/animal/add/'+Animal_ID,
			data: $('form').serialize(),
			type: 'PATCH',
			success: function(response) {
				console.log(response);
				$('#animalname').val(response[0].animalname);
				$('#Animal_ID').val(response[0].Animal_ID);
				$('#ID').val(response[0].ID);
				$('#bcsbreeding').val(response[0].bcsbreeding);
				$('#bcscalving').val(response[0].bcscalving);
				$('#bcsweaning').val(response[0].bcsweaning);
				$('#breeding option:selected').val(response[0].breeding);
				$('#bulldisposition option:selected').val(response[0].bulldisposition);
				$('#bullframescore').val(response[0].bullframescore);
				$('#bullhtprebreeding').val(response[0].bullhtprebreeding);
				$('#bullwtprebreeding').val(response[0].bullwtprebreeding);
				$('#calfatside').val(response[0].calfatside);
				$('#calfbirthweight').val(response[0].calfbirthweight);
				$('#calfdob').val(StringToDate(response[0].calfdob));
				$('#calfsex option:selected').val(response[0].calfsex);
				$('#calvingease option:selected').val(response[0].calvingease);
				$('#conc').val(response[0].conc);
				$('#conditionscorecalving').val(response[0].conditionscorecalving);
				$('#cowframescore').val(response[0].cowframescore);
				$('#cowhtbreeding').val(response[0].cowhtbreeding);
				$('#cowhtcalving').val(response[0].cowhtcalving);
				$('#cowhtweaning').val(response[0].cowhtweaning);
				$('#cowwtbreeding').val(response[0].cowwtbreeding);
				$('#cowwtcalving').val(response[0].cowwtcalving);
				$('#cowwtweaning').val(response[0].cowwtweaning);
				$('#currentcalf').val(response[0].currentcalf);
				$('#customcowht').val(response[0].customcowht);
				$('#customcowwt').val(response[0].customcowwt);
				$('#damageatbirth').val(response[0].damageatbirth);
				$('#damcalvingdisposition option:selected').val(response[0].damcalvingdisposition);
				$('#damdisposition option:selected').val(response[0].damdisposition);
				$('#date').val(StringToDate(response[0].date));
				$('#deadabnormal').val(response[0].deadabnormal);
				$('#fertility').val(response[0].fertility);
				$('#hiphtbreeding').val(response[0].hiphtbreeding);
				$('#hiphtweaning').val(response[0].hiphtweaning);
				$('#mobility').val(response[0].mobility);
				$("#pasturenumberreproduction").val(response[0].pasturenumber)
				$('#pregnancy option:selected').val(response[0].pregnancy);
				$('#previouscalf').val(response[0].previouscalf);
				$('#siblingcode option:selected').val(response[0].siblingcode);
				$('#totalcalves').val(response[0].totalcalves);
				$('#udderscore').val(response[0].udderscore);
			},
			error: function(error) {
				console.log(error);
				$.notify("Animal ID doesnt exist", "danger");
			}
		});
	},
		error: function(error) {
			console.log(error);
			$.notify("Animal Name doesnt exist", "danger");
		}
	});
});

$("#update_calf").click(function(){
	var data = {
			ID : $('#ID').val(),
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
	}
	var myJSON = JSON.stringify(data)
	$.ajax({
		url: '/api/reproduction/record/',
		type : 'PATCH',
		data : myJSON,
		async: false,
		success : function(data) {
			location.reload();
			$.notify("Animal Updated.","info")
		},
		error: function(response){
			$.notify("Not Updated. Please contact IT", "danger")
		}
	});
	setTimeout(function() {
		location.reload();
	}, 2000);
});