$(document).ready(function () {
	$.ajax({
		url : '/api/inventory/pasturehistory/',
		type : 'GET',
		dataType : 'json',
		async: false,
		success : function(data) {
			console.log(data);
			$(data).each(function(i,elem){
				elem.event_date = StringToDate(elem.event_date);
			});
			tablecall(data);
		},
		error: function(response){
			console.log(response);
		}
	});
})

function tablecall(data) {
    $('#table').bootstrapTable({
		filterControl: true,
		disableUnusedSelectOptions: true,
		singleSelect: true,
        data: data
    });
};


$('#Edit').click(function() {
  var log= $('#table').bootstrapTable('getSelections');
  console.log(log);
  $("#pasture_ID").val(log[0].pasture_ID);
  $("#pasturenumber").val(log[0].pasturenumber);
  $("#sub_pasture").val(log[0].sub_pasture);
  $("#date").val(StringToDate(log[0].event_date));
  $("#comments").val(log[0].comments);
  $("#herbicidename").val(log[0].chemicalname);
  $("#herbicidemethod").val(log[0].pesticide_method);
  $("#qualityofburn").val(log[0].qualityofburn);
  $("#chemicalname").val(log[0].chemicalname);
  $("#applicationrate").val(log[0].applicationrate);
  $("#fertilizer_name").val(log[0].fertilizer_name);
  $("#fertilizer_method").val(log[0].fertilizer_method);
  $("#fertilizer_applicationrate").val(log[0].fertilizer_applicationrate);
  $("#PastureEditModal").modal("show");
  console.log(log);
  console.log(log);
});
$('#Edit_Pasture_Modal_Yes').click(function() {
	var pasture_ID= $('#pasture_ID').val();
	var json = {
		pasturenumber : $("#pasturenumber").val(),
		pasture_ID : $("#pasture_ID").val(),
		sub_pasture:$("#sub_pasture").val(),
		email_ID : $("#email")[0].textContent,
		comments : $("#comments").val(),
		qualityofburn : $("#qualityofburn").val(),
		chemicalname : $("#herbicidename").val(),
		applicationrate : $("#applicationrate").val(),
		event_date : $("#date").val(),
		pesticide_method : $("#herbicidemethod").val(),
		fertilizer_name : $("#fertilizer_name").val(),
		fertilizer_method : $("#fertilizer_method").val(),
		fertilizer_applicationrate : $("#fertilizer_applicationrate").val()
	}
	var myJSON = JSON.stringify(json);
	$.ajax({
		url: '/api/inventory/pasturehistory/',
		data: myJSON,
		datatype: 'json',
		type: 'PATCH',
		success: function(response) {
			console.log(response);
			alert("Data Saved");
			$.notify("Data Saved", "info");
		},
		error: function(error) {
			console.log(error)
			$.notify("Data not saved", "danger");
		}
	});
	setTimeout(location.reload(), 2000);
});
$('#Add_New').click(function() {
	$("#AddNewModal").modal("show");
	$.ajax({
		url : '/api/inventory/pasture/',
		type : 'GET',
		dataType : 'json',
		async: false,
		success : function(data) {
			console.log(data);
			$(data).each(function(j,elem){
				$("<option value='"+elem.pasture_ID+"-"+elem.pasturenumber+"'> "+elem.pasture_ID+" - "+elem.pasturenumber+"</option>").appendTo("#pasturenumberadd");
			});
		},
		error: function(response){
			console.log(response);
		}
	});
});

$('#Add_Pasture_Confirm').click(function() {
	var pasture_ID= $('#pasturenumberadd').val();
	var res = pasture_ID.split("-");
	var json = {
		pasture_ID : res[0],
		pasturenumber : res[1],
		sub_pasture: $("#add_sub_pasture").val(),
		event_date : $('#adddate').val(),
		email_id : $("#email")[0].textContent ,
		comments : $('#addcomments').val(),
		qualityofburn : $('#addqualityofburn').val(),
		chemicalname : $('#addchemicalname').val(),
		applicationrate : $('#addapplicationrate').val(),
		fertilizer_name : $('#addfertilizer_name').val(),
		fertilizer_method : $('#addfertilizer_method').val(),
		fertilizer_applicationrate : $('#addfertilizer_applicationrate').val(),
		pesticide_method : $('#addherbicidemethod').val()
	}
	var myJSON = JSON.stringify(json);
	$.ajax({
		url: '/api/inventory/pasturehistory/',
		data: myJSON,
		datatype: 'json',
		type: 'POST',
		success: function(response) {
			console.log(response);
			$.notify("Data Saved", "info");
		},
		error: function(error) {
			console.log(error)
			$.notify("Data not saved", "danger");
		}
	});

	// setTimeout(location.reload(), 2000);
});

$('#Delete').click(function() {
  var log= $('#table').bootstrapTable('getSelections');
  $('#pasturenumberDelete').val(log[0].pasturenumber);
  $('#DateDelete').val(StringToDate(log[0].event_date));
  $("#PastureDeleteModal").modal("show");
});
$('#Delete_Yes').click(function() {
	var pasturenumber= $('#pasturenumberDelete').val();
	var date = $('#DateDelete').val();
	$('#Delete_Pasture').empty();
	$.ajax({
		url: '/api/inventory/pasturehistory/'+pasturenumber+'/'+date,
		type : 'DELETE',
		async: false,
		success : function(data) {
			alert("Event data Deleted");
			setTimeout(location.reload(), 2000);
			$.notify("Event Data Deleted.");
		},
		error: function(response){
			$.notify("Not Deleted. Please contact IT");
		}
	});
});

$('#Delete_No').click(function() {
	$('#Delete_Pasture').empty();
});

$('#UploadCSV').click(function() {
  $("#UploadCSVModal").modal("show");
});

$('#button_Done').click(function() {
  setTimeout(location.reload(), 2000);
});


// Function to Upload CSV into the table
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
								url: '/api/inventory/pasturehistory/',
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