$('.advanced').click(function() {
    if ($('.advanced').is(':checked')) {
        $('.groupaddinput2').attr('checked', true);
    } else {
        $('.groupaddinput2').attr('checked', false);
    }
});

$('.basics').click(function() {
    if ($(this).is(':checked')) {
        $('.groupaddinput1').attr('checked', true);
    } else {
        $('.groupaddinput1').attr('checked', false);
    }
});

$('.experiment').click(function() {
    if ($(this).is(':checked')) {
        $('.groupaddinput3').attr('checked', true);
    } else {
        $('.groupaddinput3').attr('checked', false);
    }
});
$('.reproduction').click(function() {
    if ($(this).is(':checked')) {
        $('.groupaddinput4').attr('checked', true);
    } else {
        $('.groupaddinput4').attr('checked', false);
    }
});
$('.medical').click(function() {
    if ($(this).is(':checked')) {
        $('.groupaddinput5').attr('checked', true);
    } else {
        $('.groupaddinput5').attr('checked', false);
    }
});
$('.grazing').click(function() {
    if ($(this).is(':checked')) {
        $('.groupaddinput6').attr('checked', true);
    } else {
        $('.groupaddinput6').attr('checked', false);
    }
});
