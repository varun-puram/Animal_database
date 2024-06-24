
$('#SearchButton').click(function(e) {
	var searchboxvalue = $('#SearchAnimal').val();
	console.log(searchboxvalue);
	$.notify("Search for Animal:"+ searchboxvalue, "info");
	window.location.href = '/animal/update?animalname='+searchboxvalue;
});

$(document).ready(function(){
	$.ajax({
		url : '/api/inventory/pasture/',
		type : 'GET',
		dataType : 'json',
		async: false,
		success : function(data) {
			$(data).each(function(j,elem){
				$("<option value="+elem.pasture_ID+"> "+elem.pasture_ID+" - "+elem.pasturenumber+"</option>").appendTo("#pasturenumber");
			});
		},
		error: function(response){
			console.log(response);
		}
	});
	var animalname = getQueryVariable("animalname");
	$.ajax({
		url: '/api/health/add/'+animalname,
		data: $('form').serialize(),
		type: 'GET',
		success: function(response) {
			var Animal_ID = response[0].Animal_ID;
			$.ajax({
				url: '/api/animal/update/'+Animal_ID,
				data: $('form').serialize(),
				type: 'GET',
				success: function(response) {
					console.log(response);
					$('#Animal_ID').val(response[0].Animal_ID);
					$('#height').val(response[0].height);
					$('#weight').val(response[0].weight);
					$('#eartag').val(response[0].eartag);
					$('#eid').val(response[0].eid);
					$('#sex option:selected').text(response[0].sex);
					$('#pasturenumber').val(response[0].pasture_ID);
					$('#breed').val(response[0].breed);
					$('#sub_pasture').val(response[0].sub_pasture);
					$('#status option:selected').text(response[0].status);
					$('#trial').val(response[0].current_expt_no);
					$('#herd').val(response[0].herd);
					$('#animaltype option:selected').text(response[0].animaltype);
					$('#animalname').val(response[0].animalname);
					$('#animalgroup').val(response[0].animalgroup);
					$('#breeder').val(response[0].breeder);
					$('#currentframescore').val(response[0].currentframescore);
					$('#damframescore').val(response[0].damframescore);
					$('#comments').val(response[0].comments);
					$('#species').val(response[0].species);
					$('#brand').val(response[0].brand);
					$('#brandlocation option:selected').text(response[0].brandlocation);
					$('#tattooleft').val(response[0].tattooleft);
					$('#tattooright').val(response[0].tattooright);
					$('#alternativeid').val(response[0].alternativeid);
					$('#registration').val(response[0].registration);
					$('#color').val(response[0].color);
					$('#dam').val(response[0].dam);
					$('#sire').val(response[0].sire);
					$('#DOB').val(StringToDate(response[0].DOB));
					$('#hornstatus option:selected').text(response[0].hornstatus);
					$('#howacquired option:selected').text(response[0].howacquired);
					$('#dateacquired').val(StringToDate(response[0].dateacquired));
					$('#howdisposed option:selected').text(response[0].howdisposed);
					$('#datedisposed').val(StringToDate(response[0].datedisposed));
					$('#disposalreason').val(response[0].disposalreason);
					$('#springfall option:selected').text(response[0].springfall);
					$('#includeinlookups option:selected').text(response[0].includeinlookups);
					$('#herdnumberlocation').val(response[0].herdnumberlocation);
					$('#herdstatus').val(response[0].herdstatus);
					$('#managementcode').val(response[0].managementcode);
					$('#ownerID').val(response[0].ownerID);
					$('#howconceived').val(response[0].howconceived);
				},
				error: function(error) {
					console.log(error);
					$.notify("Animal Name doesnt exist", "danger");
				}
			});
		},
		error: function(error) {
			console.log(error);
			$.notify("Animal Name doesnt exist", "danger");
		}
	});

	});
	$(function () {
	$('#animal_update').click(function(e) {
		var Animal_ID = $('#Animal_ID').val();
		var basic = {
			Animal_ID : Animal_ID,
			animalname : $('#animalname').val(),
			email_id : $("#email")[0].textContent,
			height: $('#height').val(),
			weight : $('#weight').val(),
			eartag : $('#eartag').val(),
			eid : $('#eid').val(),
			sex : $('#sex option:selected').text(),
			pasture_ID : $('#pasturenumber').val(),
			sub_pasture : $('#sub_pasture').val(),
			breed : $('#breed').val(),
			status : $('#status option:selected').text(),
			gender : $('#gender option:selected').text(),
			current_expt_no : $('#trial').val(),
			Herd : $('#herd').val(),
			breeder : $('#breeder').val(),
			currentframescore : $('#currentframescore').val(),
			damframescore : $('#damframescore').val(),
			comments : $('#comments').val(),
			species : $('#species').val(),
			animaltype : $('#animaltype option:selected').text(),
			brand : $('#brand').val(),
			brandlocation: $('#brandlocation').val(),
			tattooleft : $('#tattooleft').val(),
			tattooright : $('#tattooright').val(),
			alternativeid : $('#alternativeid').val(),
			registration : $('#registration').text(),
			color : $('#color').val(),
			hornstatus : $('#hornstatus').val(),
			dam : $('#dam').text(),
			sire : $('#sire').val(),
			// DOB : $('#DOB').val(),
			howacquired : $('#howacquired').val(),
			// dateacquired : $('#dateacquired').val(),
			howdisposed : $('#howdisposed').val(),
			// datedisposed : $('#datedisposed').val(),
			disposalreason : $('#disposalreason').val(),
			herdnumberlocation : $('#herdnumberlocation').val(),
			herdstatus : $('#herdstatus').text(),
			howconceived : $('#howconceived').val(),
			managementcode : $('#managementcode').val(),
			ownerID: $('#ownerID').val(),
			springfall : $('#springfall').val(),
			includeinlookups : $('#includeinlookups').val()
			}
			$(".date").each(function(i,elem){
				if(elem.value == ""){
					basic[elem.id] = null;
				}
				else{
					basic[elem.id] = elem.value;
				}
			});
			var myJSON = JSON.stringify(basic);
			$.ajax({
				url: '/api/animal/update/'+Animal_ID,
				data: myJSON,
				datatype: 'json',
				type: 'PATCH',
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
			e.preventDefault();
		});
	});
