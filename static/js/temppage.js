$('#myForm').on('submit', function(e){
  $('#myModal').modal('show');
  e.preventDefault();
});
function saveevent(){
    var appendtext = "<a><ul>";
    appendtext += $("#eventtext")[0].value;
    appendtext += "</ul></a><br>";
    console.log(appendtext);
    $("#usdaevents").append(appendtext);
};

