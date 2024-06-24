//Signup POST Function
$('#sign_up').click(function(e){
	var newuser = {
		firstname : $('#firstname').val(),
		lastname : $('#lastname').val(),
		email : $('#email').val(),
		password : $('#password').val()
	};
	var password = $('#password').val();
	var verifypassword = $('#verifypassword').val();
// 	if (validateForm()) {
// 		$.ajax({
// 			url: '/api/users_s/',
// 			data: newuser,
// 			type: 'POST',
// 			datatype: 'json',
// 			success: function(response) {
// 				console.log(response);
// 				$.notify("Data Sent", "info");
// 				setTimeout(function() {
// 						window.location.href = '/login'
// 					}, 1000);
// 			},
// 			error: function(error) {
// 				console.log(error);
// 				$.notify("Sending Data Failed", "error");
// 			}
// 		});
// 	}
});

// Used to validate email and password
function validateForm(){
	var password = $('#password').val();
	var verifypassword = $('#verifypassword').val();
	var email = $('#email').val();
	//Email verification using regex
	var re = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

	if (password != verifypassword){
		alert("Please check the password");
		return false;
	}
	if (!re.test(email)){
		alert("Please check the Email");
		return false;
	}
	else {
		return true;
	}
}

//Password Matching Functions
$('#password, #verifypassword').on('keyup', function () {
  if ($('#password').val() == $('#verifypassword').val()) {
    $('#message').html('Matching').css('color', 'green');
  } else
    $('#message').html('Not Matching').css('color', 'red');
});