$(document).ready(function () {
  $.ajax({
    url: "/api/Demo/get",
    type: "GET",
    dataType: "json",
    async: false,
    success: function (data) {
      console.log(data);
      tablecall(data);
    },
    error: function (response) {
      console.log(response);
    },
  });
});
$('#NewRecords').click(function() {
  $("#newrecord").modal("show");
});




// Upload Demo csv change  starts from here
//for displaying modal
$('#demoUploadCSV').click(function() {
  $("#UploadCSVDemoModal").modal("show");
});


function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');//extracting headers from the CSV file
    var lines = [];
    var tarr = [];
    $("#dvDemoCSV").html('');
 
    for (var i=1; i<allTextLines.length; i++) { //iterating over the lines read from csv file
        var data1 = allTextLines[i].split(','); //splitting the line
         if(data1[4].length > 0){ //if final element of array i.e date_scanned is not null
		 //start of ajax call
		 $.ajax({
            url: '/api/demoUploadInsert/'+data1[0]+'/'+data1[1].replaceAll("/","-")+'/'+data1[2]+'/'+data1[3]+'/'+data1[4].replaceAll("/","-")+'/',
            type: 'POST',
            success: function (response) {
				    console.log(response);
            },
            error: function (response) {
				console.log(response);
            }
        });	 
		 //end of ajax call		 
		 tarr.push(data1);	     
		 }		
    }// end of for loop
	// $("#dvDemoCSV").append(tarr); 
}//end of process data function


$("#uploadDemo").bind("click", function () 	{ //binding the click of #uploaddemo with a function
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
        if (regex.test($("#demoFileUpload").val().toLowerCase())) //validating the input fileName
		{
			        	var reader = new FileReader();
                reader.readAsText($("#demoFileUpload")[0].files[0]); //reading the uploaded csv file
              	reader.onload = function(){
		                  processData(reader.result); //pasing the data read from csv file 
		                 	}
			} //end of regex if
		else //else for regex
		{
            alert("Please upload a valid CSV file.");
    }
});

//Upload Demo csv change  ends here

function tablecall(data) {
  $("#table").bootstrapTable({
    filterControl: true,
    disableUnusedSelectOptions: true,
    singleSelect: true,
    data: data,
  });
}

$(function () {
  var $table = $("#table");
  $("#toolbar")
    .find("select")
    .change(function () {
      $table.bootstrapTable("refreshOptions", {
        exportDataType: $(this).val(),
      });
    });
});



