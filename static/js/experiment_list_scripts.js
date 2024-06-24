$(document).ready(function(){
	$.ajax({
		url : '/api/experiment/list/',
		type : 'GET',
		dataType : 'json',
		async: false,
		success : function(data) {
			$(data).each(function(i,elem){
				elem.customheightdate = StringToDate(elem.customheightdate);
				elem.customweightdate = StringToDate(elem.customweightdate);
				elem.expt_date = StringToDate(elem.expt_date);
				elem.weanweightdate = StringToDate(elem.weanweightdate);
				elem.yearlingdate = StringToDate(elem.yearlingdate);
				elem.weandate = StringToDate(elem.weandate);
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

$('#Edit').click(function() {
  var log= $('#table').bootstrapTable('getSelections');
  console.log(log);
  var r = alertbox("Please click 'OK' if you want to Edit the following Animal\n'"+log[0].animalname +"'\nClick 'Cancel' if not");
  if (r == 1){
	  setTimeout(function() {
    		window.location.href = '/experiment/animal/update?Animal_ID='+log[0].Animal_ID+'&date='+log[0].expt_date+'&animalname='+log[0].animalname
    	}, 2000);
	  }
	 else{
	     alert("Selected 'Cancel'");
	 }

});

$('#Delete').click(function() {
    var log= $('#table').bootstrapTable('getSelections');
    console.log(log);
    var result = alertbox("Please click 'OK' if you want to delete the following Animal Record for \nAnimal\n'"+log[0].animalname +"' created on this date '"+ log[0].expt_date +"'\nClick 'Cancel' if not");
    var Animal_ID = log[0].Animal_ID;
    var expt_date = log[0].expt_date;
    var data={
        Animal_ID : Animal_ID,
        expt_date : expt_date,
        expt_ID : log[0].expt_ID
    }
    var myJSON = JSON.stringify(data);
	$.ajax({
		url: '/api/experiment/herd/',
		type: 'DELETE',
		data : myJSON,
		dataType: 'json',
		success: function() {
			$.notify("Data deleted", "info");
			setTimeout(function() {location.reload();}, 2000);
		},
		error: function(response) {
			console.log(response);
			$.notify("Data Not Deleted", "error");
		}
	});

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
					var keys;
					var submit = false;
					$(data).each(function(i, elem){
				 		var dataJson = JSON.stringify(elem);
						$.ajax({
                    		url : '/api/experiment/list/',
                    		type : 'GET',
                    		dataType : 'json',
                    		async: false,
                    		success : function(data) {
                    		    $(data).each(function(i,elem1){
                    		        keys= Object.keys(elem1);
                    		        if(elem1.animalname == elem.animalname){
                    		            var pasture_ID = false;
                    		            $(keys).each(function(i,pageelement){
                    		                if(elem[pageelement] === undefined){
                    		                    elem1[pageelement] = 0;
                    		                }
                    		                else if(pageelement == "pasture_ID"){
                    		                    pasture_ID = true;
                    		                    elem1["pasture_ID"] = 0;
                    		                }
                    		                else{
                    		                    elem1[pageelement] = elem[pageelement];
                    		                }

                                        });
                                        if(pasture_ID == false){
                                            elem1["pasture_ID"]= 0;
                                            pasture_ID = false;
                                        }
                                        elem1["email_id"]= $("#email")[0].textContent;

                                        console.log(elem1);
                                        dataJson = JSON.stringify(elem1);
                    		        }
                    		        $.ajax({
            							url: '/api/experiment/herd/',
            							data: dataJson,
            							type: 'post',
            							dataType: 'json',
            							success: function(response) {
            								console.log(response);
            								submit = true;
            								$.notify("Data Saved", "info");
            							},
            							error: function(response) {
            								console.log(response);
            								$.notify("Data Not saved", "error");
            							}
            						});
                    		    })

                    		},
                    		error: function(response){
                    			console.log(response);
                    		}
						});
        				if(submit == false){
        				    var pasture_ID = false;
        		            $(keys).each(function(i,pageelement){
        		                if(elem[pageelement] === undefined){
        		                    elem1[pageelement] = 0;
        		                }
        		                else if(pageelement == "pasture_ID"){
        		                    pasture_ID = true;
        		                    elem1["pasture_ID"] = 0;
        		                }
        		                else{
        		                    elem1[pageelement] = elem[pageelement];
        		                }

                            });
                            if(pasture_ID == false){
                                elem1["pasture_ID"]= 0;
                                pasture_ID = false;
                            }
                            elem1["email_id"]= $("#email")[0].textContent;

                            console.log(elem1);
                            dataJson = JSON.stringify(elem1);
            		        $.ajax({
    							url: '/api/experiment/herd/',
    							data: dataJson,
    							type: 'post',
    							dataType: 'json',
    							success: function(response) {
    								console.log(response);
    								submit = true;
    								$.notify("Data Saved", "info");
    							},
    							error: function(response) {
    								console.log(response);
    								$.notify("Data Not saved", "error");
    							}
    						});
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
