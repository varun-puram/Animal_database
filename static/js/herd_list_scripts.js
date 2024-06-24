var globalstring = null;
var globaldescription = null;

$(document).ready(function () {
	$.ajax({
		url : '/api/herd/create/',
		type : 'GET',
		dataType : 'json',
		async: false,
		success : function(data) {
			console.log(data);
			$(data).each(function(i,elem){
			   elem.create_date =  StringToDate(elem.create_date);
			   elem.end_date = StringToDate(elem.end_date);
			});
			tablecall(data);
		},
		error: function(response){
			console.log(response);
		}
	});
    $('#search').multiselect({
        search: {
            left: '<input type="text" name="q" class="form-control" placeholder="Search..." />',
            right: '<input type="text" name="q" class="form-control" placeholder="Search..." />',
        },
        fireSearch: function(value) {
            return value.length > 3;
        }
    });
});

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
  $.notify("Loading");
  console.log(log);
  // alert("Selected Herd is : " + log[0].name);
  $("#HerdEditModal").modal("show");
  $("#Herd_Name").val(log[0].name);
  $("#create_date").val(StringToDate(log[0].create_date));
  globalstring = log[0].string;
  globaldescription = log[0].description;
  var AIDs = JSON.parse(log[0].AID_string);
  $(AIDs).each(function(i,elem){
		$.ajax({
			url: '/api/animal/add/'+elem,
			data: $('form').serialize(),
			type: 'GET',
			async: false,
			success : function(response) {
				$("<option value='"+response[0].Animal_ID+"'>"+ response[0].animalname +" </option>").appendTo("#search_to");
			},
			error: function(response){
				console.log(response);
			}
		});
	});
	$.ajax({
		url : '/api/test/',
		type : 'GET',
		dataType : 'json',
		async: false,
		success : function(data) {
			$(data).each(function(j,elem){
				if($('select#search_to option[value="'+elem.Animal_ID+'"]').length >0){}
				else{
					$("<option value='"+elem.Animal_ID+"'>"+ elem.animalname +" </option>").appendTo("#search");
				}
			});
		},
		error: function(response){
			console.log(response);
		}
	});


});
$('#Animal_Add_Modal_Yes').click(function() {
	var name= $('#Herd_Name').val();
	var create_date = $('#create_date').val();
	var end_date = $('#end_date').val();
	var animals = [];
	$('select#search_to option').each(function(i,pageelement){
		animals.push(pageelement.value);
	});
	animalstring = JSON.stringify(animals);
	var data = {
		name : name,
		AID_string : animalstring,
		create_date : create_date,
		end_date : end_date,
		email : $("#email")[0].textContent,
		string : globalstring,
		description : globaldescription
	}
	var dataJson = JSON.stringify(data);
	console.log(dataJson);
	$.ajax({
		url: '/api/herd/create/',
		data: dataJson,
		type: 'PATCH',
		dataType: 'json',
		success: function(response) {
			console.log(response);
			$.notify("Data Saved", "info");
			setTimeout(function(){location.reload(), 2000});
		},
		error: function(response) {
			console.log(response);
			alert("Data not saved");
			setTimeout(function(){location.reload(), 2000});
		}
	});
	globalstring = null;
	globaldescription = null;
});
$('#Herd_Edit_No').click(function() {
	globalstring = null;
	globaldescription = null;
});

$('#Delete').click(function() {
  var log= $('#table').bootstrapTable('getSelections');
  console.log(log);
  $('#Delete_Name').val(log[0].name);
  $('#Delete_Date').val(StringToDate(log[0].create_date));
  $("#HerdDeleteModal").modal("show");
});
$('#Delete_Yes').click(function() {
	var name= $('#Delete_Name').val();
	var date = $('#Delete_Date').val();
	var data = {
		name : name,
		create_date : date
	}
	var MyJSON = JSON.stringify(data)
	alert("Deleting this Herd"+name);
	$.ajax({
		url: '/api/herd/create/',
		type : 'DELETE',
		data : MyJSON,
		async: false,
		success : function(data) {
			location.reload();
			$.notify("Herd Data Deleted.");
		},
		error: function(response){
			alert("Herd Not Deleted. Please contact IT");
		}
	});
});