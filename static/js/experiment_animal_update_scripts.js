$(document).ready(function(){
   var animalname = getQueryVariable("animalname");
   var Animal_ID = getQueryVariable("Animal_ID");
   var date = getQueryVariable("date");
   $('#animalname').val(animalname);
   $.ajax({
		url: '/api/experiment/list/'+Animal_ID+'/'+date,
		type: 'POST',
		datatype : 'json',
		success: function(data) {
			console.log(data);
			$('#birthweight').val(data[0].birthweight);
			$('#sireframescore').val(data[0].sireframescore);
			$('#expt_name').val(data[0].expt_name);
			$('#sireframescore').val('0');
			$('#weanheight').val(data[0].weanheight);
			$('#weanweight').val(data[0].weanweight);
			$('#weandate').val(data[0].weandate);
			$('#adj205w').val(data[0].adj205w);
			$('#adj205h').val(data[0].adj205h);
			$('#weanframescore').val(data[0].weanframescore);
			$('#ageatwean').val(data[0].ageatwean);
			$('#yearlingheight').val(data[0].yearlingheight);
			$('#yearlingweight').val(data[0].yearlingweight);
			$('#yearlingdate').val(data[0].yearlingdate);
			$('#adjyearlingh').val(data[0].adjyearlingh);
			$('#adjyearlingw').val(data[0].adjyearlingw);
			$('#yearlingframescore').val(data[0].yearlingframescore);
			$('#ageatyearling').val(data[0].ageatyearling);
			$('#customweight').val(data[0].customweight);
			$('#customheight').val(data[0].customheight);
			$('#customheightdate').val(data[0].customheightdate);
			$('#customweightdate').val(data[0].customweightdate);
			$('#backfat').val(data[0].backfat);
			$('#blockpen').val(data[0].blockpen);
			$('#replicate').val(data[0].replicate);
			$('#treatment option:selected').text(data[0].treatment);
			$('#birthweightadj').val(data[0].birthweightadj);
			$('#bcsrecent').val(data[0].bcsrecent);
			$('#bcsprevious').val(data[0].bcsprevious);
			$('#bcsdifference').val(data[0].bcsdifference);
			$('#damwtatwean').val(data[0].damwtatwean);
			$('#weangpd').val(data[0].weangpd);
			$('#weanhipht').val(data[0].weanhipht);
			$('#weanwda').val(data[0].weanwda);
			$('#weanweightdate').val(data[0].weanweightdate);
			$('#currentwtcow').val(data[0].currentwtcow);
			$('#currentwtheifer').val(data[0].currentwtheifer);
			$('#adj365dht').val(data[0].adj365dht);
		},
		error: function(error) {
			console.log(error)
			$.notify("Experiment Animal GET Failed", "error")
		}
	});

});

$("#Update_experiment_animal").click(function(){
    var date = getQueryVariable("date");
    var Animal_ID = getQueryVariable("Animal_ID");
   	var data = {
   	    Animal_ID : Animal_ID,
		animalname : $('#animalname').val(),//1
		birthweight : $('#birthweight').val(),//2
		birthweightadj : $('#birthweightadj').val(),//3
		sireframescore : $('#sireframescore').val(),//4
		bcsrecent : $('#bcsrecent').val(),//7
		bcsprevious : $('#bcsprevious').val(),//8
		bcsdifference : $('#bcsdifference').val(),//9
		damwtatwean : $('#damwtatwean').val(),//10
		expt_name : $('#expt_name').val(),
		weanheight : $('#weanheight').val(),//11
		weanweight : $('#weanweight').val(),//12
		weandate : $('#weandate').val(),//13
		weangpd : $('#weangpd').val(),//14
		weanhipht : $('#weanhipht').val(),//15
		weanwda : $('#weanwda').val(),//16
		weanweightdate : $('#weanweightdate').val(),//17
		adj205w : $('#adj205w').val(),//18
		adj205h : $('#adj205h').val(),//19
		weanframescore : $('#weanframescore').val(),//20
		ageatwean : $('#ageatwean').val(),//21
		yearlingweight : $('#yearlingweight').val(),//22
		yearlingheight : $('#yearlingheight').val(),//23
		yearlingdate : $('#yearlingdate').val(),//24
		adjyearlingw : $('#adjyearlingw').val(),//25
		adjyearlingh : $('#adjyearlingh').val(),//26
		yearlingframescore : $('#yearlingframescore').val(),//27
		ageatyearling : $('#ageatyearling').val(),//28
		currentwtcow : $('#currentwtcow').val(),//29
		adj365dht : $('#adj365dht').val(),//30
		customweight : $('#customweight').val(),//31
		customheight : $('#customheight').val(),//32
		customweightdate : $('#customweightdate').val(),//33
		customheightdate : $('#customheightdate').val(),//34
		currentwtheifer : $('#currentwtheifer').val(),//35
		backfat : $('#backfat').val(),//36
		treatment : $('#treatment').val(),//37
		blockpen : $('#blockpen').val(),//38
		replicate : $('#replicate').val(),//39
		animaltype : $('#animaltype option:selected').text(),//40
		expt_date : date,
		email_id : $('#email')[0].textContent,
		height : $('#height').val(),
		weight : $('#weight').val(),
		currentframescore : $('#currentframescore').val(),
		damframescore : $('#damframescore').val(),
		comments : $('#comments').val(),
		pasture_ID : $('#pasture_ID').val(),
		herd : $('#herd').val(),
		entry_date : StringToDateTimeZone(new Date())
		}
		var myJSON = JSON.stringify(data);
		$.ajax({
			url: '/api/experiment/herd/',
			data: myJSON,
			datatype: 'json',
			type: 'PATCH',
			success: function(response) {
				console.log(response)
				$.notify("Animal Experiment Data Saved", "info");
			},
			error: function(error) {
				console.log(error)
				$.notify("Animal Experiment input error", "error")
			}
		});
});