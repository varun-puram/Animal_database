$(document).ready(function () {
	$.ajax({
		url : '/api/Upload_PDF/get/',
		type : 'GET',
		dataType : 'json',
		async: false,
		success : function(data) {
			console.log(data);
			tablecall(data);
		},
		error: function(response){
			console.log(response);
		}
	});
})

function nameFormatter(value) {
	var values = String(value);
	var pair = values.split("-");
	if(pair[0]=="pdf"){
		return '<a target="_blank" href=/static/pdf_files/'+ pair[1] + '>'+pair[1]+'</a>';
	}
	else{
		return value
	}
}


$('#Upload_PDF').click(function() {
  $("#UploadPDFModal").modal("show");
});

$(function() {
    $('#upload-file-btn').click(function() {
        var form_data = new FormData($('#upload-file')[0]);
        $.ajax({
            type: 'POST',
            url: '/uploadajax',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: false,
            success: function(data) {
                console.log(data);
				$("#uploads").val(data);
				$("#result").val(data);
				document.getElementById("result").disabled="true";
				$.notify("File upload Success", "info");
            },
        });
    });
});
