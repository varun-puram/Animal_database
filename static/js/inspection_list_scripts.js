$(document).ready(function(){
	$.ajax({
		url : '/api/inspection/report/',
		type : 'GET',
		dataType : 'json',
		async: false,
		success : function(data) {
			console.log(data);
			$(data).each(function(i,elem){
				elem.date = StringToDate(elem.date);
				elem.total = elem.cow_count+elem.bull_count+elem.calf_count;
			});

			tablecall(data);
		},
		error: function(response){
			console.log(response);
		}
	});
});

$("#refresh_page").click(function(){
   location.reload();
});

var columns = [
  [{
    "field": "state",
    "checkbox" : "true",
    "title": "Date",
    "colspan": 1,
    "rowspan": 2
  },{
    "field": "date",
    "class" : "w200",
    "title": "Date",
    "colspan": 1,
    "rowspan": 2
  }, {
    "title": "Pasture",
    "colspan": 14,
    "rowspan": 1
  }, {
    "field": "comments",
    "title": "Comments",
    "colspan": 1,
    "rowspan": 2
  }, {
    "field": "pasture_major_deficiencies",
    "title": "Major Deficiencies",
    "colspan": 1,
    "rowspan": 2
  }, {
    "field" : "pasture_minor_deficiencies",
    "title": "Minor Deficiencies",
    "colspan": 1,
    "rowspan": 2
  }, {
    "field" : "email_ID",
    "title": "Email",
    "colspan": 1,
    "rowspan": 2
  }, {
    "title": "Building",
    "colspan": 8,
    "rowspan": 1
  }],
  [{
    "field": "pasturenumber",
    "title": "Pasture Number",
    "colspan": 1,
    "rowspan": 1
  }, {
    "field": "sub_pasture",
    "title": "Sub Pasture",
    "colspan": 1,
    "rowspan": 1
  }, {
    "field": "total",
    "title": "Total Animals",
    "colspan": 1,
    "rowspan": 1
  }, {
    "field": "cow_count",
    "title": "Cows",
    "colspan": 1,
    "rowspan": 1
  }, {
    "field": "bull_count",
    "title": "Bulls",
    "colspan": 1,
    "rowspan": 1
  }, {
    "field": "calf_count",
    "title": "Calves",
    "colspan": 1,
    "rowspan": 1
  }, {
    "field": "general_appearance",
    "title": "General Appearance",
    "colspan": 1,
    "rowspan": 1
  }, {
    "field": "live_stock",
    "title": "Live Stock",
    "colspan": 1,
    "rowspan": 1
  }, {
    "field": "animal_condition",
    "title": "Animal Condition",
    "colspan": 1,
    "rowspan": 1
  }, {
    "field": "fencing",
    "title": "Fencing",
    "colspan": 1,
    "rowspan": 1
  }, {
    "field": "access_to_food",
    "title": "Access to Food",
    "colspan": 1,
    "rowspan": 1
  }, {
    "field": "access_to_water",
    "title": "Access to Water",
    "colspan": 1,
    "rowspan": 1
  }, {
    "field": "cleaniness_of_water",
    "title": "Cleanliness of Water",
    "colspan": 1,
    "rowspan": 1
  }, {
    "field": "access_to_shelter",
    "title": "Access to Shelter",
    "colspan": 1,
    "rowspan": 1
  }, {
    "field": "builinding_number",
    "title": "Building Number",
    "colspan": 1,
    "rowspan": 1
  }, {
    "field": "lighting",
    "title": "Lighting",
    "colspan": 1,
    "rowspan": 1
  }, {
    "field": "housekeeping",
    "title": "Housekeeping",
    "colspan": 1,
    "rowspan": 1
  }, {
    "field": "head_catch_condition",
    "title": "Head Catch Condition",
    "colspan": 1,
    "rowspan": 1
  }, {
    "field": "non_slip_surface_evidence",
    "title": "Non Slip Surface Evidence",
    "colspan": 1,
    "rowspan": 1
  }, {
    "field": "Pen_condition",
    "title": "Pen Condition",
    "colspan": 1,
    "rowspan": 1
  }, {
    "field": "container_disposal",
    "title": "Container Disposal",
    "colspan": 1,
    "rowspan": 1
  }, {
    "field": "drug_storage",
    "title": "Drug Storage",
    "colspan": 1,
    "rowspan": 1
  }]
];
function tablecall(data) {
    $('#table').bootstrapTable({
		filterControl: true,
		disableUnusedSelectOptions: true,
		singleSelect: true,
        data: data,
        columns : columns
    });
};

$('#Edit').click(function() {
    var log= $('#table').bootstrapTable('getSelections');
    if (log == 0){
        alert("Please select a row");
    }
    else{
        $("#pasture_number").empty();
        $.ajax({
    		url : '/api/inventory/pasture/',
    		type : 'GET',
    		dataType : 'json',
    		async: false,
    		success : function(data) {
    			console.log(data);
    			$(data).each(function(j,elem){
    				$("<option value='"+elem.pasture_ID+"-"+elem.pasturenumber+"'> "+elem.pasture_ID+" - "+elem.pasturenumber+"</option>").appendTo("#pasture_number");
    			});
    		},
    		error: function(response){
    			console.log(response);
    		}
    	});
	    var string = log[0].pasture_ID +"-"+log[0].pasturenumber
		document.getElementById('pasture_number').value = string;
        $("#sub_pasture").val(log[0].sub_pasture);
        $("#cows").val(log[0].cow_count);
        $("#bulls").val(log[0].bull_count);
        $("#calf").val(log[0].calf_count);
        $("#general_appearance option:selected").text(log[0].general_appearance);
        $("#livestock option:selected").text(log[0].live_stock);
        $("#date").val(StringToDate(log[0].date));
        $("#animal_condition option:selected").text(log[0].animal_condition);
        $("#fencing option:selected").text(log[0].fencing);
        $("#access_to_feed option:selected").text(log[0].access_to_food);
        $("#access_to_water option:selected").text(log[0].access_to_water);
        $("#water_cleanliness option:selected").text(log[0].cleaniness_of_water);
        $("#shed_access option:selected").text(log[0].access_to_shelter);
        $("#comments option:selected").text(log[0].comments);
        $("#general_appearance_building option:selected").text(log[0].general_appearance);
        $("#squeezechute_headcatch option:selected").text(log[0].head_catch_condition);
        $("#electrical_lighting option:selected").text(log[0].lighting);
        $("#housekeeping_cleanliness option:selected").text(log[0].housekeeping);
        $("#headcatch_exit option:selected").text(log[0].non_slip_surface_evidence);
        $("#pen_condition option:selected").text(log[0].Pen_condition);
        $("#sharp_disposal_containers option:selected").text(log[0].container_disposal);
        $("#drug_storage option:selected").text(log[0].drug_storage);
        $("#minor_deficiencies").val(log[0].pasture_minor_deficiencies);
        $("#major_deficiencies").val(log[0].pasture_major_deficiencies);
        $("#building_number").val(log[0].builinding_number);
        $("#date_building").val(StringToDate(log[0].date));
        $("#iacuc2_comments").val(log[0].comments);
        $("#iacuc_major2_deficiencies").val(log[0].pasture_major_deficiencies);
        $("#iacuc_minor2_deficiencies").val(log[0].pasture_minor_deficiencies);
        $("#Inspection_View_Modal").modal("show");
    }
});

$("#Inspection_Submit").click(function(){
    var log= $('#table').bootstrapTable('getSelections');
    var pasture_ID= $('#pasture_number').val();
	var res = pasture_ID.split("-");
	var data = {
		pasture_ID : res[0],
		report_ID : log[0].report_ID,
		cow_count : $("#cows").val(),
		bull_count : $("#bulls").val(),
		calf_count : $("#calf").val(),
		general_appearance : $("#general_appearance option:selected").text(),
		live_stock : $("#livestock option:selected").text(),
		date : $("#date").val(),
		animal_condition : $("#animal_condition option:selected").text(),
		fencing : $("#fencing option:selected").text(),
		access_to_food : $("#access_to_feed option:selected").text(),
		access_to_water : $("#access_to_water option:selected").text(),
		cleaniness_of_water : $("#water_cleanliness option:selected").text(),
		access_to_shelter : $("#shed_access option:selected").text(),
		comments : $("#comments").val(),
		pasture_major_deficiencies : $("#major_deficiencies").val(),
		pasture_minor_deficiencies : $("#minor_deficiencies").val(),
		email_ID : $("#email")[0].textContent,
		sub_pasture : $("#sub_pasture").val(),
		builinding_number : 0,
		lighting : 0,
		housekeeping : 0,
		head_catch_condition : 0,
		non_slip_surface_evidence : 0,
		Pen_condition : 0,
		container_disposal : 0,
		drug_storage : 0
	};
	var myJSON = JSON.stringify(data);
	$.ajax({
		url: '/api/inspection/report/',
		data: myJSON,
		type: 'PATCH',
		dataType: 'json',
		success: function(response) {
			console.log(response);
			$.notify("Data Saved", "info");
		},
		error: function(response) {
			console.log(response);
			$.notify("Data Not saved", "error");
		}
	});
});

$("#Inspection_Submit_Building").click(function(){
    var log= $('#table').bootstrapTable('getSelections');
	var data = {
		pasture_ID : 0,
		report_ID : log[0].report_ID,
		sub_pasture : 0,
		cow_count : 0,
		bull_count : 0,
		calf_count : 0,
		live_stock : 0,
		animal_condition : 0,
		fencing : 0,
		access_to_food : 0,
		access_to_water : 0,
		cleaniness_of_water : 0,
		access_to_shelter : 0,
		comments : $("#iacuc2_comments").val(),
		pasture_major_deficiencies : $("#iacuc_major2_deficiencies").val(),
		pasture_minor_deficiencies : $("#iacuc_minor2_deficiencies").val(),
		email_ID : $("#email")[0].textContent,
		builinding_number : $("#building_number").val(),
		general_appearance : $("#general_appearance_building option:selected").text(),
		lighting : $("#electrical_lighting option:selected").text(),
		date : $("#date_building").val(),
		housekeeping : $("#housekeeping_cleanliness option:selected").text(),
		head_catch_condition : $("#squeezechute_headcatch option:selected").text(),
		non_slip_surface_evidence : $("#headcatch_exit option:selected").text(),
		Pen_condition : $("#pen_condition option:selected").text(),
		container_disposal : $("#sharp_disposal_containers option:selected").text(),
		drug_storage : $("#drug_storage option:selected").text()
	};
	var myJSON = JSON.stringify(data);
	$.ajax({
		url: '/api/inspection/report/',
		data: myJSON,
		type: 'PATCH',
		dataType: 'json',
		success: function(response) {
			console.log(response);
			$.notify("Data Saved", "info");
		},
		error: function(response) {
			console.log(response);
			$.notify("Data Not saved", "error");
		}
	});
});









