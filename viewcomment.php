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

if(isset($_GET['postid']))
{
    $postid = $_GET['postid'];
}
?>


<!DOCTYPE html>
<html>
<head>
	<title></title>

	<?php include 'ext-bootstrap.php' ?>
</head>
<body id="body">

	<div id="wrapper">

		<?php include 'side-nav.php' ?>

		<!-- Page Content -->
        <div id="page-content-wrapper" style="padding-right:0px; padding-left:0px;margin-top:40px;">
            <div class="container-fluid">

                <div class="row">
                    <div class="col-xs-12 col-md-12 col-lg-12">

                        <div id="postdiv"></div>

                    </div>
                </div>
            </div>
        </div>
        <!-- /#page-content-wrapper -->
	</div>

<!-- Modal -->
<div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="modallabel"></h4>
      </div>
      <div class="modal-body">
        <div id="modalcontainer">

        </div>
      </div>
    </div>
  </div>
</div>
<!-- -->

</body>
</html>

<?php include 'ext-script.php' ?>

<input type="hidden" id="lastcommentid" value="0">
<input type="hidden" id="fid" value="<?php echo $fid ?>" />
<input type="hidden" id="postid" value="<?php echo $postid ?>" />
<script type="text/javascript" src="js/viewcomment.js"></script>
