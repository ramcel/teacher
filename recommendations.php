<?php
$activepage = '';
$pageheader = "";

include "connection.php";

session_start();
if(!isset($_SESSION['fid']))
{
  header("location:index.php");
}
else
{
  $fid = $_SESSION['fid'];
}
?>


<!DOCTYPE html>
<html>
<head>
	<title>Recommendations - Teacher Community</title>
  <link rel="shortcut icon" type="image/x-icon" href="favicon.png" />

	<?php include 'ext-bootstrap.php' ?>
</head>
<body id="body">

	<div id="wrapper">

		<?php include 'side-nav.php' ?>

		<!-- Page Content -->
        <div id="page-content-wrapper" style="padding-right:0px; padding-left:0px;padding-top:5px;margin-top:50px;">
            <div class="container-fluid" style="padding-right:7px; padding-left:7px;">

                <div class="row">
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <div id="recommendationdiv"></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /#page-content-wrapper -->
	</div>


</body>
</html>

<?php include 'ext-script.php' ?>
<input type="hidden" id="lastrecommendationid">
<input type="hidden" id="fid" value="<?php echo $fid ?>">
<script type="text/javascript" src="js/recommendations.js"></script>
