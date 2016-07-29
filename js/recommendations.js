var fid = $("#fid").val();
loadrecommendation();

function recentrefresh()
{
    var refresh=1000; // Refresh rate in milli seconds
    mytime=setTimeout('recentid()',refresh)
}

function recentid()
{
	recentrefresh();
	var recentid = $("#lastrecommendationid").val();

	$.ajax({
		url     : 'recommendations-data.php',
		type    : 'POST',
		data    : 'testrecentid=1' + '&fid=' + fid,
		success : function(data)
		{
			if(data != recentid)
			{
				loadnewrecommendation();
			}
		}
	});
}

function loadnewrecommendation()
{
	var recentid = $("#lastrecommendationid").val();

	$.ajax({
		url      : 'recommendations-data.php',
		type     : 'POST',
		data     : 'loadnewrecommendation=1' + '&fid=' + fid + '&recentid=' + recentid,
		dataType : 'JSON',
		success  : function(data)
		{
			for(var i = 0; i < data.length; i++)
			{
				var recommendationid = data[i].recommendationid;
				var fbimg = data[i].fdimg;
				var fbname = data[i].fdname;
				var recommendation = data[i].recommendation;
				var datesent = data[i].datesent;

				var tobeappend = ""+
									"<div class='row recommendationdiv' id='"+recommendationid+"'>"+
										"<div class='col-md-12 col-xs-12'>"+
											"<div class='panel panel-default' style='margin-bottom:5px;'>"+
												"<div class='panel-body' style='padding:0px;'>"+

													"<div class='row'>"+

														"<table style='width:90%;margin:auto;'>"+
															"<tr>"+
																"<td style='vertical-align:middle;text-align:center;width:30%;padding:5px;'>"+
																	"<img class='img img-circle' style='height:50px;' src='"+ fbimg +"' />"+
																"</td>"+

																"<td style='vertical-align:middle;text-align:left;width:70%;padding:5px;'>"+
																	"<h4>"+ fbname + "</h4>" +
																	"<p style='font-size:11px;'>"+ datesent + "</p>" +
																	"<hr>"+
																"</td>"+
															"</tr>"+

															"<tr>"+
																"<td colspan='2' style='text-align:left;padding:5px;'>"+
																	"<p style='word-wrap: break-word;text-indent: 10%;font-size: 14;'>"+recommendation+"</p>"+
																"</td>"+
															"</tr>"+
														"</table>"+
													"</div>"+

												"</div>"+
											"</div>"+
										"</div>"+
									"</div>"+
									"";
					$("#recommendationdiv").prepend(tobeappend);
			}

			$("#lastrecommendationid").val(recommendationid);
			recentid();
		}
	})
}

function loadrecommendation()
{
	$.ajax({
		url      : 'recommendations-data.php',
		type     : 'POST',
		data     : 'loadrecommendation=1' + '&fid=' + fid,
		dataType : 'JSON',
		success  : function(data)
		{
			if(data.length == 0)
			{
				var tobeappend = ""+
								"<div class='row'>"+
									"<div class='col-md-12 col-xs-12'>"+
										"<center>"+
										"<h4 style='color:#999;'>"+
											"No Recommendation."+
										"</h4>"+
										"</center>"+
									"</div>"+
								"</div>"+
								"";

				$("#recommendationdiv").append(tobeappend);

			}

			for(var i = 0; i < data.length; i++)
			{

				var recommendationid = data[i].recommendationid;
				var fbimg = data[i].fdimg;
				var fbname = data[i].fdname;
				var recommendation = data[i].recommendation;
				var datesent = data[i].datesent;

				var tobeappend = ""+
									"<div class='row recommendationdiv' id='"+recommendationid+"'>"+
										"<div class='col-xs-12 col-md-12 col-lg-12'>"+
											"<div class='panel-default panel' style='background:white;border-radius:0px;margin-bottom:0px;border-color:transparent;'>"+
												"<div class='panel-body commentpanelbody' style='padding-bottom:0px;'>"+
													"<div class='col-xs-3 col-md-1 col-lg-1'>"+
													 	"<img class='img' style='height:40px;' src='"+ fbimg +"' />"+
													"</div>"+

													"<div class='col-xs-9 col-md-11 col-lg-11 ' style='word-break: break-all;'>"+
														"<b>"+
															"<a style='color:#365899;' href='viewprofile.php?fid="+fid+"'>"+fbname+"</a>"+
															"&nbsp;&nbsp;&nbsp;"+
														"</b>"+
														"<p style='font-size:10px;color:#90949c;'>"+datesent+"</p>"+
														"<br>"+
													"</div>"+

													"<div class='col-xs-12 col-md-12 col-lg-12 ' style='word-break: break-all;'>"+
														"<hr>"+
													"</div>"+

													"<div class='col-xs-12 col-md-12 col-lg-12 ' style='word-break: break-all;'>"+
														"<br>"+
														recommendation+
														"<br><br>"+
													"</div>"+

												"</div>"+
											"</div>"+
										"</div>"+
									"</div>"+
									"";
					$("#recommendationdiv").append(tobeappend);
			}

			var lastdivid = $(".recommendationdiv").attr('id');
			$("#lastrecommendationid").val(lastdivid);
			recentid();
		}
	})
}
