$(document).ready(function(){
	var columns = [
	  [{
		"field": "state",
		"radio" : "true"
	  },{
		"field": "ID",
		"title": "ID"
	  }, {
		"field": "animalname",
		"title": "Animal Name"
	  }, {
		"field": "breeding",
		"title": "Breeding"
	  }, {
		"field": "pregnancy",
		"title": "Pregnancy"
	  }, {
		"field": "siblingcode",
		"title": "Sibling Code"
		}, {
		"field": "calfatside",
		"title": "Calf at Side"
		}, {
		"field": "totalcalves",
		"title": "Total Calves"
		}, {
		"field": "previouscalf",
		"title": "Previous Calf"
		}, {
		"field": "calfsex",
		"title": "Calf Sex"
		}, {
		"field": "currentcalf",
		"title": "Current Calf"
		}, {
		"field": "calfbirthweight",
		"title": "Calf Birth Weight"
		}, {
		"field": "calfdob",
		"title": "Calf Date of Birth"
		}, {
		"field": "damageatbirth",
		"title": "Dam age at Birth"
		}, {
		"field": "pasturenumber",
		"title": "Pasture Number"
		}, {
		"field": "damcalvingdisposition",
		"title": "Dam Calving Disposition"
		}, {
		"field": "calvingease",
		"title": "Calving Ease"
		}, {
		"field": "udderscore",
		"title": "Udder Score"
		}, {
		"field": "conditionscorecalving",
		"title": "Condition Score Calving"
		}, {
		"field": "hiphtweaning",
		"title": "Hip Height Weaning"
		}, {
		"field": "hiphtbreeding",
		"title": "Hip Height Breeding"
		}, {
		"field": "damdisposition",
		"title": "Dam Disposition"
		}, {
		"field": "cowframescore",
		"title": "Cow Frame Score"
		}, {
		"field": "cowwtbreeding",
		"title": "Cow Weight Breeding"
		}, {
		"field": "cowhtbreeding",
		"title": "Cow Height Breeding"
		}, {
		"field": "cowwtweaning",
		"title": "Cow Weight Weaning"
		}, {
		"field": "cowhtweaning",
		"title": "Cow Height Weaning"
		}, {
		"field": "cowwtcalving",
		"title": "Cow Weight Calving"
		}, {
		"field": "cowhtcalving",
		"title": "Cow Height calving"
		}, {
		"field": "bcsweaning",
		"title": "BCS Weaning"
		}, {
		"field": "bcscalving",
		"title": "BCS Calving"
		}, {
		"field": "bcsbreeding",
		"title": "BCS Breeding"
		}, {
		"field": "customcowwt",
		"title": "Custom Cow Weight"
		}, {
		"field": "customcowht",
		"title": "Custom Cow Height"
		}, {
		"field": "bulldisposition",
		"title": "Bull Disposition"
		}, {
		"field": "bullframescore",
		"title": "Bull Frame Score"
		}, {
		"field": "bullwtprebreeding",
		"title": "Bull Weight Pre-breeding"
		}, {
		"field": "bullhtprebreeding",
		"title": "Bull Height Pre-breeding"
		}, {
		"field": "fertility",
		"title": "Fertility"
		}, {
		"field": "mobility",
		"title": "Mobility"
		}, {
		"field": "conc",
		"title": "Conc"
		}, {
		"field": "deadabnormal",
		"title": "Dead Abnormal"
		}, {
		"field": "date",
		"title": "Date (Data Recorded)"
		}, {
		"field": "email_id",
		"title": "Email ID"
		}]
	];
	$.ajax({
		url : '/api/reproduction/record/',
		type : 'GET',
		dataType : 'json',
		async: false,
		success : function(data) {
		    $(data).each(function(i,elem){
				elem.date = StringToDate(elem.date);
				elem.calfdob = StringToDate(elem.calfdob);
			});
			console.log(data);
			tablecall(data, columns);
		},
		error: function(response){
			console.log(response);
		}
	});
});


function tablecall(data, columns) {
  $('#table').bootstrapTable({
    data: data,
    columns: columns,
    clickToSelect: "true"
  });
};


$('#Edit').click(function() {

  var log= $('#table').bootstrapTable('getSelections');
  console.log(log);
  var result = alertbox("Please click 'OK' if you want to EDIT the following animal\n'"+ log[0].animalname +"'\nClick 'Cancel' if not");
  if (r = 1){
	setTimeout(function() {
		window.location.href = '/reproduction/calfview?animalname='+ log[0].animalname;
	}, 2000);
  }
  else{
	alert("Not Edited");
  }
});

$('#Delete').click(function() {
  var log= $('#table').bootstrapTable('getSelections');
  console.log(log);
  var result = alertbox("Please click 'OK' if you want to Delete the following animal\n'"+ log[0].animalname +"'\nClick 'Cancel' if not");
  if (r = 1){
	$.ajax({
		url: '/api/reproduction/record/'+log[0].ID,
		type : 'DELETE',
		async: false,
		success : function(data) {
			location.reload();
			$.notify("Animal Data Deleted.")
		},
		error: function(response){
			$.notify("Not Deleted. Please contact IT")
		}
	});
	setTimeout(function() {
		location.reload();
	}, 2000);
  }
  else{
	alert("Not Deleted");
  }
});