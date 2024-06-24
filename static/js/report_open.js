$(document).ready(function(){
    herdname = getQueryVariable("name");
    startdate = getQueryVariable("start_date");
    enddate = getQueryVariable("end_date")
    var tabledata = {};
	$.ajax({
		url : '/api/report/get/'+herdname, //+'/'+startdate+'/'+enddate,
		type : 'GET',
		dataType : 'json',
		async: false,
		success : function(data) {
			console.log(data);
			strings = JSON.parse(data[0].parameters);
			strings.unshift("animalname");
			strings.unshift("Animal_id");
			$(strings).each(function(i,elem){
                // var each = elem.split("-");
				var toappend = "<th data-field='"+elem+"' style='border-bottom: 4px solid black;'>"+elem+"</th>";
				$(toappend).appendTo("#TableElements");
			});
        	$.ajax({
        		url : '/api/herd/name/'+data[0].name,
        		type : 'POST',
        		dataType : 'json',
        		async: false,
        		success : function(data) {
        		    AIDs = JSON.parse(data[0].AID_string);
                    $(AIDs).each(function(i,elem){
                    	$.ajax({
                    		url : '/api/report/create/'+elem+'/'+startdate+'/'+enddate,
                    		type : 'GET',
                    		dataType : 'json',
                    		async: false,
                    		success : function(data) {
                    		    if(i==0){
                    		        tablecall(data);
                    		    }
                    		    else{
                    		        $('#table').bootstrapTable('append', data);
                    		    }

                    		},
                    		error: function(response){
                    			console.log(response);
                    		}
                    	});
                    });
         			tablecall(tabledata);
        		},
        		error: function(response){
        			console.log(response);
        		}
        	});

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