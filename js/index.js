

$("#loginbtn").on('click',function(){
	login();
});

//flash
// $(".containers, body").addClass("flash");

	window.fbAsyncInit = function() {
	    	FB.init({
	      	appId      : '1094754277237667',
	      	xfbml      : true,
	      	version    : 'v2.6'
	    	});

	    	FB.getLoginStatus(function(response){
	    		if(response.status === "connected")
	    		{
	    			var id;

					FB.api('/me', function(response) {
		    			id = response.id;
					});

					FB.api('/me/friends', function(response) {
                        id = response.id;
                    });

	    		}
	    	});
	  	};

	  (function(d, s, id){
	     var js, fjs = d.getElementsByTagName(s)[0];
	     if (d.getElementById(id)) {return;}
	     js = d.createElement(s); js.id = id;
	     js.src = "//connect.facebook.net/en_US/sdk.js";
	     fjs.parentNode.insertBefore(js, fjs);
	   }(document, 'script', 'facebook-jssdk'));

	  function login()
	  {

	  	FB.login(function(response){
	    	if(response.status === "connected")
	    	{
	    		var id;
	    		var dname;

				FB.api('/me', function (response) {

					id = response.id;
					dname = response.name;
					//window.location = "savefbinfo.php?fid=" + id + '&dname=' + dname;
					
				});


				FB.api(
                  '/me/friends',
                  'GET',
                  {},
                  function(response) {
                      // Insert your code here
                      //alert(JSON.stringify(response));
                      $.each(response.data,function(index,friend) {
		                var friendid = friend.id;

		                $.ajax({
							url     : 'index-data.php',
							type    : 'POST',
							data    : 'autofollow=1' + '&loginid=' + id + '&friendid=' + friendid,
							success : function(data)
							{

							}
						});
		            });

                     window.location = "savefbinfo.php?fid=" + id + '&dname=' + dname;
                  }
                );

	    	}
	   	}, {scope: 'public_profile, email, user_friends'});
	  }
function loadfbfriends()
{
	 // get friends
                    // FB.api('/me/friends', function(response) {
                    //     var result_holder = document.getElementById('result_friends');
                    //     var friend_data = response.data.sort(sortMethod);
                    //     var results = '';
                    //     for (var i = 0; i < friend_data.length; i++) {
                    //         results += '<div><img src="https://graph.facebook.com/' + friend_data[i].id + '/picture">' + friend_data[i].name + '</div>';
                    //     }
                    //     result_holder.innerHTML = '<h2>Result list of your friends:</h2>' + results;
                    // });

                    FB.api(
					    "/751829034974854/friends",
					    function (response) {
					      	if (response && !response.error) {
						        for (var i = 0; i < response.length; i++) {
						        	$("#result_friends").append(response.id);
						        }
					      	}
					      	else
					      	{
					      		alert("something error");
					      	}
					    }
					);

}


//para may effects
  // $( ".text" ).hide();
	//
	//
	// $( ".containers" ).ready(function() {
	//   $( ".text" ).toggle( "fold" );
	// });
