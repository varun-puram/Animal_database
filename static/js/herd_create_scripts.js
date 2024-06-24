jQuery(document).ready(function($) {
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


$('#CreateHerdButton').click(function(e) {
	var herdname = $('#herdname').val();
	var herddescription = $('#herddescription').val();
	var string = "";
	var animals = [];
	var create_date = $('#DateCreated').val();
	$('select#search_to option').each(function(i,pageelement){
		animals.push(pageelement.value);
	});
	animals = JSON.stringify(animals);
	var data={
		name: herdname,
		email_id : $("#email")[0].textContent,
		description : herddescription,
		create_date : create_date,
		AID_string : animals,
		string : string
	}
	var myJSON = JSON.stringify(data);
	$.ajax({
		url: '/api/herd/create/',
		data: myJSON,
		datatype: 'json',
		type: 'POST',
		async: false,
		success: function(response) {
			console.log(response);
			$.notify("Data Saved", "info")
			alert("Herd Created");
			setTimeout(location.reload(), 3000);

		},
		error: function(error) {
			console.log(error)
			$.notify("Data not saved", "danger");
		}
	})
	location.reload();
});


$(document).ready(function () {
	$.ajax({
		url : '/api/test/',
		type : 'GET',
		dataType : 'json',
		async: false,
		success : function(data) {
			$(data).each(function(j,elem){
				$("<option value='"+elem.Animal_ID+"'>"+ elem.animalname +" </option>").appendTo("#search");
			});
		},
		error: function(response){
			console.log(response);
		}
	});
})