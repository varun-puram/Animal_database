$('.selectallexperiment').click(function() {
    if ($(this).is(':checked')) {
        $('.groupaddinput3').attr('checked', true);
    } else {
        $('.groupaddinput3').attr('checked', false);
    }
});

$('#Update_Yes').click(function(){
    var log= $('#table').bootstrapTable('getSelections');
	var name =log[0].name;
	var jsonattributes = [];
	var newattributes;
	$(".groupaddinput3").each(function(i, elem){
		if($(this).is(":checked")){
			newattributes = $(elem).val();
			jsonattributes.push(newattributes);
		}
	});
	var string = JSON.stringify(jsonattributes);
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
			setTimeout(function() {location.reload()}, 2000);
		},
		error: function(error) {
			console.log(error)
			$.notify("Data not saved", "danger");
		}
	});
});

$(document).ready(function(){
	$.ajax({
		url : '/api/herd/create/',
		type : 'GET',
		dataType : 'json',
		async: false,
		success : function(data) {
			$(data).each(function(i,elem){
				elem.create_date = StringToDate(elem.create_date);
				var value = JSON.parse(elem.string);
				var attributes = "";
				$(value).each(function(i,elem){
					var string = elem.split("-");
					attributes += string[1];
					attributes += ",";
				});
				elem.string = attributes.replace(/,\s*$/, "");

				var AIDs = JSON.parse(elem.AID_string);
				elem.AIDs = AIDs;
				var animalnames = "";
				$(AIDs).each(function(i,elem){
					$.ajax({
						url: '/api/animal/add/'+elem,
						data: $('form').serialize(),
						type: 'GET',
						async: false,
						success : function(response) {
							animalnames += response[0].animalname;
							animalnames += " ,";

						},
						error: function(response){
							console.log(response);
						}
					});
				});
				var animalnameslist = animalnames.replace(/,\s*$/ , "");
				elem.animalname = animalnameslist;
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


$('#Change').click(function() {
    var log = $('#table').bootstrapTable('getSelections');
    if(log == 0){
        alert("Please select an experiment");
    }
    else{
        var ids = log[0].string;
        var units = ids.split(",");
        $(units).each(function(i,elem){
        	document.getElementById(elem).checked=true;
        });
        $("#Update_Parameters").modal("show");
    }
});

$('#Edit').click(function() {
  var log= $('#table').bootstrapTable('getSelections');
  console.log(log);
  $("#name").val(log[0].name);
  $("#ExperimentEditModal").modal("show");
});
$('#Edit_Experiment_Yes').click(function() {
	var name= $('#name').val();
		setTimeout(function() {
		window.location.href = '/experiment/edit?herdname=' +name
	}, 2000);
});

$('#Delete').click(function() {
  var log= $('#table').bootstrapTable('getSelections');
  console.log(log);
  var result = alertbox("Please click 'OK' if you want to delete the following Herd\n'"+log[0].name +"' created on this date '"+ log[0].create_date +"'\nClick 'Cancel' if not");
  if (r = 1){
	  var data = {
		  name : log[0].name,
		  create_date : log[0].create_date
	  }
	  myJSON = JSON.stringify(data)
	$.ajax({
		url: '/api/herd/create/',
		type: 'DELETE',
		data : myJSON,
		dataType: 'json',
		success: function(response) {
			console.log(response);
			$.notify("Data Saved", "info");
			setTimeout(function() {location.reload();}, 2000);
		},
		error: function(response) {
			console.log(response);
			$.notify("Data Not saved", "error");
		}
	});
  }
  else{
	alert("Not deleted");
  }

});

$('#button_Done').click(function() {
  setTimeout(location.reload(), 2000);
});

$('#UploadCSV').click(function() {
  $("#UploadCSVModal").modal("show");
});
$('#Upload_Done').click(function() {
	location.reload();
});


$(function () {
    $("#upload").bind("click", function () {
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
        if (regex.test($("#fileUpload").val().toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                reader.onload = function (e) {
					var data=$.csv.toObjects(e.target.result);
					console.log(data);
					$(data).each(function(i, elem){
							var dataJson = JSON.stringify(elem);
							console.log(dataJson);
							$.ajax({
								url: '/api/animal/add/',
								data: dataJson,
								type: 'post',
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

                    var table = $("<table />");
                    var rows = e.target.result.split("\n");
                    for (var i = 0; i < rows.length; i++) {
                        var row = $("<tr />");
                        var cells = rows[i].split(",");
                        for (var j = 0; j < cells.length; j++) {
                            var cell = $("<td />");
                            cell.html(cells[j]);
                            row.append(cell);
                        }
                        table.append(row);
                    }
                    $("#dvCSV").html('');
                    $("#dvCSV").append(table);
                }
                reader.readAsText($("#fileUpload")[0].files[0]);
            } else {
                alert("This browser does not support HTML5.");
            }
        } else {
            alert("Please upload a valid CSV file.");
        }
    });
});
