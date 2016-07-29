$(window).scroll(function() {
	if($(window).scrollTop() + $(window).height() == $(document).height()) {
		loadmorecontent();
   	}
});

function getUrlParam(variable)
{
	var url = window.location.search.substring(1);
	var vars = url.split("&");
    for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

var profileid = getUrlParam('fid');
var fid = $("#fid").val();
var fbname = $("#fbname").val();
var fbimg = $("#fbimg").val();
var recommendationform = ""+
						"<div class='panel-default panel recommendationformdiv'>"+
						"<br>"+
							"<div class='panel-body'>"+

								"<form class='form-group' id='recommendationform'>"+
									"<div class='row'>"+
										"<div class='col-md-12 col-xs-12'>"+
											"<textarea style='resize:none;' id='recommendationtxt' class='form-control' placeholder='Your Recommendation here. . .' ></textarea>"+
										"</div>"+
									"</div>"+
									"<br>"+

									"<div class='row'>"+
										"<div class='col-md-12 col-xs-12'>"+
											"<button class='btn btn-primary btn-md sendrecommendationbtn' style='float:right;'><span class='glyphicon glyphicon-send'></span> Send Recommendation</button>"+
										"</div>"+
									"</div>"+
								"</form>"+

							"</div>"+
						"</div>"+
						"";


loadbasicinfo();

function loadmorecontent()
{
	var lowestposid = $("#lowestposid").val();

	$.ajax({
		url      : 'viewprofile-data.php',
		type     : 'POST',
		data     : 'loadmorecontent=1' + '&fid=' + fid + '&lowestposid=' + lowestposid,
		dataType : 'JSON',
		success  : function(data)
		{
			if(data.length == 0)
			{
				var tobeappend = "<center><h4 style='color:#999;'><br>You don't have post yet.</h4></center>";

				$("#feed").append(tobeappend);
				$("#lastpostid").val(0);
				recentid();
			}

			for(var i = 0; i < data.length; i++)
			{

				var postid = data[i].postid;
				var fbid = data[i].fbid;
				var fbimg = data[i].fdimg;
				var fbname = data[i].fdname;
				var post = data[i].post;
				var datepost = data[i].datepost;

				var filerealname = data[i].filerealname;
				var filerename = data[i].filerename;
				var fileextension = data[i].fileextension;
				var filepath = data[i].filepath;

				var urlurl = data[i].urlurl;
				var urltitle = data[i].urltitle;
				var urldesc = data[i].urldesc;
				var urlimage = data[i].urlimage;

				var likes = data[i].likes;
				var likesclass = data[i].likesclass;
				var comments = data[i].comments;

				var filediv;
				var urldiv;
				var deletebtn;
				var fbimgname;

				if(filepath == "")
				{
					filediv = "";
				}
				else
				{
					//	IF THE FILE IS IMAGE
					if(fileextension == 'jpg' || fileextension == 'png' || fileextension == 'gif' || fileextension == 'jpeg' )
					{
						filediv = "<center><img src='"+filepath+"' class='img img-responsive' /></center>";
					}

				}


				if(urlurl == "")
				{
					urldiv = "";
				}
				else
				{
					if(urlimage == "")
					{
						urldiv = ""+
									"<center><img src='otherimg/defurlimg.jpg' class='img img-responsive' alt='"+urlimage+"' /></center>"+
									"<a href='"+urlurl+"' target='_blank'>"+
										"<b>"+urltitle+"</b><br><br>"+
										urldesc+
									"</a>"+
									"";
					}
					else
					{
						urldiv = ""+
									"<center><img src='"+urlimage+"' class='img img-responsive' alt='"+urlimage+"' /></center>"+
									"<a href='"+urlurl+"' target='_blank'>"+
										"<b>"+urltitle+"</b><br><br>"+
										urldesc+
									"</a>"+
									"";
					}
				}

				if(fbid == fid)
				{
					fbimgname = ""+
								"<tr>"+
									"<td style='vertical-align:middle;margin-left:10px;width:0%;padding:13px;'>"+

										"<a href='profile.php?'>"+
											"<img class='img' style='height:50px; width=50px;' src='"+ fbimg +"' />"+
										"</a>"+
									"</td>"+

									"<td style='vertical-align:middle;margin-left:10px;width:100%;padding:5px;'>"+

										"<a href='profile.php' style='font-weight:bold;color:#365899;font-weight:bold;'>"+
											"<h5><b>"+ fbname + "</b></h5>" +
										"</a>"+
										"<p style='font-size:11px;color:#90949c;'>"+ datepost + "</p>" +
									"</td>"+
								"</tr>";
				}
				else
				{
					fbimgname = ""+
						          	"<tr>"+
							            "<td style='vertical-align:middle;margin-left:10px;width:0%;padding:13px;'>"+
							              	"<a href='viewprofile.php?fid="+fbid+"'>"+
							                	"<img class='img' style='height:50px; width=50px;' src='"+ fbimg +"' />"+
							              	"</a>"+
							            "</td>"+

							            "<td style='vertical-align:middle;margin-left:10px;width:100%;padding:5px;'>"+
							              	"<a href='viewprofile.php?fid="+fbid+"' style='font-weight:bold;color:#365899;font-weight:bold;'>"+
							                "<h5><b>"+ fbname + "</b></h5>" +
							              	"</a>"+
							              	"<p style='font-size:11px;color:#90949c;'>"+ datepost + "</p>" +
							            "</td>"+
						          	"</tr>";
				}

				var tobeappend = ""+
									"<div class='row postingdiv postdiv"+postid+"' id='"+postid+"' style='margin-bottom:5px;'>"+
										"<div class='col-md-12 col-xs-12'>"+
											"<div class='panel panel-default' style='padding-bottom:0px; margin-bottom:1px; margin-top:1px;'>"+
												"<div class='panel-body' style='padding-bottom:0px;'>"+

													"<div class='row'>"+

														"<table style='width:100%;padding:5px;'>"+
															fbimgname +

															"<tr>"+
																"<td colspan='2' style='text-align:left;padding:1px; background:white;'>"+
																	"<p style='word-wrap: break-word; margin-left:10px;'>"+post+"</p>"+
																	filediv+
																	urldiv+
																"</td>"+
															"</tr>"+

															"<tr>"+
																"<td colspan='2' style='text-align:left;padding:1px; background:white;'>"+
																	"<br>"+
																	"<div class='col-xs-2 col-md-2 col-lg-2' style='font-size:11px;padding-bottom:5px; '>"+
																		"<a style='font-size:11px;' data-toggle='modal' data-target='#modal' class='likesmodalopener' id='"+postid+"'>"+
																			"<label class='likesdiv"+postid+"'>"+likes+"</label> Likes"+
																		"</a>"+
																	"</div>"+

																	"<div class='col-xs-4 col-md-2 col-lg-2' style='font-size:11px;'>"+
																		"<label class='commentsdiv'>"+comments+"</label> Comments"+
																	"</div>"+
																"</td>"+
															"</tr>"+
														"</table>"+

													"</div>"+

													//"<i class='glyphicon glyphicon-thumbs-up' style=color:blue;>
													"</i><hr><button style='border-style:none;' class='col-xs-6 col-md-6 col-lg-6 btn btn-default "+likesclass+"' id = '"+postid+"'><i class='glyphicon glyphicon-thumbs-up'></i> Like</button>"+
													"<a href='viewcomment.php?postid="+postid+"' style='border-style:none;' class='col-xs-6 col-md-6 col-lg-6 btn btn-default'><i class='glyphicon glyphicon-comment'></i> Comment</a>"+

												"</div>"+


											"</div>"+
										"</div>"+
									"</div>"+

									"";
					$("#timelinediv").append(tobeappend);
			}

			var lastdivid = $(".postingdiv").attr('id');
			$("#lastpostid").val(lastdivid);
			$("#lowestposid").val(data[data.length - 1].postid);
		}
	});
}

function loadrecommendation()
{

	$.ajax({
		url      : 'viewprofile-data.php',
		type     : 'POST',
		data     : 'loadrecommendation=1' + '&fid=' + profileid,
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
											"No Recommendation.<br><br>"+
										"</h4>"+
										"</center>"+
									"</div>"+
								"</div>"+
								"";

				$(".recommendationcontainer").append(tobeappend);

			}

			for(var i = 0; i < data.length; i++)
			{

				var fbimg = data[i].fdimg;
				var fbname = data[i].fdname;
				var recommendation = data[i].recommendation;
				var datesent = data[i].datesent;

				var tobeappend = ""+
									"<div class='col-xs-12 col-md-12 col-lg-12'>"+
										"<div class='panel-default panel' style='border-radius:0px;margin-bottom:0px;'>"+
											"<div class='panel-body' style='padding-bottom:0px;'>"+
												"<b>"+
													"<div class='col-xs-3 col-md-1 col-lg-1'>"+
														"<img class='img' style='height:50px;' src='"+ fbimg +"' />"+
													"</div>"+

													"<div class='col-xs-9 col-md-11 col-lg-11'>"+
														//"<a style='text-indent:10px;' href='viewprofile.php?fid="+fid+"'>"+fbname+"</a>"+
														fbname+
														"<br>"+
														"<p style='font-size:10px;'>"+datesent+"</p>"+
													"</div>"+
												"</b>"+

												"<br><br><br><hr><br>"+
												"<p style='font-size:13px;text-indent:10px;'>"+
													recommendation+
												"</p>"+
											"</div>"+
										"</div>"+
									"</div>"+
								"";

				var tobeappend = ""+
									"<div class='row'>"+
										"<div class='col-md-12 col-xs-12'>"+
											"<div class='panel panel-default'>"+
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
					$(".recommendationcontainer").append(tobeappend);
			}

			if(data.length > 3)
			{
				var tobeappend = ""+
									"<div class='col-xs-12 col-md-12 col-lg-12'>"+
										"<div class='panel-default panel' style='border-radius:0px;margin-bottom:0px;'>"+
											"<div class='panel-body' style='padding-bottom:0px;padding-top:0px;'>"+
												"<center><a href='#'>See All Recommendation</a></center>"+
											"</div>"+
										"</div>"+
									"</div>"+
									"";
				$(".recommendationcontainer").prepend(tobeappend);
			}
		}
	})
}

function loadtimeline()
{

	$.ajax({
		url      : 'viewprofile-data.php',
		type     : 'POST',
		data     : 'loadtimeline=1' + '&fid=' + profileid,
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
											"No Post Yet.<br><br>"+
										"</h4>"+
										"</center>"+
									"</div>"+
								"</div>"+
								"";

				$("#timelinediv").append(tobeappend);

			}

			for(var i = 0; i < data.length; i++)
			{

				var postid = data[i].postid;
				var fbid = data[i].fbid;
				var fbimg = data[i].fdimg;
				var fbname = data[i].fdname;
				var post = data[i].post;
				var datepost = data[i].datepost;

				var filerealname = data[i].filerealname;
				var filerename = data[i].filerename;
				var fileextension = data[i].fileextension;
				var filepath = data[i].filepath;

				var urlurl = data[i].urlurl;
				var urltitle = data[i].urltitle;
				var urldesc = data[i].urldesc;
				var urlimage = data[i].urlimage;

				var likes = data[i].likes;
				var likesclass = data[i].likesclass;
				var comments = data[i].comments;

				var filediv;
				var urldiv;
				var deletebtn;
				var fbimgname;

				if(filepath == "")
				{
					filediv = "";
				}
				else
				{
					//	IF THE FILE IS IMAGE
					if(fileextension == 'jpg' || fileextension == 'png' || fileextension == 'gif' || fileextension == 'jpeg' )
					{
						filediv = "<center><img src='"+filepath+"' class='img img-responsive' /></center>";
					}

				}


				if(urlurl == "")
				{
					urldiv = "";
				}
				else
				{
					if(urlimage == "")
					{
						urldiv = ""+
									"<center><img src='otherimg/defurlimg.jpg' class='img img-responsive' alt='"+urlimage+"' /></center>"+
									"<a href='"+urlurl+"'>"+
										"<b>"+urltitle+"</b><br><br>"+
										urldesc+
									"</a>"+
									"";
					}
					else
					{
						urldiv = ""+
									"<center><img src='"+urlimage+"' class='img img-responsive' alt='"+urlimage+"' /></center>"+
									"<a href='"+urlurl+"'>"+
										"<b>"+urltitle+"</b><br><br>"+
										urldesc+
									"</a>"+
									"";
					}
				}

				if(fbid == fid)
				{
					fbimgname = ""+
								"<tr>"+
									"<td style='vertical-align:middle;margin-left:10px;width:0%;padding:13px;'>"+
										"<a href='profile.php' style='font-weight:bold;color:black;'>"+
											"<img class='img' style='height:50px;' src='"+ fbimg +"' />"+
										"</a>"+
									"</td>"+

									"<td style='vertical-align:middle;margin-left:10px;width:100%;padding:5px;'>"+
										"<a href='profile.php' style='font-weight:bold;color:black;'>"+
											"<h5>"+ fbname + "</h5>" +
										"</a>"+
										"<p style='font-size:11px;'>"+ datepost + "</p>" +
									"</td>"+
								"</tr>";
				}
				else
				{
					fbimgname = ""+
								"<tr>"+
									"<td style='vertical-align:middle;text-align:center;width:20%;padding:13px;'>"+
										"<a href='viewprofile.php?fid="+fbid+"' style='font-weight:bold;color:black;'>"+
											"<img class='img' style='height:50px;' src='"+ fbimg +"' />"+
										"</a>"+
									"</td>"+

									"<td style='vertical-align:middle;text-align:left;width:80%;padding:5px;'>"+
										"<a href='viewprofile.php?fid="+fbid+"' style='font-weight:bold;color:black;'>"+
											"<h5>"+ fbname + "</h5>" +
										"</a>"+
										"<p style='font-size:11px;'>"+ datepost + "</p>" +
									"</td>"+
								"</tr>";
				}

				var tobeappend = ""+
									"<div class='row postingdiv postdiv"+postid+"' id='"+postid+"'>"+
										"<div class='col-md-12 col-xs-12'>"+
											"<div class='panel panel-default' style='padding-bottom:0px; margin-bottom:1px; margin-top:1px;'>"+
												"<div class='panel-body'>"+

													"<div class='row'>"+

														"<table style='width:100%;padding:5px;'>"+
															fbimgname +


															"<tr>"+
																"<td colspan='2' style='text-align:left;padding:1px; background:white;'>"+
																	"<p style='word-wrap: break-word; padding:15px;'>"+post+"</p>"+
																	filediv+
																	urldiv+
																"</td>"+
															"</tr>"+

															"<tr>"+
																"<td colspan='2' style='text-align:left;padding:1px; background:white;'>"+
																	"<br>"+
																	"<div class='col-xs-2 col-md-2 col-lg-2' style='font-size:11px;'>"+
																		"<a style='font-size:11px;' data-toggle='modal' data-target='#modal' class='likesmodalopener' id='"+postid+"'>"+
																			"<label class='likesdiv"+postid+"'>"+likes+"</label> Likes"+
																		"</a>"+
																	"</div>"+

																	"<div class='col-xs-4 col-md-2 col-lg-2' style='font-size:11px;'>"+
																		"<label class='commentsdiv'>"+comments+"</label> Comments"+
																	"</div>"+
																"</td>"+
															"</tr>"+
														"</table>"+

													"</div>"+
													//"<i class='glyphicon glyphicon-thumbs-up' style=color:blue;>
													"</i><hr><button style='border-style:none;' class='col-xs-6 col-md-6 col-lg-6 btn btn-default likepostbtn' id = '"+postid+"'><i class='glyphicon glyphicon-thumbs-up'></i> Like</button>"+
													"<a href='viewcomment.php?postid="+postid+"' style='border-style:none;' class='col-xs-6 col-md-6 col-lg-6 btn btn-default'><i class='glyphicon glyphicon-comment'></i> Comment</a>"+

												"</div>"+


											"</div>"+
										"</div>"+
									"</div>"+
									"<br>"+
									"";
				$("#timelinediv").append(tobeappend);
				$("#lowestposid").val(data[data.length - 1].postid);
			}
		}
	});
}

function loaddegree()
{
	$.ajax({

		url      : 'viewprofile-data.php',
		type     : 'POST',
		data     : 'loaddegree=1' + '&fid=' + profileid,
		dataType : 'JSON',
		success  : function(data)
		{
			for(var i = 0; i < data.length; i++)
			{
				var degree = data[i].degree;
				var degreeid = data[i].degreeid;
				var yearfrom = data[i].yearfrom;
				var yearto = data[i].yearto;

				var tobeappend = ""+
								"<div class='well col-xs-12 col-md-12 welldegree"+degreeid+"'>"+

									"<table style='width:100%;'>"+
										"<tr>"+
											"<td style='width:90%;'>"+
												"<h4>"+
												degree+
												"</h4>"+
												"<h5>"+
												yearfrom +
												" - "+
												yearto+
												"</h5>"+
											"</td>"+
										"</tr>"+
									"</table>"
								"</div>"+
								"";

				$(".degreecontainer").append(tobeappend);
			}
		}

	});
}

function loadachievement()
{
	$.ajax({

		url      : 'viewprofile-data.php',
		type     : 'POST',
		data     : 'loadachievement=1' + '&fid=' + profileid,
		dataType : 'JSON',
		success  : function(data)
		{
			for(var i = 0; i < data.length; i++)
			{
				var achievementid = data[i].achievementid;
				var achievement = data[i].achievement;
				var yearawarded = data[i].yearawarded;

				var tobeappend = ""+
								"<div class='well col-xs-12 col-md-12 wellachievement"+achievementid+"'>"+
									"<table style='width:100%;'>"+
										"<tr>"+
											"<td style='width:90%;'>"+
												"<h4>"+
												achievement+
												"</h4>"+
												"<h5>"+
												yearawarded +
												"</h5>"+
											"</td>"+
										"</tr>"+
									"</table>"
								"</div>"+
								"";
				$(".achievementcontainer").append(tobeappend);
			}
		}

	});
}

function loadsubj()
{
	$.ajax({

		url      : 'viewprofile-data.php',
		type     : 'POST',
		data     : 'loadsubj=1' + '&fid=' + profileid,
		dataType : 'JSON',
		success  : function(data)
		{
			for(var i = 0; i < data.length; i++)
			{
				var subjid = data[i].subjid;
				var subject = data[i].subject;

				var tobeappend = ""+
								"<div class='well col-xs-12 col-md-12 wellsubj"+subjid+"'>"+
									"<table style='width:100%;'>"+
										"<tr>"+
											"<td style='width:90%;'>"+
												"<h4>"+
												subject+
												"</h4>"+
											"</td>"+
										"</tr>"+
									"</table>"
								"</div>"+
								"";
				$(".subjectcontainer").append(tobeappend);
			}
		}

	});
}

function loadcollge()
{
	$.ajax({

		url      : 'viewprofile-data.php',
		type     : 'POST',
		data     : 'loadcollge=1' + '&fid=' + profileid,
		dataType : 'JSON',
		success  : function(data)
		{
			for(var i = 0; i < data.length; i++)
			{
				var collegename = data[i].collegename;
				var yearfrom = data[i].yearfrom;
				var yearto = data[i].yearto;

				var tobeappend = ""+
								"<div class='well col-xs-12 col-md-12'>"+

									"<table style='width:100%;'>"+
										"<tr>"+
											"<td style='width:90%;'>"+
												"<h4>"+
												collegename+
												"</h4>"+
												"<h5>"+
												yearfrom +
												" - "+
												yearto+
												"</h5>"+
											"</td>"+
										"</tr>"+
									"</table>"
								"</div>"+
								"";
				$(".collogecontainer").append(tobeappend);
			}
		}

	});
}

//LOAD THE PROFILE
function loadprofile()
{
	var connectionbtn = $(".followuser").text();

	if(connectionbtn == 'Connected')
	{
		$("#profiletab").prepend(recommendationform);
	}

	var profilediv = ""+
					"<!-- RECOMMENDATION -->"+
                    "<div class='panel panel-default'>"+
				  		"<div class='panel-heading'>"+
				  			"<h4 style='color:#337AB7;'><img src='otherimg/recommendation.png' height=25px width=25px> Recommendation</h4>"+
				  		"</div>"+

				  		"<div class='panel-body'>"+
				  			"<div class='recommendationcontainer'></div>"+
                        "</div>"+
				  	"</div>"+
				  	"<!-- END OF RECOMMENDATION -->"+

					"<!-- OCCUPATION -->"+
                    "<div class='panel panel-default'>"+
				  		"<div class='panel-heading'>"+
				  			"<h4 style='color:#337AB7;'><img src='otherimg/occupation.png' height=32px width=32px> Occupation</h4>"+
				  		"</div>"+

				  		"<div class='panel-body'>"+
				  			"<div class='collogecontainer'></div>"+
                        "</div>"+
				  	"</div>"+
				  	"<!-- END OF OCCUPATION -->"+

				  	"<!-- SUBJECT -->"+
                    "<div class='panel panel-default'>"+
				  		"<div class='panel-heading'>"+
				  			"<h4 style='color:#337AB7;'><img src='otherimg/book.png' height=32px width=32px> Subject</h4>"+
				  		"</div>"+

				  		"<div class='panel-body'>"+
				  			"<div class='subjectcontainer'></div>"+
				  		"</div>"+
				  	"</div>"+
				  	"<!-- END OF SUBJECT -->"+

				  	"<!-- ACHIEVEMENTS -->"+
                    "<div class='panel panel-default'>"+
				  		"<div class='panel-heading'>"+
				  			"<h4 style='color:#337AB7;'><img src='otherimg/medal.png' height=32px width=32px> Achivements / Awards</h4>"+
				  		"</div>"+

				  		"<div class='panel-body'>"+
				  			"<div class='achievementcontainer'></div>"+
				  		"</div>"+
				  	"</div>"+
				  	"<!-- END OF ACHIEVEMENTS -->"+

				  	"<!-- DEGREE -->"+
                    "<div class='panel panel-default'>"+
				  		"<div class='panel-heading'>"+
				  			"<h4 style='color:#337AB7;'><img src='otherimg/degree.png' height=32px width=32px> Degree</h4>"+
				  		"</div>"+

				  		"<div class='panel-body'>"+
				  			"<div class='degreecontainer'></div>"+
				  		"</div>"+
				  	"</div>"+
				  	"<!-- END OF DEGREE -->"+
					"";
	$("#profilediv").append(profilediv);

	loadcollge();
	loadsubj();
	loadachievement();
	loaddegree();
	loadrecommendation();
	loadtimeline();
}

//SELECT BASIC INFOMATION OF THE USER
function loadbasicinfo()
{
	$.ajax({

		url      : 'viewprofile-data.php',
		type     : 'POST',
		data     : 'loadbasicinfo=1' + '&profileid=' + profileid + '&fid=' + fid,
		dataType : 'JSON',
		success  : function(data)
		{
			var profileid = data.profileid;
			var profilename = data.profilename;
			var profileimg = data.profileimg;
			var buttonlabel = data.buttonlabel;
			var buttonbtn;



			if(buttonlabel == 'Connected')
			{
				buttonbtn = ""+
							"<a class='btn btn-default followuser'>"+buttonlabel+"</a>"+ " "+
							"<a href='chat.php' class='btn btn-default chat'>"+"Message"+"</a>"+
							"";
			}

			if(buttonlabel == 'Connect')
			{
				buttonbtn = ""+
							"<a class='btn btn-default followuser'>"+buttonlabel+"</a>"+
							"";

			}

			if(buttonlabel == 'requester')
			{
				buttonbtn = ""+
							"<a class='btn btn-default followuser'>Cancel Connection Request</a>"+
							"";
			}

			if(buttonlabel == 'approver')
			{
				buttonbtn = ""+
							"<div class='btn-group'>"+
							  	"<button type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>"+
							    	"Respond to Connection Request <span class='caret'></span>"+
							  	"</button>"+

							  	"<ul class='dropdown-menu'>"+
							    	"<li><a href='#' class='approverequest' id='"+profileid+"'>Approve</a></li>"+
							    	"<li><a href='#' class='cancelrequest' id='"+profileid+"'>Cancel</a></li>"+
							  	"</ul>"+
							"</div>"+
							"";
			}

			var tobeappend = ""+
							//"<div class='panel panel-default' style='background: #337ab7;'>"+
		                    	//"<div class='panel-body'>"+
		                    		"<div class='row' style='background: url(otherimg/bg.jpg);padding-top:20px;margin-left:0px;margin-right:0px;'>"+
		                    			"<div class='col-xs-12 col-md-12'>"+
		                    				"<center><img src='"+profileimg+"' class='img img-circle' style='height: 100px;width:100px;'/></center>"+
		                    			"</div>"+

		                    			"<div class='col-xs-12 col-md-12'>"+
		                    				"<center><h5 style='color:white;'>"+
		                    				profilename+
		                    				"<br><br>"+
		                    				"<div class='btndiv'>"+
		                    					buttonbtn +
		                    				"</div>"+
		                    				"</h5></center>"+
		                    			"</div>"+
		                    		"</div>"+
		                    	//"</div>"+
		                    //"</div>"+
							"";

			var tobeappend2 = ""+
							"<div class='row'>"+
		                    	//"<div class='panel panel-default'>"+
		                    		//"<div class='panel-body'>"+

		                    			"<ul class='nav nav-tabs'>"+
										    "<li style='width:50%;text-align:center;' id='profiletabbtn' class='active '><a data-toggle='tab' href='#profiletab'>Profile</a></li>"+
										    "<li style='width:50%;text-align:center;' id='timelinetabbtn'><a data-toggle='tab' href='#timelinetab'>Timeline</a></li>"+
										"</ul>"+

										"<div class='tab-content' style='padding:10px;background:white;border-left:1px solid #ddd;border-right:1px solid #ddd;border-bottom:1px solid #ddd;'>"+
											"<div id='profiletab' class='tab-pane fade in active'>"+
												"<br>"+
										    	"<div id='profilediv'></div>"+
										    "</div>"+

										    "<div id='timelinetab' class='tab-pane fade'>"+
										    	"<br>"+
										    	"<div id='timelinediv'></div>"+
										    "</div>"+
										"</div>"+

		                    		//"</div>"+
		                    	//"</div>"+
		                    "</div>"+
		                    "";

			$("#fbinfo").append(tobeappend);
			$("#profiletimelinerecommendationdiv").append(tobeappend2);
			loadprofile();
		}

	});
}

// $(document).on('click','#profile',function(){
// 	$("#profiletimelinerecommendationdiv").fadeOut().empty().fadeIn();
// 	loadprofile();
// })

// $(document).on('click','#timelinetabbtn',function(){
// 	$("#timelinediv").fadeOut().empty().fadeIn();
// 	loadtimeline();
// })

// $(document).on('click','#recommendation',function(){
// 	$("#profiletimelinerecommendationdiv").fadeOut().empty().fadeIn();
// 	loadrecommendation();

// 	var buttonlabel = $('.followuser').text();
// 	if(buttonlabel == 'Connected')
// 	{
// 		$("#profiletimelinerecommendationdiv").append(recommendationform);
// 	}
// })

$(document).on('click','.followuser',function(){
	var buttonlabel = $(this).text();

	if(buttonlabel == "Connect")
	{
		$.ajax({

			url      : 'viewprofile-data.php',
			type     : 'POST',
			data     : 'followuser=1' + '&profileid=' + profileid + '&fid=' + fid,
			success  : function(data)
			{
				$('.followuser').empty();
				$('.followuser').append("Cancel Connection Request");
				$(".followuser").css('color','#337ab7');
				$('chat').empty();
				//$("#profilediv").slideDown().prepend(recommendationform);
			}

		})
	}

	if(buttonlabel == "Connected" || buttonlabel == "Cancel Connection Request")
	{
		$.ajax({

			url      : 'viewprofile-data.php',
			type     : 'POST',
			data     : 'unfollowuser=1' + '&profileid=' + profileid + '&fid=' + fid,
			success  : function(data)
			{
				$('.followuser').empty();
				$('.followuser').append("Connect");
				$('.chat').hide();
				$(".followuser").css('color','black');
				$(".recommendationformdiv").slideUp().remove();
			}

		})
	}
})

$(document).on('submit','#recommendationform',function(e){
	e.preventDefault();

	var recommendationtxt = $('#recommendationtxt').val();

	if(recommendationtxt == "")
	{
		$('#recommendationtxt').css('border-color','red');
	}
	else
	{
		$('#recommendationtxt').css('border-color','#ccc');

		var dt = new Date($.now());

		var datesent = dt.getFullYear()+ '/' + (dt.getMonth()+1) + '/' + dt.getDate();
		var timesent = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

		$.ajax({

			url        : 'viewprofile-data.php',
			type       : 'POST',
			data       : 'sendrecommendation=1' + '&profileid=' + profileid + '&fid=' + fid + '&recommendation=' + recommendationtxt + '&datesent=' + datesent + '&timesent=' + timesent,
			beforeSend : function(xhr){
				$('.sendrecommendationbtn').text("Sending. . .");
			},
			success    : function(data)
			{
				$('.sendrecommendationbtn').empty("");
				$('.sendrecommendationbtn').append("<span class='glyphicon glyphicon-send'></span> Send Recommendation");
				$(".recommendationcontainer").empty();
				loadrecommendation();
				$('#recommendationtxt').val("");
			}

		})

	}
});

$(document).on('click','.cancelrequest',function(){
	var aa = $(this);

	var followingid = aa.attr('id');

	$.ajax({
		url     : 'viewprofile-data.php',
		type    : 'POST',
		data    : 'cancelrequest=1' + '&fid=' + fid + '&followingid=' + followingid,
		success : function(data){
			//$(".connectionrequestdiv"+followingid).fadeOut();

			$(".btndiv").empty();
			$(".btndiv").append("<a class='btn btn-default followuser'>Connect</a>");
		}

	})
})

$(document).on('click','.approverequest',function(){
	var aa = $(this);

	var followingid = aa.attr('id');

	$.ajax({
		url     : 'viewprofile-data.php',
		type    : 'POST',
		data    : 'approverequest=1' + '&fid=' + fid + '&followingid=' + followingid,
		success : function(data){
			// $(".connectionrequestdiv"+followingid).fadeOut();

			// $("#connectionsdiv").empty();
			// loadconnections();
			//loadrequest();

			$(".btndiv").empty();
			$(".btndiv").append("<a class='btn btn-default followuser'>Connected</a>");
		}

	})
})

$(document).on('click','.likepostbtn',function(){
	var postid = $(this).attr('id');
	var aa = $(this);

	$.ajax({
		url     : 'viewprofile-data.php',
		type    : 'POST',
		data    : 'likepost=1' + '&postid=' + postid + '&fid=' + fid,
		success : function(data){

			aa.removeClass('likepostbtn');
			aa.addClass('unlikepostbtn');

			$(".likesdiv"+postid).text("");
			$(".likesdiv"+postid).text(data);
		}
	});
})

$(document).on('click','.unlikepostbtn',function(){
	var postid = $(this).attr('id');
	var aa = $(this);

	$.ajax({
		url     : 'viewprofile-data.php',
		type    : 'POST',
		data    : 'unlikepost=1' + '&postid=' + postid + '&fid=' + fid,
		success : function(data){

			aa.removeClass('unlikepostbtn');
			aa.addClass('likepostbtn');

			$(".likesdiv"+postid).text("");
			$(".likesdiv"+postid).text(data);
		}
	});

})

$(document).on('click','.likesmodalopener',function(){

	var postid = $(this).attr('id');

	$('#modallabel').text('Likes');
	$("#modalcontainer").empty();

	$.ajax({
		url      : 'viewprofile-data.php',
		type     : 'POST',
		dataType : 'JSON',
		data     : 'loadlikes=1' + '&postid=' + postid + '&fid=' + fid,
		success  : function(data){
			if(data.length == 0)
			{

			}

			for(var i = 0; i < data.length; i++)
			{
				var fdid = data[i].fdid;
				var fdimg = data[i].fdimg;
				var fdname = data[i].fdname;
				var connectionstatus = data[i].connectionstatus;

				if(connectionstatus == 'you')
				{
					var connectionbtns = "";
				}

				if(connectionstatus == 'Connect')
				{
					var connectionbtns = "<button class='btn btn-primary btn-xs connect' id='"+fdid+"'>Connect</button>";
				}

				if(connectionstatus == 'approver')
				{
					var connectionbtns = ""+
										"<button class='btn btn-primary btn-xs connect' id='"+fdid+"'>Confirm</button> "+
										"<button class='btn btn-primary btn-xs connect' id='"+fdid+"'>Delete</button> ";
				}

				if(connectionstatus == 'requester')
				{
					var connectionbtns = "<button class='btn btn-primary btn-xs connect' id='"+fdid+"'>Cancel Request</button> ";
				}

				if(connectionstatus == 'Connected')
				{
					var connectionbtns = "<button class='btn btn-primary btn-xs' id='"+fdid+"' disabled>Connected</button> ";
				}

				var tobeappend = ""+
								"<div class=''>"+
												"<div class='row'>"+
													"<div class='col-xs-2 col-md-1 col-lg-1 ' style='text-align:left;'>"+
														"<img src='"+fdimg+"' class='img' style='height:40px;width:40px;' />"+
													"</div>"+

													"<div class='col-xs-4 col-md-5 col-lg-5 ' style='text-align:left;'>"+
														"<a href='viewprofile.php?fid="+fdid+"'>"+
															"<h5 style='font-size:12px;'>"+fdname+"</h5>"+
														"</a>"+
													"</div>"+

													"<div class='col-xs-5 col-md-6 col-lg-6 ' style='text-align:right;'>"+
														connectionbtns+
													"</div>"+
												"</div>"+
												"<br>"+
												"<hr>"+

								"</div>"+
								"<br>";

				$('#modalcontainer').prepend(tobeappend);

			}
		}
	})
})

$('#modal').on('hidden.bs.modal',function(){
	$("#modalcontainer").empty();
	$("#modallabel").text('');
});
