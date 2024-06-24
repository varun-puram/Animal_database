$(document).ready(function () {
	$.ajax({
		url : '/api/test/',
		type : 'GET',
		dataType : 'json',
		async: false,
		success : function(data) {
			console.log(data);
			$(data).each(function(i,elem){
				elem.DOB = StringToDate(elem.DOB);
				elem.dateacquired = StringToDate(elem.dateacquired);
				elem.datedisposed = StringToDate(elem.datedisposed);
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

$(function () {
	var $table = $('#table');
	$('#toolbar').find('select').change(function () {
    $table.bootstrapTable('refreshOptions', {
      exportDataType: $(this).val()
    });
  });
});


$('#Edit').click(function() {
  var log= $('#table').bootstrapTable('getSelections');
  console.log(log);
  var result = alertbox("Please click 'OK' if you want to EDIT the following animal\n'"+log[0].Animal_ID +"' named as '"+ log[0].animalname +"'\nClick 'Cancel' if not");
  if (result == 1){
	setTimeout(function() {
		window.location.href = '/animal/update?animalname=' + log[0].animalname
	}, 2000);
  }
  else{
	alert("Not Edited");
  }
});

$('#Delete').click(function() {
  var log= $('#table').bootstrapTable('getSelections');
  console.log(log);
  var result = alertbox("Please click 'OK' if you want to Delete the following animal\n'"+log[0].Animal_ID +"' named as '"+ log[0].animalname +"'\nClick 'Cancel' if not");
  if (result == 1){
	$.ajax({
		url: '/api/animal/update/'+log[0].Animal_ID,
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
	$.notify("Not Deleted");
  }
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
                var update;
                reader.onload = function (e) {
					var UploadedFile=$.csv.toObjects(e.target.result);
					console.log(UploadedFile);
					$.ajax({
            		url : '/api/test/',
            		type : 'GET',
            		dataType : 'json',
            		async: false,
            		success : function(data) {
            			console.log(data);
            			$(UploadedFile).each(function(i, elem){
            			    $(data).each(function(j,element){
            			        if(element.animalname == elem.animalname){
                                    $.each(elem, function(k, v) {
                                        element[k] = elem[k];
                                        console.log(element[k]);
                                        console.log(elem[k]);
                                    });
                                    element["email_id"]= $("#email")[0].textContent;
                                    element["pasture_ID"] = null;
                                    var dataJson = JSON.stringify(element);
        							console.log(element);
        							$.ajax({
                        				url: '/api/animal/update/'+element.Animal_ID,
                        				data: dataJson,
                        				datatype: 'json',
                        				type: 'PATCH',
                        				success: function(response) {
                        					console.log(response);
                        					$.notify("Data Saved", "info");
                        				},
                        				error: function(error) {
                        					console.log(error)
                        					$.notify("Data not saved", "danger");
                        				}
                        			});
                        		update=true;
                        		return true;

            			        }
    					    });
    					    if(update == 1){
    					        update = false;
    					        return true;
    					    }
    					    else{
    					        var element = data[0];
        					    $.each(element, function(k, v) {
                                    if(elem[k]){
                                        element[k] = elem[k];
                                    }
                                    else{
                                        element[k] = null;
                                    }
                                    console.log(element[k]);
                                });
                                element["pasture_ID"]= null;
    							var dataJson = JSON.stringify(element);
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
    					    }
            			});
            		},
            		error: function(response){
            			console.log(response);
            		}
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