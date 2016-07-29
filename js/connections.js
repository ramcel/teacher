var fid = $("#fid").val();
loadconnections();

function loadrequest()
{
	$.ajax({

		url      : 'connections-data.php',
		type     : 'POST',
		data     : 'loadrequest=1' + '&fid=' + fid,
		dataType : 'JSON',
		success  : function(data){

			$('.loading').fadeOut("slow",function(){
				if(data.length == 0)
				{
					var tobeappend = ""+
									"<div class='row'>"+
										"<div class='col-md-12 col-xs-12 col-lg-11'>"+
											"<div class='panel panel-default'>"+
												"<div class='panel-body'>"+
													"<h4><span class='fa fa-exclamation-circle'></span> No Connection Request.<h4>"+
												"</div>"+
											"</div>"+
										"</div>"+
									"</div>"+
									"";
					$("#requestdiv").append(tobeappend);
				}

				for(var i = 0; i < data.length; i++)
				{
					var connectedname = data[i].connectedname;
					var connectedimg = data[i].connectedimg;
					var connectedid = data[i].connectedid;
					var requesttype = data[i].requesttype;

					var requestbtn ;

					if(requesttype == 'approver')
					{
						requestbtn = ""+
									"<button class='btn btn-xs btn-primary approverequest' id='"+connectedid+"'>Confirm</button> "+
									"<button class='btn btn-xs btn-primary rejectrequest' id='"+connectedid+"'>Delete</button> "+
									"";
					}

					if(requesttype == 'requester')
					{
						requestbtn = ""+
									"<button class='btn btn-xs btn-primary cancelrequest' id='"+connectedid+"'>Delete</button>"+
									"";
					}

					var tobeappend = ""+
									"<div class='connectionrequestdiv"+connectedid+"'>"+
										//"<div class='col-md-12 col-xs-11 col-lg-11'>"+
											"<div class='panel panel-default'>"+
												"<div class='panel-body'>"+

													"<div class='row'>"+
														"<div class='col-xs-3 col-md-2 col-lg-2 '>"+
																"<img src='"+connectedimg+"' class='img img-responsive img-circle' style='height:40px;width:40px;' />"+
														"</div>"+

														"<div class='col-xs-4 col-md-5 col-lg-5 ' style='text-align:left;'>"+
															"<a href='viewprofile.php?fid="+connectedid+"'>"+
																"<h5 style='font-size:12px;'>"+connectedname+"</h5>"+
															"</a>"+
														"</div>"+

														"<div class='col-xs-5 col-md-5 col-lg-5 ' style='text-align:right;'>"+
															requestbtn+
														"</div>"+
													"</div>"+

												"</div>"+
											"</div>"+
										//"</div>"+
									"</div>"+
									"<br>"+
									"";
					$("#requestdiv").append(tobeappend);
				}
			});
		}

	});
}

function loadteacheryoumayknow()
{
	$.ajax({

		url      : 'connections-data.php',
		type     : 'POST',
		data     : 'loadteacheryoumayknow=1' + '&fid=' + fid,
		dataType : 'JSON',
		success  : function(data){

			$('.loading').fadeOut("slow",function(){
				if(data.length == 0)
				{
					var tobeappend = ""+
									"<div class='row'>"+
										"<div class='col-md-12 col-xs-12 col-lg-12'>"+
											"<div class='panel panel-default'>"+
												"<div class='panel-body'>"+
													"<h4><span class='fa fa-exclamation-circle'></span> No Suggestion.<h4>"+
												"</div>"+
											"</div>"+
										"</div>"+
									"</div>"+
									"";
					$("#findotherconnectionsdiv").append(tobeappend);
				}

				for(var i = 0; i < data.length; i++)
				{
					var teacheryouknowname = data[i].teacheryouknowname;
					var teacheryouknowimg = data[i].teacheryouknowimg;
					var teacheryouknowid = data[i].teacheryouknowid;

					var tobeappend = ""+
									"<a href='viewprofile.php?fid="+teacheryouknowid+"'>"+
									"<div class='row'>"+
										"<div class='col-md-12 col-xs-12 col-lg-12'>"+
											"<div class='panel panel-default' style='margin-bottom:0px;'>"+
												"<div class='panel-body'>"+
													"<table style='width:100%;'>"+
														"<tr>"+
															"<td style='width:20%;vertical-align:middle;text-align:left;'>"+
																"<img src='"+teacheryouknowimg+"' class='img img-circle' style='height:40px;' />"+
															"</td>"+

															"<td style='width:80%;vertical-align:middle;text-align:left;'>"+
																"<h5>"+teacheryouknowname+"</h5>"+
															"</td>"+
														"</tr>"+
													"</table>"+
												"</div>"+
											"</div>"+
										"</div>"+
									"</div>"+
									"</a>"+
									"<br>"+
									"";
					$("#findotherconnectionsdiv").append(tobeappend);
				}
			});
		}

	});
}


function loadconnections()
{
	$(".connectionsdiv").fadeIn();

	$.ajax({

		url      : 'connections-data.php',
		type     : 'POST',
		data     : 'loadconnections=1' + '&fid=' + fid,
		dataType : 'JSON',
		success  : function(data){

			$('.loading').fadeOut("slow",function(){
				if(data.length == 0)
				{
					var tobeappend = ""+
									"<div class='row'>"+
										"<div class='col-md-12 col-xs-12 col-lg-12'>"+
											"<div class='panel panel-default'>"+
												"<div class='panel-body'>"+
													"<h4><span class='fa fa-exclamation-circle'></span> No Connection to others.<h4>"+
												"</div>"+
											"</div>"+
										"</div>"+
									"</div>"+
									"";
					$("#connectionsdiv").append(tobeappend);
				}

				for(var i = 0; i < data.length; i++)
				{
					var connectedname = data[i].connectedname;
					var connectedimg = data[i].connectedimg;
					var connectedid = data[i].connectedid;

					var tobeappend = ""+
									"<a href='viewprofile.php?fid="+connectedid+"'>"+
									"<div class='row'>"+
										"<div class='col-md-12 col-xs-12 col-lg-12' style='padding-bottom:10px; padding-left:0px; padding-right:0px;'>"+
											"<div class='panel panel-default' style='margin-bottom:0px;'>"+
												"<div class='panel-body'style='padding-bottom:10px; padding-left:10px; padding-top:10px; padding-right:10px;'>"+
													"<table style='width:100%;'>"+
														"<tr>"+
															"<td style='width:20%;vertical-align:middle;text-align:left;'>"+
																"<img src='"+connectedimg+"' class='img img-responsive img-circle' style='height:40px; width:40px;' />"+
															"</td>"+

															"<td style='width:80%;vertical-align:middle;text-align:left;'>"+
																"<h5>"+connectedname+"</h5>"+
															"</td>"+
														"</tr>"+
													"</table>"+
												"</div>"+
											"</div>"+
										"</div>"+
									"</div>"+
									"</a>"+

									"";
					$("#connectionsdiv").append(tobeappend);
				}

			});
		}

	});
}

$(document).on('click','.cancelrequest',function(){
	var aa = $(this);

	var followingid = aa.attr('id');

	$.ajax({
		url     : 'connections-data.php',
		type    : 'POST',
		data    : 'cancelrequest=1' + '&fid=' + fid + '&followingid=' + followingid,
		success : function(data){
			$(".connectionrequestdiv"+followingid).fadeOut();
		}

	})
})

$(document).on('click','.rejectrequest',function(){
	var aa = $(this);

	var followingid = aa.attr('id');

	$.ajax({
		url     : 'connections-data.php',
		type    : 'POST',
		data    : 'cancelrequest=1' + '&fid=' + fid + '&followingid=' + followingid,
		success : function(data){
			$(".connectionrequestdiv"+followingid).fadeOut();
		}

	})
})

$(document).on('click','.approverequest',function(){
	var aa = $(this);

	var followingid = aa.attr('id');

	$.ajax({
		url     : 'connections-data.php',
		type    : 'POST',
		data    : 'approverequest=1' + '&fid=' + fid + '&followingid=' + followingid,
		success : function(data){
			$(".connectionrequestdiv"+followingid).fadeOut();

			// $("#connectionsdiv").empty();
			// loadconnections();
			//loadrequest();
		}

	})
})




$(document).on('click','.connectionstopbtn',function(){
	$(".connectionstopbtn").addClass('active');
	$(".requesttopbtn").removeClass('active');
	$(".suggestionstopbtn").removeClass('active');

	$("#requestdiv").empty();
	$("#connectionsdiv").empty();
	$("#findotherconnectionsdiv").empty();
	loadconnections();
})

$(document).on('click','.requesttopbtn',function(){
	$(".connectionstopbtn").removeClass('active');
	$(".requesttopbtn").addClass('active');
	$(".suggestionstopbtn").removeClass('active');

	$("#requestdiv").empty();
	$("#connectionsdiv").empty();
	$("#findotherconnectionsdiv").empty();
	loadrequest();
})

$(document).on('click','.suggestionstopbtn',function(){
	$(".connectionstopbtn").removeClass('active');
	$(".requesttopbtn").removeClass('active');
	$(".suggestionstopbtn").addClass('active');

	$("#requestdiv").empty();
	$("#connectionsdiv").empty();
	$("#findotherconnectionsdiv").empty();
	loadteacheryoumayknow();
})
