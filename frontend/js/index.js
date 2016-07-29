

$("#loginbtn").on('click',function(){
	login();
});


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
					window.location = "savefbinfo.php?fid=" + id + '&dname=' + dname;
				});
	    	}
	   	});
	  }

//para may effects

  // $( ".text" ).hide();
	//
	//
	// $( ".containers" ).ready(function() {
	//   $( ".text" ).toggle( "fold" );
	// });
