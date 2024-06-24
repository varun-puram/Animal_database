$(document).ready(function () {
	$.ajax({
		url : '/api/Standard/Queries/get/',
		type : 'GET',
		dataType : 'json',
		async: false,
		success : function(data) {
			console.log(data);
			$(data).each(function(i,elem){
				elem.Date(Registered) = StringToDate(elem.Date(Registered));
				
				
			});
			tablecall(data);
		},
		error: function(response){
			console.log(response);
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

$(function () {
	var $table = $('#table');
	$('#toolbar').find('select').change(function () {
    $table.bootstrapTable('refreshOptions', {
      exportDataType: $(this).val()
    });
  });
});


$(function() {
  $('#query1').click(function() {
    
    // location.reload();
$.ajax({
  url : '/api/Standard/Query1/',
  type : 'GET',
  dataType : 'json',
  async: false,
  success : function(data) {
    console.log(data);
    tablecall(data);
  },
  error: function(response){
    console.log(response);
    location.reload();
  }
});


      
  });
});


$(function() {
  $('#query2').click(function() {
    // location.reload();
$.ajax({
  url : '/api/Standard/Query2/',
  type : 'GET',
  dataType : 'json',
  async: false,
  success : function(data) {
    console.log(data);
    tablecall(data);
  },
  error: function(response){
    console.log(response);
    location.reload();
  }
});
      
  });
});
$(function() {
  $('#query3').click(function() {
    // location.reload();
$.ajax({
  url : '/api/Standard/Query3/',
  type : 'GET',
  dataType : 'json',
  async: false,
  success : function(data) {
    console.log(data);
    tablecall(data);
  },
  error: function(response){
    console.log(response);
    location.reload();
  }
});
      
  });
});

$(function() {
  $('#refresh').click(function() {
    location.reload();
  });
});
