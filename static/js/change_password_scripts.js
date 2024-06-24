$('#repeatpassword').on('keyup', function () {
  if ($('#newpassword').val() == $('#repeatpassword').val()) {
    $('#message').html('Matching').css('color', 'green');
  } else
    $('#message').html('Not Matching').css('color', 'red');
});