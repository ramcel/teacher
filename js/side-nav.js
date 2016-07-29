var fid = $("#fid").val();

noofrequest();

function recentrefresnoofrequest()
{
    var refresh=1000; // Refresh rate in milli seconds
    mytime=setTimeout('noofrequest()',refresh)
}

function noofrequest()
{
	recentrefresnoofrequest();

	var noofrequest = $(".connectionrequest").text();


		$.ajax({
			url     : 'side-nav-data.php',
			type    : 'POST',
			data    : 'noofrequest=1' + '&fid=' + fid,
			success : function(data)
			{
				if(noofrequest != data)
				{
					$(".connectionrequest").text(data);
				}
			}
		});
}


  $("#lihome").mouseover(function(){
    $("#imghome").attr("src","otherimg/homehover.png");
    });

    $("#lihome").mouseout(function(){
      $("#imghome").attr("src","otherimg/home.png");
    });


  // $("#liprofile").mouseover(function(){
  //   $("#imgprofile").attr("src","otherimg/profilehover.png");
  //   });
  //
  //   $("#liprofile").mouseout(function(){
  //     $("#imgprofile").attr("src","otherimg/profile.png");
  //   });
