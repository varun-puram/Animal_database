function getQueryVariable(variable)
{
   var query = window.location.search.substring(1);
   var vars = query.split("&");
   for (var i=0;i<vars.length;i++) {
		   var pair = vars[i].split("=");
		   if(pair[0] == variable){return pair[1];}
   }
   return false;
};

function alertbox(txt) {
	var r = confirm(txt);
	return r;
}
function promptbox(txt) {
    var txt;
    var person = prompt(txt);
    if (person == null || person == "") {
        txt = "User cancelled the prompt.";
    } else {
        txt = "Hello " + person + "! How are you today?";
    }
    document.getElementById("demo").innerHTML = txt;
}

function StringToDate(string)
{
	if (string==null){return null;}
	else{
		var date = moment.utc(string).format('YYYY-MM-DD');
	return date;
	}
};

function StringToDateTime(string)
{
	if (string==null){return null;}
	else{
		var datetime = moment(string).format('YYYY-MM-DD hh:mm:ss', "America/Monterrey");
	return datetime;
	}
};

function StringToDateTimeZone(string)
{
	if (string==null){return null;}
	else{
		var datetime = moment(string).format("YYYY-MM-DD hh:mm:ss", "America/Monterrey");
	return datetime;
	}
};

function SubmitStringToDate(string)
{
	if (string==null){return null;}
	else{
		var date = moment.utc(string).format('YYYY-MM-DD');
		return date;
	}
};