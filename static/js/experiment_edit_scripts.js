
$(document).ready(function(){
	var herdname = getQueryVariable("herdname");
	console.log(herdname);
	$.ajax({
		url : '/api/herd/name/'+herdname,
		type : 'POST',
		dataType : 'json',
		async: false,
		success : function(data) {
			console.log(data);
			$("#herdname").val(data[0].name);
			$("#herddescription").val(data[0].description);
			$("#create_date").val(StringToDate(data[0].create_date));
			var AIDs = JSON.parse(data[0].AID_string);
			$(AIDs).each(function(j,elem){
				$.ajax({
					url : '/api/animal/add/'+elem,
					type : 'GET',
					dataType : 'json',
					async: false,
					success : function(results) {
						$("<li><a id='"+results[0].Animal_ID+"' onclick='callexperiment("+results[0].Animal_ID+")'> "+results[0].Animal_ID+" --> "+results[0].animalname+"</a></li>").prependTo("#animallist");
					},
					error: function(response){
						console.log(response);
					}
				});
			});
			var value = JSON.parse(data[0].string);
			$(value).each(function(i,elem){
				var each = elem.split("-");
				console.log(each[0]+"=>"+each[1]);
				if(i == 0){
					$("<div class='update row' style='padding-bottom:10px;'>").appendTo("#newfields");
					if(each[0] == "drop"){
						var toappend = "<div class='col-xs-6'><label for="+each[1]+" class='control-label col-xs-5' align='right'>"+each[2]+":</label>";
						toappend += "<div class='col-xs-7'><select name='"+each[1]+"' class='form-control' id="+each[1]+">";
						toappend += "<option></option>";
						toappend += elemvalues(each[1]);
						toappend += "</select></div></div>";
						$(toappend).appendTo("#newfields");
					}
					else if(each[0] == "date"){
						var toappend = "<div class='col-xs-6'><label for='date' class='control-label col-xs-5' align='right'>"+each[2]+":</label>";
						toappend += "<div class='col-xs-7'><input class='form-control' id="+each[1]+" name="+each[1]+" placeholder='YYYY-MM-DD' type='text' readonly=false/></div></div>";
						toappend += "<script>$('#"+ each[1] +"').flatpickr({});</script>";
						$(toappend).appendTo("#newfields");
					}
					else{
						$("<div class='col-xs-6'><label for="+ each[1] +" class='control-label col-xs-5' align='right'>"+each[2] +":</label><div class='col-xs-7'><input type='text' align='right' class='form-control' id="+ each[1] +" name="+ each[1] +"></div></div>").appendTo("#newfields");
					}
				}
				else if(i%2 == 1){
					if(each[0] == "drop"){
						var toappend = "<div class='col-xs-6'><label for="+each[1]+" class='control-label col-xs-5' align='right'>"+each[2]+":</label>";
						toappend += "<div class='col-xs-7'><select name='"+each[1]+"' class='form-control' id=1"+each[1]+">";
						toappend += "<option></option>";
						toappend += elemvalues(each[1]);
						toappend += "</select></div></div>";
						$(toappend).appendTo("#newfields");
					}
					else if(each[0] == "date"){
						var toappend = "<div class='col-xs-6'><label for='date' class='control-label col-xs-5' align='right'>"+each[2]+":</label>";
						toappend += "<div class='col-xs-7'><input class='form-control' id="+each[1]+" name="+each[1]+" placeholder='YYYY-MM-DD' type='text' readonly=false/></div></div>";
						toappend += "<script>$('#"+ each[1] +"').flatpickr({});</script>";
						$(toappend).appendTo("#newfields");
					}
					else{
					$("<div class='col-xs-6'><label for="+ each[1] +" align='right' class='control-label col-xs-5'>"+each[2]+":</label><div class='col-xs-7'><input type='text' class='form-control' id="+ each[1] +" name="+ each[1] +"></div></div>").appendTo("#newfields");
					}
				}
				else{

					$("</div><br>").appendTo("#newfields");
					$("<div class='update row' style='padding-bottom:10px;'>").appendTo("#newfields");
					if(each[0] == "drop"){
						var toappend = "<div class='col-xs-6'><label for="+each[1]+" class='control-label col-xs-5' style='align-right'>"+each[2]+":</label>";
						toappend += "<div class='col-xs-7'><select name='"+each[1]+"' class='form-control' id="+each[1]+">";
						toappend += "<option></option>";
						toappend += elemvalues(each[1]);
						toappend += "</select></div></div>";
						$(toappend).appendTo("#newfields");
					}
					else if(each[0] == "date"){
						var toappend = "<div class='col-xs-6'><label for='date' class='control-label col-xs-5' align='right'>"+each[2]+":</label>";
						toappend += "<div class='col-xs-7'><input class='form-control' id="+each[1]+" name="+each[1]+" placeholder='YYYY-MM-DD' type='text' readonly=false/></div></div>";
						toappend += "<script>$('#"+ each[1] +"').flatpickr({});</script>";
						$(toappend).appendTo("#newfields");
					}
					else{
						$("<div class='col-xs-6'><label for="+ each[1] +" class='control-label col-xs-5' align='right'>"+each[2]+":</label><div class='col-xs-7'><input type='text' class='form-control' id="+ each[1] +" name="+ each[1] +"></div></div>").appendTo("#newfields");
					}
				}
				$("</div>").appendTo("#newfields");
			});
		},
		error: function(response){
			console.log(response);
		}
	});

});
function callexperiment(variable){
	$.ajax({
		url : '/api/experiment/herd/'+variable,
		type : 'GET',
		dataType : 'json',
		async: false,
		success : function(data) {
			console.log(data);
			if(data == 0){
			    $("#Animal_ID").val(variable);
                $.ajax({
					url : '/api/animal/add/'+variable,
					type : 'GET',
					dataType : 'json',
					async: false,
					success : function(results) {
					 $("#animalname").val(results[0].animalname);
					},
					error: function(response){
						console.log(response);
					}
				});
			}
			else{
    			$('#animalname').val(data[0].animalname)
    			$('#Animal_ID').val(data[0].Animal_ID);
    			$('#adj205h').val(data[0].adj205h);
    			$('#adj205w').val(data[0].adj205w);
    			$('#adj365dht').val(data[0].adj365dht);
    			$('#adjyearlingh').val(data[0].adjyearlingh);
    			$('#adjyearlingw').val(data[0].adjyearlingw);
    			$('#ageatwean').val(data[0].ageatwean);
    			$('#ageatyearling').val(data[0].ageatyearling);
    			$('#animalname').val(data[0].animalname);
    			$('#animaltype').val(data[0].animaltype);
    			$('#backfat').val(data[0].backfat);
    			$('#bcsdifference').val(data[0].bcsdifference);
    			$('#bcsprevious').val(data[0].bcsprevious);
    			$('#bcsrecent').val(data[0].bcsrecent);
    			$('#birthweight').val(data[0].birthweight);
    			$('#birthweightadj').val(data[0].birthweightadj);
    			$('#blockpen').val(data[0].blockpen);
    			$('#currentwtcow').val(data[0].currentwtcow);
    			$('#currentwtheifer').val(data[0].currentwtheifer);
    			$('#customheight').val(data[0].customheight);
    			$('#customheightdate').val(StringToDate(data[0].customheightdate));
    			$('#customweight').val(data[0].customweight);
    			$('#customweightdate').val(StringToDate(data[0].customweightdate));
    			$('#damwtatwean').val(data[0].damwtatwean);
    			$('#expt_date').val(data[0].expt_date);
    			$('#replicate').val(data[0].replicate);
    			$('#sireframescore').val(data[0].sireframescore);
    			$('#treatment').val(data[0].treatment);
    			$('#weandate').val(StringToDate(data[0].weandate));
    			$('#weanframescore').val(data[0].weanframescore);
    			$('#weangpd').val(data[0].weangpd);
    			$('#weanheight').val(data[0].weanheight);
    			$('#weanwda').val(data[0].weanwda);
    			$('#weanweight').val(data[0].weanweight);
    			$('#weanweightdate').val(data[0].weanweightdate);
    			$('#yearlingdate').val(StringToDate(data[0].yearlingdate));
    			$('#yearlingframescore').val(data[0].yearlingframescore);
    			$('#yearlingheight').val(data[0].yearlingheight);
    			$('#yearlingweight').val(data[0].yearlingweight);
			}
		},
		error : function(response){
			console.log(response);
            $("#Animal_ID").val(variable);
            $.ajax({
					url : '/api/animal/add/'+variable,
					type : 'GET',
					dataType : 'json',
					async: false,
					success : function(results) {
					 $("#animalname").val(results[0].animalname);
					},
					error: function(response){
						console.log(response);
					}
				});
		}
	});
};

$("#experiment_update").click(function(){
	var Animal_ID = $('#Animal_ID').val();
	$.ajax({
		url : '/api/experiment/herd/'+Animal_ID,
		type : 'GET',
		dataType : 'json',
		async: false,
		success : function(data) {
		    if(data == 0){
		        var data = {
               	    Animal_ID : $('#Animal_ID').val(),
            		animalname : $('#animalname').val(),
            		birthweight : 0,
            		birthweightadj : 0,
            		sireframescore : 0,
            		bcsrecent : 0,
            		bcsprevious : 0,
            		bcsdifference : 0,
            		damwtatwean : 0,
            		expt_name : $('#expt_name').val(),
            		weanheight : 0,
            		weanweight : 0,
            		weandate : "1960-07-07",
            		weangpd : 0,
            		weanhipht : 0,
            		weanwda : 0,
            		weanweightdate : "1960-07-07",
            		adj205w : 0,
            		adj205h : 0,
            		weanframescore : 0,
            		ageatwean : 0,
            		yearlingweight : 0,
            		yearlingheight : 0,
            		yearlingdate : "1960-07-07",
            		adjyearlingw : 0,
            		adjyearlingh : 0,
            		yearlingframescore : 0,
            		ageatyearling : 0,
            		currentwtcow : 0,
            		adj365dht : 0,
            		customweight : 0,
            		customheight : 0,
            		customweightdate : "1960-07-07",
            		customheightdate : "1960-07-07",
            		currentwtheifer : 0,
            		backfat : 0,
            		treatment : 0,
            		blockpen : 0,
            		replicate : 0,
            		animaltype : 0,
            		expt_date : $('#create_date').val(),
            		email_id : $('#email')[0].textContent,
            		entry_date : StringToDateTimeZone(new Date())
        		}
        		$("#newfields input").each(function(i,elem){
    				if(elem.value == ""){
    					data[elem.id] = null;
    				}
    				else{
    					data[elem.id] = elem.value;
    				}
    			});
        		var myJSON = JSON.stringify(data);
    			$.ajax({
    				url : '/api/experiment/herd/',
    				type : 'POST',
    				data : myJSON,
    				dataType : 'json',
    				async: false,
    				success : function(response) {
    					console.log(response);
    					$.notify("Data Updated");
    				},
    				error : function(response){
    					console.log(response)
    					$.notify("Error", "danger");
    				}
    			});
		    }
		    else{
		        console.log(data);
    			$("#newfields input").each(function(i,elem){
    				if(elem.value == ""){
    					data[0][elem.id] = null;
    				}
    				else{
    					data[0][elem.id] = elem.value;
    				}
    			});
    			var sendingdata = data[0];
    			sendingdata.expt_date = $("#create_date").val();
    			sendingdata.expt_name = $("#expt_name").val();
    			sendingdata.entry_date = StringToDateTimeZone(new Date());
    			var myJSON = JSON.stringify(sendingdata);
    			$.ajax({
    				url : '/api/experiment/herd/',
    				type : 'POST',
    				data : myJSON,
    				dataType : 'json',
    				async: false,
    				success : function(response) {
    					console.log(response);
    					$.notify("Data Updated","info");
    				},
    				error : function(response){
    					console.log(response)
    					$.notify("Error", "danger");
    				}
    			});
		    }

		},
		error : function(response){
			console.log(response)
		}
	});

});
var string;
$("#ALL_CHANGES").click(function(){
    $("#Update_Parameters").modal("show");
    $('.groupaddinput3').attr('checked', false);
    $("#animallist li a").each(function(i,elem){
    	console.log(elem.id);
    });

});

$("#Update_Yes").click(function(){
        $("#All_Updates").modal("show");
        var jsonattributes = [];
    	var newattributes;
    	$(".groupaddinput3").each(function(i, elem){
    		if($(this).is(":checked")){
    			newattributes = $(elem).val();
    			jsonattributes.push(newattributes);
    		}
    	});
        $(jsonattributes).each(function(i,elem){
				var each = elem.split("-");
				console.log(each[0]+"=>"+each[1]);
				if(i == 0){
					$("<div class='update row' style='padding-bottom:10px;'>").appendTo("#allupdatefields");
					if(each[0] == "drop"){
						var toappend = "<div class='col-xs-6'><label align='right' for="+each[1]+" class='control-label col-xs-5'>"+each[1]+":</label>";
						toappend += "<div class='col-xs-7'><select name='"+each[1]+"' class='form-control' id=1"+each[1]+">";
						toappend += "<option></option>";
						toappend += elemvalues(each[1]);
						toappend += "</select></div></div>";
						$(toappend).appendTo("#allupdatefields");
					}
					else if(each[0] == "date"){
						var toappend = "<div class='col-xs-6'><label for='date' class='control-label col-xs-5' align='right'>"+each[1]+"</label>";
						toappend += "<div class='input-group col-xs-7'><input class='date form-control' id=1"+each[1]+" name="+each[1]+" placeholder='YYYY-MM-DD' type='text'/></div></div>";
						toappend += "<script>$('#1"+ each[1] +"').flatpickr({});</script>";
						$(toappend).appendTo("#allupdatefields");
					}
					else{
						$("<div class='col-xs-6'><label for="+ each[1] +" class='control-label col-xs-5'>"+each[1] +"</label><div class='col-xs-7'><input type='text' align='right' class='form-control' id=1"+ each[1] +" name="+ each[1] +"></div></div>").appendTo("#allupdatefields");
					}
				}
				else if(i%2 == 1){
					$("</div><br>").appendTo("#allupdatefields");
					$("<div class='update row' style='padding-bottom:10px;'>").appendTo("#allupdatefields");
					if(each[0] == "drop"){
						var toappend = "<div class='col-xs-6'><label for="+each[1]+" class='control-label col-xs-5' align='right'>"+each[1]+"</label>";
						toappend += "<div class='col-xs-7'><select name='"+each[1]+"' class='form-control' id=1"+each[1]+">";
						toappend += "<option></option>";
						toappend += elemvalues(each[1]);
						toappend += "</select></div></div>";
						$(toappend).appendTo("#allupdatefields");
					}
					else if(each[0] == "date"){
						var toappend = "<div class='col-xs-6'><label for='date' class='control-label col-xs-5' align='right'>"+each[1]+"</label>";
						toappend += "<div class='input-group col-xs-7'><input class='date form-control' id=1"+each[1]+" name="+each[1]+" placeholder='YYYY-MM-DD' type='text'/></div></div>";
						toappend += "<script>$('#1"+ each[1] +"').flatpickr({});</script>";
						$(toappend).appendTo("#allupdatefields");
					}
					else{
					$("<div class='col-xs-6'><label for="+ each[1] +" align='right' class='control-label col-xs-5'>"+each[1] +"</label><div class='col-xs-7'><input type='text' class='form-control' id=1"+ each[1] +" name="+ each[1] +"></div></div>").appendTo("#allupdatefields");
					}
				}
				else{
					$("<div class='update row' style='padding-bottom:10px;'>").appendTo("#allupdatefields");
					if(each[0] == "drop"){
						var toappend = "<div class='col-xs-6'><label for="+each[1]+" class='control-label col-xs-5' style='align-right'>"+each[1]+"</label>";
						toappend += "<div class='col-xs-7'><select name='"+each[1]+"' class='form-control' id=1"+each[1]+">";
						toappend += "<option></option>";
						toappend += elemvalues(each[1]);
						toappend += "</select></div></div>";
						$(toappend).appendTo("#allupdatefields");
					}
					else if(each[0] == "date"){
						var toappend = "<div class='col-xs-6'><label for='date' class='control-label col-xs-5' align='right'>"+each[1]+"</label>";
						toappend += "<div class='input-group col-xs-7'><input class='date' id=1"+each[1]+" name="+each[1]+" placeholder='YYYY-MM-DD' type='text'/></div></div>";
						toappend += "<script>$('#1"+ each[1] +"').flatpickr({});</script>";
						$(toappend).appendTo("#allupdatefields");
					}
					else{
						$("<div class='col-xs-6'><label for="+ each[1] +" class='control-label col-xs-5' align='right'>"+each[1] +"</label><div class='col-xs-7'><input type='text' class='form-control' id=1"+ each[1] +" name="+ each[1] +"></div></div>").appendTo("#allupdatefields");
					}
				}
                $("</div>").appendTo("#allupdatefields");
			});
});
