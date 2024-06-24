$(function () {
	$('#basic_update').click(function(e) {
		var animalname = $('#animalname').val();
	    if(animalname == null || animalname == 0){
	        alert("Please Enter Animal Name");
	    }
	    else{
	      var basic = {
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
			DOB : $('#DOB').val(),
			howacquired : $('#howacquired').val(),
			dateacquired : $('#dateacquired').val(),
			howdisposed : $('#howdisposed').val(),
			datedisposed : $('#datedisposed').val(),
			disposalreason : $('#disposalreason').val(),
			herdnumberlocation : $('#herdnumberlocation').val(),
			herdstatus : $('#herdstatus').text(),
			howconceived : $('#howconceived').val(),
			managementcode : $('#managementcode').val(),
			ownerID: $('#ownerID').val(),
			springfall : $('#springfall').val(),
			includeinlookups : $('#includeinlookups').val(),
			entry_date : StringToDateTimeZone(new Date())
			}
			var myJSON = JSON.stringify(basic);
			$.ajax({
				url: '/api/animal/update/'+animalname,
				data: $('form').serialize(),
				type: 'GET',
				success: function(response) {
					if (response!=0){
						alert("Animal Name already Exists");
					}
					else{
						$.ajax({
							url: '/api/animal/add/',
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
					}
				},
				error: function(error) {
					console.log(error)
					$.notify("Data not saved", "danger");
				}
			});
	    }
		e.preventDefault();
		});
	});

$(document).ready(function(){
	$('input').each( function(i,elem) {

		if(elem.placeholder=="YYYY-MM-DD")
			elem.value = '1990-01-30';
		else{
			if (elem.id == "animalname" || elem.id == "pasturenumber"){}
			else if(elem.id == "animalnumber"){
				elem.value = 'test';
			}
			else{
				console.log(elem);
				elem.value = 0;
			}
		}
	});
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

});