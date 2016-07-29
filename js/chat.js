var fid = $("#fid").val();

getthread();

function getthread()
{
	$.ajax({
		url      : 'chat-data.php',
		type     : 'POST',
		data     : 'loadchat=1' + '&fid=' + fid,
		dataType : 'JSON',
		success  : function(data){

			$(".loading").fadeOut(function(){
				if(data.length == 0)
				{
					$(".loading").fadeOut(function(){
						var tobeappend = "<center><h4 style='color:#999;'><br>Start message your Co-Teacher.</h4></center>";
						$("#getthread").append(tobeappend);
					})

				}

				for(var i = 0; i < data.length; i++)
				{
					var connectedname = data[i].connectedname;
					var connectedimg = data[i].connectedimg;
					var connectedid = data[i].connectedid;

					var tobeappend = ""+
									"<div class='row chooseteacher' id='"+connectedid+"' style='padding-bottom:5px;'>"+
										"<div class='col-xs-2 col-sm-1 col-md-2 col-lg-1'>"+
											"<img src='"+connectedimg+"' class='img img-circle' style='height:40px;width:40px;'>"+
										"</div>"+

										"<div class='col-xs-10 col-sm-11 col-md-10 col-lg-11' style='padding-top:8px;padding-left: 35px;'>"+
											connectedname +
										"</div>"+
									"</div>"+
									"<hr>"+
									"<br>"+
									"";

					$("#getthread").append(tobeappend);
				}
			})
		}
	})
}

function loadconnections()
{
	$.ajax({
		url      : 'chat-data.php',
		type     : 'POST',
		data     : 'loadconnections=1' + '&fid=' + fid,
		dataType : 'JSON',
		success  : function(data){

			// if(data.length == 0)
			// {
			// 	//alert("NO");
			// 	$(".loading").fadeOut(function(){
			// 		var tobeappend = "<center><h4 style='color:#999;'><br>Start message your Co-Teacher.</h4></center>";
			// 		$("#getthread").append(tobeappend);
			// 	})

			// }

			for(var i = 0; i < data.length; i++)
			{
				var connectedname = data[i].connectedname;
				var connectedimg = data[i].connectedimg;
				var connectedid = data[i].connectedid;

				var tobeappend = ""+
								"<div class='row chooseteacher' id='"+connectedid+"' style='padding-bottom:5px;'>"+
									"<div class='col-xs-2 col-sm-1 col-md-2 col-lg-1'>"+
										"<img src='"+connectedimg+"' class='img img-circle' style='height:40px;width:40px;'>"+
									"</div>"+

									"<div class='col-xs-10 col-sm-11 col-md-10 col-lg-11' style='padding-top:8px;padding-left: 30px;'>"+
										connectedname +
									"</div>"+
								"</div>"+
								"<hr>"+
								"<br>"+
								"";

				$("#getthread").append(tobeappend);
			}

		}
	})
}

$(document).on('click','.chooseteacher',function(){
	var aa = $(this);
	var fid2 = aa.attr('id');

	$.ajax({
		url     : 'chat-data.php',
		type    : 'POST',
		data    : 'checkifhasathread=1' + '&fid1=' + fid + '&fid2=' + fid2,
		success : function(data){
			window.location = "message.php?threadid=" + data;

			//alert(data);
		}
	})
})

$(".addchat").click(function(){

	$("#getthread").empty();
	$("#chatsearch").focus();

	loadconnections();
})

$("#modal").on('hidden.bs.modal',function(){

	$("#modallabel").text("");
	$("#modalcontainer").empty();
})

$(document).on("keyup",'#chatsearch',function(){

	var search = $(this).val();

	$("#getthread").empty();

	$.ajax({
		url      : 'chat-data.php',
		type     : 'POST',
		data     : 'loadchatsearch=1' + '&fid=' + fid + '&search=' + search,
		dataType : 'JSON',
		success  : function(data){

			$(".loading").fadeOut(function(){
				if(data.length == 0)
				{
					$(".loading").fadeOut(function(){
						var tobeappend = "<center><h4 style='color:#999;'><br>No Teacher found.</h4></center>";
						$("#getthread").append(tobeappend);
					})

				}

				for(var i = 0; i < data.length; i++)
				{
					var connectedname = data[i].connectedname;
					var connectedimg = data[i].connectedimg;
					var connectedid = data[i].connectedid;

					var tobeappend = ""+
									"<div class='row chooseteacher' id='"+connectedid+"' style='padding-bottom:5px;'>"+
										"<div class='col-xs-2 col-sm-1 col-md-2 col-lg-1'>"+
											"<img src='"+connectedimg+"' class='img img-circle' style='height:40px;width:40px;'>"+
										"</div>"+

										"<div class='col-xs-10 col-sm-11 col-md-10 col-lg-11' style='padding-top:8px;padding-left: 35px;'>"+
											connectedname +
										"</div>"+
									"</div>"+
									"<hr>"+
									"<br>"+
									"";

					$("#getthread").append(tobeappend);
				}
			})
		}
	})
})
