$('.messeagecontainer').scroll(function() {
	if($('.messeagecontainer').scrollTop() == 0)
	{
		checkkungmeronpangiloload();
	}

	// if($('#hasmoretoload').val() == 'yes')
	// {
	// 	if($('.messeagecontainer').scrollTop() == 0)
	//    	{
	//    		var scrollto = $('#oldmessageid').val();
	//    		loadoldmessage();
	//    		loadhasmoretoload();

	//    		$(".messeagecontainer").animate({
	// 			scrollTop: $('#'+scrollto).offset().top
	// 		},1)
	//    	}
	// }
});

var fid = $("#fid").val();

var fid1 = $("#fid1").val();
var fid2 = $("#fid2").val();
var threadid = $("#threadid").val();

loadmsg();
loadchatinfo();
newmessagerefresh();

function newmessagerefresh()
{
    var refresh=1000; // Refresh rate in milli seconds
    mytime=setTimeout('newmessage()',refresh)
}

function newmessage()
{
		newmessagerefresh();

		var lastnewmessageid = $("#newmessageid").val();

		$.ajax({
			url     : 'message-data.php',
			type    : 'POST',
			data    : 'testlastnewmessageid=1' + '&threadid=' + threadid,
			success : function(data)
			{
				if(data != lastnewmessageid)
				{

          $.ajax({
        		url      : 'message-data.php',
        		type     : 'POST',
        		data     : 'loadnewmsg=1' +'&threadid=' + threadid + '&lastnewmessageid=' + lastnewmessageid ,
        		dataType : 'JSON',
        		success  : function(data){

        			for(var i = 0; i < data.length; i++)
        			{
        				var msgid = data[i].msgid;
        				var message = data[i].message;
        				var datesend = data[i].datesend;
        				var status = data[i].status;
        				var msgtype = data[i].msgtype;

        				var tobeappend = ""+
        							"<div class='row' id='"+msgid+"'>"+
        								"<div class='"+msgtype+"'>"+
        									"<div class='messagediv'>"+
        										message +
        									"</div>"+

        									"<div class='datesenddiv'>"+
        										datesend +
        									"</div>"+
        								"</div>"+
        							"</div>"+
        							"";
        				$('.messeagecontainer').append(tobeappend);
        			}

        			$('#oldmessageid').val(data[data.length-1].msgid);
        			$('#newmessageid').val(data[0].msgid);
              var messagecontainerheight = $(".messeagecontainer")[0].scrollHeight;
      				$(".messeagecontainer").scrollTop(messagecontainerheight);
        		}
        	})


				}
			}
		});
}

function loadchatinfo()
{
	$.ajax({
		url      : 'message-data.php',
		type     : 'POST',
		data     : 'loadchatinfo=1' +'&threadid=' + threadid + '&fid=' + fid ,
		dataType : 'JSON',
		success  : function(data){

			var img = data.fbimg;
			var name = data.fbname;

			var tobeappend = ""+
							"<img src='"+img+"' class='img img-responsive' style='width: 50px; height: 50px;' />"+
							"";

			$(".name").append(name);
			$(".chatinfo").append(tobeappend);

		}
	})
}

function loadmsg()
{
	$.ajax({
		url      : 'message-data.php',
		type     : 'POST',
		data     : 'loadmsg=1' +'&threadid=' + threadid + '&fid=' + fid ,
		dataType : 'JSON',
		success  : function(data){

			for(var i = 0; i < data.length; i++)
			{
				var msgid = data[i].msgid;
				var message = data[i].message;
				var datesend = data[i].datesend;
				var status = data[i].status;
				var msgtype = data[i].msgtype;

				var tobeappend = ""+
							"<div class='row' id='"+msgid+"'>"+
								"<div class='"+msgtype+"'>"+
									"<div class='messagediv'>"+
										message +
									"</div>"+

									"<div class='datesenddiv'>"+
										datesend +
									"</div>"+
								"</div>"+
							"</div>"+
							"";
				$('.messeagecontainer').prepend(tobeappend);
			}

			$('#oldmessageid').val(data[data.length-1].msgid);
			$('#newmessageid').val(data[0].msgid);

      $(".messeagecontainer").animate({
    		scrollTop: $('.scrollto').offset().top
    	},1)

		}
	})
}

function checkkungmeronpangiloload()
{
	var oldmsgid = $('#oldmessageid').val();

	$.ajax({
		url      : 'message-data.php',
		type     : 'POST',
		data     : 'checkkungmeronpangiloload=1' +'&oldmsgid=' + oldmsgid +'&threadid=' + threadid,
		success  : function(data){

			if(data == 'yes')
			{
				loadoldmessage();
			}

		}
	})
}

function loadoldmessage()
{
	var oldmsgid = $('#oldmessageid').val();

	$.ajax({
		url      : 'message-data.php',
		type     : 'POST',
		data     : 'loadoldmessage=1' +'&oldmsgid=' + oldmsgid +'&threadid=' + threadid + '&fid=' + fid ,
		dataType : 'JSON',
		success  : function(data){

			for(var i = 0; i < data.length; i++)
			{
				var msgid = data[i].msgid;
				var message = data[i].message;
				var datesend = data[i].datesend;
				var status = data[i].status;
				var msgtype = data[i].msgtype;

				var tobeappend = ""+
							"<div class='row' id='"+msgid+"'>"+
								"<div class='"+msgtype+"'>"+
									"<div class='messagediv'>"+
										message +
									"</div>"+

									"<div class='datesenddiv'>"+
										datesend +
									"</div>"+
								"</div>"+
							"</div>"+
							"";
				$('.messeagecontainer').prepend(tobeappend);
			}

			var scrollto = $('#oldmessageid').val();
			$(".messeagecontainer").animate({
				scrollTop: $('#'+scrollto).offset().top
			},0)

			$('#oldmessageid').val(data[data.length-1].msgid);
		}
	})
}

$(document).ready(function(){
    var windowheight = $(window).height();
    $(".messeagecontainer").css('height',windowheight-170);
    $(".messeagecontainer").css('max-height',windowheight-170);
    $(".messeagecontainer").css('over-flow-y',"auto");
})

$(document).on('keyup','#messagetxt',function(){
	var txt = $("#messagetxt").val();

	if(txt != "")
	{
		$('.sendmsgbtn').removeAttr('disabled',"");
		$('.sendmsgbtn').removeClass('disabled');
	}
	else
	{
		$('.sendmsgbtn').attr('disabled');
		$('.sendmsgbtn').addClass('disabled');
	}
})

$(document).on('submit','#sendmsgform',function(e){
	e.preventDefault();

	var txt = $("#messagetxt").val();

	if(fid1 == fid)
	{
		var reciever = fid2;
	}
	else
	{
		var reciever = fid1;
	}

	if($(".sendmsgbtn").hasClass('disabled') == false)
	{
		$.ajax({
			url      : 'message-data.php',
			type     : 'POST',
			data     : 'sendmsg=1' + '&sender=' + fid + '&reciever=' + reciever + '&txt=' + txt + '&threadid=' + threadid,
			dataType : 'JSON',
			success  : function(data){

				var msgid = data.msgid;
				var sender = data.sender;
				var reciever = data.reciever;
				var message = data.message;
				var datesend = data.datesend;
				var status = data.status;

				var tobeappend = ""+
							"<div class='row' id='"+msgid+"'>"+
								"<div class='senderdiv col-xs-offset-6 col-xs-6 col-sm-6 col-md-6 col-lg-6'>"+
									"<div class='messagediv'>"+
										message +
									"</div>"+

									"<div class='datesenddiv'>"+
										datesend +
									"</div>"+
								"</div>"+
							"</div>"+
							"";


				$('.messeagecontainer').append(tobeappend);

				$("#messagetxt").val("");
				$('.sendmsgbtn').attr('disabled');
				$('.sendmsgbtn').addClass('disabled');
				$('#newmessageid').val(msgid);

				var messagecontainerheight = $(".messeagecontainer")[0].scrollHeight;
				$(".messeagecontainer").scrollTop(messagecontainerheight);
			}
		})
	}
})
