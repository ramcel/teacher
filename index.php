<?php
session_start();
if(isset($_SESSION['fid']))
{
	header("location:home.php");
}
else
{
}

?>


<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, shrink-to-fit=no, initial-scale=1">
	<meta name="description" content="">
	<meta name="author" content="">
	<title>Welcome Page</title>
	<link rel="shortcut icon" type="image/x-icon" href="favicon.png" />
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
	<link href="bootstrap/css/design.css" rel="stylesheet">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
	<script src="bootstrap/js/bootstrap.js"></script>
</head>

<body>
	<div class="panel panel-default">

<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
	<div class="containers">
		<div class="login-containers">
			<div id="output"></div>
				<div class="avatar"></div>
						<button id="loginbtn" class="btn btn-info btn-block login" style="background-color:#475993; border-color:#475993; outline: none;"><img src="otherimg/facebook.png" height="28px" width="28px"> Log in with Facebook</button><br>
						<div class=text>
						This Teacher's community is where teachers discuss teaching strategies, share resources, and connect with each other.
						</div>
		</div>
	</div>
</div>
</div>

</body>

</html>

<?php include 'ext-script.php' ?>
<script type="text/javascript" src="js/index.js"></script>
