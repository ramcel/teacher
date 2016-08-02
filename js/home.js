$(window).scroll(function() {
	if($(window).scrollTop() + $(window).height() == $(document).height()) {
		loadmorecontent();
   	}
});


$(document).ready(function() {
  	$("#attachement").on('change', function() {
          //Get count of selected files
          var countFiles = $(this)[0].files.length;
          var imgPath = $(this)[0].value;
          var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
          var image_holder = $("#image-holder");
          image_holder.empty();
          if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {

          	image_holder.prepend("<br><br>");

            if (typeof(FileReader) != "undefined") {
              //loop for each file selected for uploaded.
              for (var i = 0; i < countFiles; i++)
              {
                var reader = new FileReader();
                reader.onload = function(e) {
                  $("<img />", {
                    "src": e.target.result,
                    "class": "img img-responsive thumbnail",
                    "style": ''
                  }).appendTo(image_holder);

                  	image_holder.show();
                }
                reader.readAsDataURL($(this)[0].files[i]);
              }


            } else {
              alert("This browser does not support FileReader.");
            }
          } else {
            alert("Pls select only images");
          }
        });
      });

var fid = $("#fid").val();
var fbname = $("#fbname").val();
var fbimg = $("#fbimg").val();

loadfeed();
recentrefresh();

function openAttachment() {
  document.getElementById('attachement').click();
}

function fileSelected(input){
  document.getElementById('btnAttachment').value = "File: " + input.files[0].name
}

function recentrefresh()
{
    var refresh=1000; // Refresh rate in milli seconds
    mytime=setTimeout('recentid()',refresh)
}

function recentid()
{
	recentrefresh();
	var recentid = $("#lastpostid").val();


		$.ajax({
			url     : 'home-data.php',
			type    : 'POST',
			data    : 'testrecentid=1' + '&fid=' + fid,
			success : function(data)
			{
				if(data != recentid)
				{
					loadnewfeed();
				}
			}
		});
}

function loadnewfeed()
{
	var recentid = $("#lastpostid").val();

	$.ajax({
		url      : 'home-data.php',
		type     : 'POST',
		data     : 'loadnewfeed=1' + '&fid=' + fid + '&recentid=' + recentid,
		dataType : 'JSON',
		success  : function(data)
		{
			if($("#feed").text() == "You don't have post yet.")
			{
				$("#feed").empty();
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

				var filediv;
				var urldiv;
				var deletebtn;
				var fbimgname;

				var likes = data[i].likes;
				var likesclass = data[i].likesclass;
				var comments = data[i].comments;

				if(filepath == "")
				{
					filediv = "";
				}
				else
				{
					//	IF THE FILE IS IMAGE
					if(fileextension == 'jpg' || fileextension == 'png' || fileextension == 'gif' || fileextension == 'jpeg' )
					{
						filediv = "<center><img src='"+filepath+"' class='img img-responsive' /></center><br>";
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
									"<img src='otherimg/defurlimg.jpg' class='img img-responsive' alt='"+urlimage+"'/>"+
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
					deletebtn = "<a class='deletepostbtn' style='float:right;padding-right:10px;' id='"+postid+"'><span class='glyphicon glyphicon-remove' style='margin-top: 8px;'></span></a>";
				}
				else
				{
					deletebtn = "";
				}

				if(fbid == fid)
				{
					fbimgname = ""+
								"<tr>"+
									"<td style='vertical-align:middle;margin-left:10px;width:0%;padding:13px;'>"+

										"<a href='profile.php?'>"+
											"<img class='img img-circle' style='height:50px; width:50px;' src='"+ fbimg +"' />"+
										"</a>"+
									"</td>"+

									"<td style='vertical-align:middle;margin-left:10px;width:100%;padding:5px;'>"+

										deletebtn +

										"<a href='profile.php' style='font-weight:bold;color:#365899;font-weight:bold;'>"+
											"<h5 style='margin-top: 0px;'><b>"+ fbname + "</b></h5>" +
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
							                	"<img class='img img-circle' style='height:50px; width:50px;' src='"+ fbimg +"' />"+
							              	"</a>"+
							            "</td>"+

							            "<td style='vertical-align:middle;margin-left:10px;width:100%;padding:5px;'>"+
							              	"<a href='viewprofile.php?fid="+fbid+"' style='font-weight:bold;color:#365899;font-weight:bold;'>"+
							                "<h5 style='margin-top: 0px;'><b>"+ fbname + "</b></h5>" +
							              	"</a>"+
							              	"<p style='font-size:11px;color:#90949c;'>"+ datepost + "</p>" +
							            "</td>"+
						          	"</tr>";
				}

				var tobeappend = ""+
									"<div class='row postingdiv postdiv"+postid+"' id='"+postid+"' style='margin-bottom:5px;'>"+
										"<div class='col-md-12 col-xs-12'>"+
											"<div class='panel panel-default' style='padding-bottom:0px; margin-bottom:1px; margin-top:1px;'>"+
												"<div class='panel-body' style='padding-bottom:0px;padding-top: 5px;'>"+

													"<div class='row'>"+

														"<table style='width:100%;padding:5px;'>"+
															fbimgname +

															"<tr>"+
																"<td colspan='2' style='text-align:left;padding:1px; background:white;'>"+
																	"<p style='word-wrap: break-word;margin-left:10px;'>"+post+"</p>"+
																	filediv+
																	urldiv+
																"</td>"+
															"</tr>"+

															"<tr>"+
																"<td colspan='2' style='text-align:left;padding:1px; background:white;'>"+
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
													"</i><hr><button style='border-style:none;' class='col-xs-6 col-md-6 col-lg-6 btn btn-default "+likesclass+"' id = '"+postid+"'><img src='otherimg/like.png'  height='32px' width='32px'> Like</button>"+
													"<a href='viewcomment.php?postid="+postid+"' style='border-style:none;' class='col-xs-6 col-md-6 col-lg-6 btn btn-default'><img src='otherimg/comment.png'  height='32px' width='32px'> Comment</a>"+

												"</div>"+


											"</div>"+
										"</div>"+
									"</div>"+

									"";
					$("#feed").prepend(tobeappend);
					$("#lastpostid").val(postid);
			}
		}
	})


}

function loadfeed()
{
	$.ajax({
		url      : 'home-data.php',
		type     : 'POST',
		data     : 'loadfeed=1' + '&fid=' + fid,
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
						filediv = "<center><img src='"+filepath+"' class='img img-responsive' /></center><br>";
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
									"<img src='otherimg/defurlimg.jpg' class='img img-responsive' alt='"+urlimage+"' style='position:relative;left:0px;' />"+
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
					deletebtn = "<a class='deletepostbtn' style='float:right;padding:10px;' id='"+postid+"'><span class='glyphicon glyphicon-remove' style='margin-top: 8px;'></span></a>";
				}
				else
				{
					deletebtn = "";
				}

				if(fbid == fid)
				{
					fbimgname = ""+
								"<tr>"+
									"<td style='vertical-align:middle;margin-left:10px;width:0%;padding:13px;'>"+

										"<a href='profile.php?'>"+
											"<img class='img img-circle' style='height:50px; width:50px;' src='"+ fbimg +"' />"+
										"</a>"+
									"</td>"+

									"<td style='vertical-align:middle;margin-left:10px;width:100%;padding:5px;'>"+

										deletebtn +

										"<a href='profile.php' style='font-weight:bold;color:#365899;'>"+
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
							                	"<img class='img img-circle' style='height:50px; width:50px;' src='"+ fbimg +"' />"+
							              	"</a>"+
							            "</td>"+

							            "<td style='vertical-align:middle;margin-left:10px;width:100%;padding:5px;'>"+
							              	"<a href='viewprofile.php?fid="+fbid+"' style='font-weight:bold;color:#365899;'>"+
							                "<h5 style='margin-top: 0px;'><b>"+ fbname + "</b></h5>" +
							              	"</a>"+
							              	"<p style='font-size:11px;color:#90949c;'>"+ datepost + "</p>" +
							            "</td>"+
						          	"</tr>";
				}

				var tobeappend = ""+
									"<div class='row postingdiv postdiv"+postid+"' id='"+postid+"' style='margin-bottom:5px;'>"+
										"<div class='col-md-12 col-xs-12'>"+
											"<div class='panel panel-default' style='padding-bottom:0px; margin-bottom:1px; margin-top:1px;'>"+
												"<div class='panel-body' style='padding-bottom:0px;padding-top: 5px;'>"+

													"<div class='row'>"+

														"<table style='width:100%;padding:5px;'>"+
															fbimgname +


															"<tr>"+
																"<td colspan='2' style='text-align:left;padding:1px; background:white;'>"+
																	"<p style='word-wrap: break-word; margin-left:10px;' class='postholder'>"+post+"</p>"+
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
													"</i><hr><button style='border-style:none;' class='col-xs-6 col-md-6 col-lg-6 btn btn-default "+likesclass+"' id = '"+postid+"'><img src='otherimg/like.png'  height='32px' width='32px'> Like</button>"+
													"<a href='viewcomment.php?postid="+postid+"' style='border-style:none;' class='col-xs-6 col-md-6 col-lg-6 btn btn-default'><img src='otherimg/comment.png'  height='32px' width='32px'> Comment</a>"+

												"</div>"+


											"</div>"+
										"</div>"+
									"</div>"+

									"";
					$("#feed").append(tobeappend);
			}

			var lastdivid = $(".postingdiv").attr('id');
			$("#lastpostid").val(lastdivid);
			$("#lowestposid").val(data[data.length - 1].postid);
		}
	});
}

function loadmorecontent()
{
	var lowestposid = $("#lowestposid").val();

	$.ajax({
		url      : 'home-data.php',
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
						filediv = "<center><img src='"+filepath+"' class='img img-responsive' /></center><br>";
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
					deletebtn = "<a class='deletepostbtn' style='float:right;padding-right:10px;' id='"+postid+"'><span class='glyphicon glyphicon-remove'></span></a>";
				}
				else
				{
					deletebtn = "";
				}

				if(fbid == fid)
				{
					fbimgname = ""+
								"<tr>"+
									"<td style='vertical-align:middle;margin-left:10px;width:0%;padding:13px;'>"+

										"<a href='profile.php?'>"+
											"<img class='img img-circle' style='height:50px; width:50px;' src='"+ fbimg +"' />"+
										"</a>"+
									"</td>"+

									"<td style='vertical-align:middle;margin-left:10px;width:100%;padding:5px;'>"+

										deletebtn +

										"<a href='profile.php' style='font-weight:bold;color:#365899;font-weight:bold;'>"+
											"<h5 style='margin-top: 0px;'><b>"+ fbname + "</b></h5>" +
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
							                	"<img class='img img-circle' style='height:50px; width:50px;' src='"+ fbimg +"' />"+
							              	"</a>"+
							            "</td>"+

							            "<td style='vertical-align:middle;margin-left:10px;width:100%;padding:5px;'>"+
							              	"<a href='viewprofile.php?fid="+fbid+"' style='font-weight:bold;color:#365899;font-weight:bold;'>"+
							                "<h5 style='margin-top: 0px;'><b>"+ fbname + "</b></h5>" +
							              	"</a>"+
							              	"<p style='font-size:11px;color:#90949c;'>"+ datepost + "</p>" +
							            "</td>"+
						          	"</tr>";
				}

				var tobeappend = ""+
									"<div class='row postingdiv postdiv"+postid+"' id='"+postid+"' style='margin-bottom:5px;'>"+
										"<div class='col-md-12 col-xs-12'>"+
											"<div class='panel panel-default' style='padding-bottom:0px; margin-bottom:1px; margin-top:1px;'>"+
												"<div class='panel-body' style='padding-bottom:0px;padding-top: 5px;'>"+

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
													"</i><hr><button style='border-style:none;' class='col-xs-6 col-md-6 col-lg-6 btn btn-default "+likesclass+"' id = '"+postid+"'><img src='otherimg/like.png'  height='32px' width='32px'> Like</button>"+
													"<a href='viewcomment.php?postid="+postid+"' style='border-style:none;' class='col-xs-6 col-md-6 col-lg-6 btn btn-default'><img src='otherimg/comment.png'  height='32px' width='32px'> Comment</a>"+

												"</div>"+


											"</div>"+
										"</div>"+
									"</div>"+

									"";
					$("#feed").append(tobeappend);
			}

			var lastdivid = $(".postingdiv").attr('id');
			$("#lastpostid").val(lastdivid);
			$("#lowestposid").val(data[data.length - 1].postid);
		}
	});
}

jQuery(function($){
   $("#searchbox").Watermark("Search");
});

$(document).on("submit",'#postform',function(e){
	e.preventDefault();

	var posttxt = $("#posttxt").val();
	var attachement = $("#attachement").val();

	if(posttxt == "" && attachement == "")
	{

	}
	else if(posttxt != "" && attachement != "")
	{
		$.ajax({
			url         : 'home-data.php',
			type        : 'POST',
			data        :  new FormData(this),
	        contentType : false,
	        cache       : false,
	        processData : false,
			beforeSend  : function(xhr){
				$("#savepost").text('Posting. . .');
			},
			success    : function(data){

				curImages = new Array();

				var ifthereisnopost = $("#feed").text();
				if(ifthereisnopost == 'You don\'t have post yet.')
				{
					$("#feed").text("");
					loadfeed();
				}



				$("#posttxt").val("");
				$("#img").val("");
				$("#image-holder").empty();
				$("#attachement").val("");

				$("#urlimage").attr('value',"");
				$("#urltitle").attr('value',"");
				$("#urldesc").attr('value',"");
				$("#urlurl").attr('value',"");

				$(".urlcontentholder").empty();
				var urlcontentholder = ""+
										"<div class='liveurl'>"+
	                                        "<div class='close' title='Entfernen'></div>"+
	                                        "<div class='inner'>"+
	                                            "<div class='image'></div>"+
	                                            "<div class='details'>"+
	                                                "<div class='info'>"+
	                                                    "<div class='title'></div>"+
	                                                    "<div class='description'></div> "+
	                                                    "<div class='url'></div>"+
	                                                "</div>"+
	                                                "<div class='video'></div>"+
	                                            "</div>"+
	                                        "</div>"+
	                                    "</div>"+
										"";
				$(".urlcontentholder").append(urlcontentholder);

				//$(".urlcontentholder").css('display','none');
				recentid();

				$("#savepost").text('Post');
			}
		});
	}
	else if(posttxt != "" || attachement != "")
	{

		$.ajax({
			url         : 'home-data.php',
			type        : 'POST',
			data        :  new FormData(this),
	        contentType : false,
	        cache       : false,
	        processData : false,
	        dataType    : 'JSON',
			beforeSend  : function(xhr){
				$("#savepost").text('Posting. . .');
			},
			success    : function(data){

				curImages = new Array();

				var ifthereisnopost = $("#feed").text();
				if(ifthereisnopost == 'You don\'t have post yet.')
				{
					$("#feed").text("");
					loadfeed();
				}

				$("#posttxt").val("");
				$("#img").val("");
				$("#image-holder").empty();
				$("#attachement").val("");

				$(".urlcontentholder").empty();
				var urlcontentholder = ""+
										"<div class='liveurl'>"+
	                                        "<div class='close' title='Entfernen'></div>"+
	                                        "<div class='inner'>"+
	                                            "<div class='image'></div>"+
	                                            "<div class='details'>"+
	                                                "<div class='info'>"+
	                                                    "<div class='title'></div>"+
	                                                    "<div class='description'></div> "+
	                                                    "<div class='url'></div>"+
	                                                "</div>"+
	                                                "<div class='video'></div>"+
	                                            "</div>"+
	                                        "</div>"+
	                                    "</div>"+
										"";
				$(".urlcontentholder").append(urlcontentholder);

				$("#urlimage").attr('value',"");
				$("#urltitle").attr('value',"");
				$("#urldesc").attr('value',"");
				$("#urlurl").attr('value',"");
				recentid();

				$("#savepost").text('Post');
			}
		});

	}
})

// Delete Post

// $(document).on('click','.deletepostbtn',function(){
// 	swal({
// 		title: "Are you sure?",
// 		text: "You will not be able to recover this post!",
// 		type: "warning",
// 		showCancelButton: true,
// 		confirmButtonColor: "#DD6B55",
// 		confirmButtonText: "Yes, delete it!",
// 		cancelButtonText: "No, cancel please!",
// 		closeOnConfirm: false,
// 		closeOnCancel: false
// 	},
//
// 	function(isConfirm){
// 		if (isConfirm){
// 			swal("Deleted!", "Your file has been deleted.", "success"+"<a id='delete'>");
// 		   }
// 			 else {
// 				 swal("Cancelled", "Your imaginary file is safe :)");
// 			 }
// 		 });
//
// });
//
//
//
// $(document).on("click",'.delete',function(){
// 	var postid = $(this).attr('id');
//
// 	$.ajax({
// 		url     : 'home-data.php',
// 		type    : 'POST',
// 		data    : 'deletepost=1' + '&postid=' + postid,
// 		success : function(data){
// 			$(".postdiv"+postid).fadeOut();
//
// 		}
// 	});
//
// })



$(document).on('click','.deletepostbtn',function(){
	var postid = $(this).attr('id');

	// $.ajax({
	// 	url     : 'home-data.php',
	// 	type    : 'POST',
	// 	data    : 'deletepost=1' + '&postid=' + postid,
	// 	success : function(data){
	// 		$(".postdiv"+postid).slideUp();
	// 	}
	// });

	var tobeappend = ""+
					"Are you sure you want to delete this post?<br><br>"+
					"<div style='float:right;'>"+
						"<button class='btn btn-danger deletepostyes' id='"+postid+"'>YES</button> "+
						"<button class='btn btn-warning deletepostno'>NO</button> "+
					"</div>"+
					"<br><br>"+
					"";

	$(".modal-dialog").addClass('modal-sm');
	$(".modal-header").css('display','none');
	$("#modalcontainer").append(tobeappend);
	$("#modal").modal();
})

$(document).on("click",'.deletepostno',function(){
	$("#modal").modal("hide");
})

$(document).on("click",'.deletepostyes',function(){
	var postid = $(this).attr('id');

	$.ajax({
		url     : 'home-data.php',
		type    : 'POST',
		data    : 'deletepost=1' + '&postid=' + postid,
		success : function(data){
			$(".postdiv"+postid).fadeOut();

			$("#modal").modal("hide");
		}
	});

})

$(document).on('click','.likepostbtn',function(){
	var postid = $(this).attr('id');
	var aa = $(this);

	$.ajax({
		url     : 'home-data.php',
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
		url     : 'home-data.php',
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
		url      : 'home-data.php',
		type     : 'POST',
		dataType : 'JSON',
		data     : 'loadlikes=1' + '&postid=' + postid + '&fid=' + fid,
		success  : function(data){
			if(data.length == 0)
			{
				$("#modalcontainer").append("<center><h3 style='color:#999;'><b>Be the first to like<b></h3></center>");
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
})
