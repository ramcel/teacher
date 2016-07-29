

function counthowmanycomments()
{
	var count = $(".commentdiv").length;
	$(".commentsdiv").text(count);
}


var fid = $("#fid").val();
var postid = $("#postid").val();

loadpost();

function loadcomment()
{
	$.ajax({
		url : 'viewcomment-data.php',
	    type : 'POST',
	    data : 'loadcomment=1' + '&fid=' + fid + '&postid=' + postid,
	    dataType : 'JSON',
	    success : function(data){
	    	if(data.length == 0)
	    	{
				//var tobeappend = "<center><h4 style='color:#999;'>Be the first to comment.</h4></center>";
				//$("#commentdiv").append(tobeappend);
	    	}

	    	for(var i = 0; i < data.length; i++)
	    	{
	    	var commentid      = data[i].commentid;
				var fbid           = data[i].fbid;
				var fbimg          = data[i].fbimg;
				var fbname         = data[i].fbname;
				var comment        = data[i].comment;
				var datecomment    = data[i].datecomment;
				var attachment     = data[i].attachment;
				var attachmentdiv;
				var fbimgname;

				var tobeappend = ""+
								"<div class='row commentdiv commentdiv"+commentid+"'>"+
									"<div class='col-xs-12 col-md-12 col-lg-12'>"+
										"<div class='panel-default panel' style='background:#f6f7f9;border-radius:0px;margin-bottom:0px;border-color:transparent;'>"+
											"<div class='panel-body commentpanelbody' style='padding-bottom:0px;'>"+
												"<div class='col-xs-3 col-md-1 col-lg-1'>"+
												 	"<img class='img' style='height:40px;' src='"+ fbimg +"' />"+
												"</div>"+

												"<div class='col-xs-9 col-md-11 col-lg-11 commentboxdiv' style='word-break: break-all;'>"+
													"<b>"+
														"<a style='color:#365899;' href='viewprofile.php?fid="+fid+"'>"+fbname+"</a>"+
														"&nbsp;&nbsp;&nbsp;"+
													"</b>"+

													comment+
													"<br>"+
													"<p style='font-size:10px;color:#90949c;'>"+datecomment+"</p>"+
												"</div>"+
											"</div>"+
										"</div>"+
									"</div>"+
								"</div>"+
								"";

				$("#commentdiv").prepend(tobeappend);

	    	}
	    	$("#lastcommentid").val(commentid);
	    	recentid();

	    	counthowmanycomments();
	    }
	})
}

function loadpost()
{
	$.ajax({
		url : 'viewcomment-data.php',
	    type : 'POST',
	    data : 'loadpost=1' + '&fid=' + fid + '&postid=' + postid,
	    dataType : 'JSON',
	    success : function(data){

	    	var postid = data.postid;
				var fbid = data.fbid;
				var fbimg = data.fdimg;
				var fbname = data.fdname;
				var post = data.post;
				var datepost = data.datepost;

				var filerealname = data.filerealname;
				var filerename = data.filerename;
				var fileextension = data.fileextension;
				var filepath = data.filepath;

				var urlurl = data.urlurl;
				var urltitle = data.urltitle;
				var urldesc = data.urldesc;
				var urlimage = data.urlimage;

				var likes = data.likes;
				var comments = data.comments;

        var status = data.status;

				var filediv;
				var urldiv;
				var deletebtn;
				var fbimgname;

        if(status == 'notok')
        {
          var tobeappend = ""+
                          "<center>"+
                            "<h1><span class='glyphicon glyphicon-remove-circle'></span></h1>"+
                            "This post is already deleted by the User"+
                          "</center>"+
                          "";

          $("#postdiv").prepend(tobeappend);
        }

        if(status == 'ok')
        {
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
  					deletebtn = "<tr>"+
  									"<td colspan='2' style='text-align:right;padding-right:15px;'>"+
  										"<a class='deletepostbtn' id='"+postid+"'>X</a>"+
  									"</td>"+
  								"</tr>";
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
  										"<a href='profile.php' style='font-weight:bold;color:black;'>"+
  											"<img class='img' style='height:50px;' src='"+ fbimg +"' />"+
  										"</a>"+
  									"</td>"+

  									"<td style='vertical-align:middle;margin-left:10px;width:100%;padding:5px;'>"+
  										"<a href='profile.php' style='color:#365899;'>"+
  											"<h5>"+"<b>"+ fbname +"</b>"+ "</h5>" +
  										"</a>"+
  										"<p style='font-size:11px;color:#90949c;'>"+ datepost + "</p>" +
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
  										"<a href='viewprofile.php?fid="+fbid+"' style='color:#365899;'>"+
  											"<h5>"+"<b>"+ fbname +"</b>"+ "</h5>" +
  										"</a>"+
  										"<p style='font-size:11px;color:#90949c;'>"+ datepost + "</p>" +
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
  															deletebtn+
  															fbimgname +


  															"<tr>"+
  																"<td colspan='2' style='text-align:left;padding:1px; background:white;'>"+
  																	"<p style='word-wrap: break-word; padding:15px;'>"+post+"</p>"+
  																	filediv+
  																	urldiv+
  																	"<br><br>"+

  																	"<div class='col-xs-3 col-md-2 col-lg-2' style='font-size:11px;'>"+
  																		"<a style='font-size:11px;' data-toggle='modal' data-target='#modal' class='likesmodalopener' id='"+postid+"'>"+
  																			"<label class='likesdiv"+postid+"'>"+likes+"</label> Likes"+
  																		"</a>"+
  																	"</div>"+

  																	"<div class='col-xs-4 col-md-2 col-lg-2' style='font-size:11px;'>"+
  																		"<label class='commentsdiv'>"+comments+"</label> Comments"+
  																	"</div>"+
  																"</td>"+
  															"</tr>"+

  															"<tr>"+
  																"<td colspan='2'>"+
  																	"<form id='commentform'>"+
  																		"<div class='col-xs-10 col-md-11 col-lg-11'>"+
  																			"<input type='text' class='form-control' id='commenttxt' style='width:100%;'>"+
  																		"</div>"+

  																		"<div class='col-xs-2 col-md-1 col-lg-1'>"+
  																			"<button style='width:100%; outline:none;' type='submit' class='btn btn-primary sendcomment'><span class='glyphicon glyphicon-send'></span></button>"+
  																		"</div>"+
  																	"</form>"+
  																"</td>"+
  															"</tr>"+
  														"</table>"+
  														"<br>"+
  													"</div>"+


  													"<div class='loadingbox panel panel-default' style='display: none'>"+
  							                            "<div class='panel-body'>"+
  							                                "Uploading. . ."+
  							                            "</div>"+
  							                        "</div>"+
  							                        "<div id='commentdiv'></div>"+
  												"</div>"+


  											"</div>"+
  										"</div>"+
  									"</div>"+
  									"<br>"+
  									"";

  	        		$("#postdiv").prepend(tobeappend);
  					    loadcomment();

  	       }
        }


	})
}

$(document).on('submit','#commentform',function(e){
	e.preventDefault();

	var comment = $("#commenttxt").val();

	if(comment == "")
	{
		$("#commenttxt").css('border-bottom','1px solid red');
	}
	else
	{
		$("#commenttxt").css('border-bottom','1px solid transparent');

		$.ajax({

			url : 'viewcomment-data.php',
			data : 'sendcomment=1' + '&fid=' + fid + '&postid=' + postid + '&comment=' + comment,
			type : 'POST',
			beforeSend : function(xhr){
				$(".sendcomment").attr('disabled','');
			},
			success : function(data){
				$(".sendcomment").removeAttr('disabled');
				$("#lastcommentid").val(data-1);
				$("#commenttxt").val("");
				recentid();
			}

		});
	}
})

function recentrefresh()
{
    var refresh=1000; // Refresh rate in milli seconds
    mytime=setTimeout('recentid()',refresh)
}

function recentid()
{
	recentrefresh();
	var recentid = $("#lastcommentid").val();

	$.ajax({
		url     : 'viewcomment-data.php',
		type    : 'POST',
		data    : 'testrecentid=1' + '&postid=' + postid,
		success : function(data)
		{
			if(data != recentid)
			{
				loadnewcomment();
			}
		}
	});
}

function loadnewcomment()
{
	var recentid = $("#lastcommentid").val();

	$.ajax({
		url : 'viewcomment-data.php',
	    type : 'POST',
	    data : 'loadnewcomment=1' + '&postid=' + postid + '&recentid=' + recentid ,
	    dataType : 'JSON',
	    success : function(data){
	    	if(data.length == 0)
	    	{
				//var tobeappend = "<center><h4 style='color:#999;'>Be the first to comment.</h4></center>";
				//$("#commentdiv").append(tobeappend);
	    	}

	    	for(var i = 0; i < data.length; i++)
	    	{
	    		var commentid = data[i].commentid;
				var fbid = data[i].fbid;
				var fbimg = data[i].fbimg;
				var fbname = data[i].fbname;
				var comment = data[i].comment;
				var datecomment = data[i].datecomment;
				var attachment = data[i].attachment;
				var attachmentdiv;
				var fbimgname;

				var tobeappend = ""+
								"<div class='row commentdiv commentdiv"+commentid+"'>"+
									"<div class='col-xs-12 col-md-12 col-lg-12'>"+
										"<div class='panel-default panel' style='background:#f6f7f9;border-radius:0px;margin-bottom:0px;border-color:transparent'>"+
											"<div class='panel-body' style='padding-bottom:0px;'>"+
												"<div class='col-xs-3 col-md-1 col-lg-1'>"+
												 	"<img class='img' style='height:40px;' src='"+ fbimg +"' />"+
												"</div>"+

												"<div class='col-xs-9 col-md-11 col-lg-11 commentboxdiv' style='word-break: break-all;'>"+
													"<b>"+
														"<a style='color:#365899;' href='viewprofile.php?fid="+fid+"'>"+fbname+"</a>"+
														"&nbsp;&nbsp;&nbsp;"+
													"</b>"+

													comment+
													"<br>"+
													"<p style='font-size:10px;color:#90949c;'>"+datecomment+"</p>"+
												"</div>"+
											"</div>"+
										"</div>"+
									"</div>"+
								"</div>"+
								"";

				$("#commentdiv").prepend(tobeappend);
				$("#lastcommentid").val(commentid);
				counthowmanycomments();
	    	}
	    }
	})
}

var commentpanelbody = $(".commentpanelbody").width();
$(".commentboxdiv").css('width',commentpanelbody);


$(document).on('click','.likesmodalopener',function(){

	var postid = $(this).attr('id');

	$('#modallabel').text('Likes');
	$("#modalcontainer").empty();

	$.ajax({
		url      : 'viewcomment-data.php',
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
