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
<html style="padding-left:0px; padding-right:0px;background-color: #337AB7;">
<head>
	<title>Home - Teacher Community</title>
  <link rel="shortcut icon" type="image/x-icon" href="favicon.png" />
  <link rel="stylesheet" type="text/css" href="alertscript/sweetalert.css">
  <script type="text/javascript" src="alertscript/sweetalert.min.js"></script>
  <script type="text/javascript" src="alertscript/sweetalert-dev.js"></script>

	<?php include 'ext-bootstrap.php' ?>

</head>
<body id="body">

	<div id="wrapper">

		<?php include 'side-nav.php' ?>

		<!-- Page Content -->
        <div id="page-content-wrapper" style="padding-left:1px; padding-right:1px;margin-top:30px;">
            <div class="container-fluid" style="padding-left:1px; padding-right:1px;">

                <div class="">
                    <div class="col-xs-12 col-md-12 col-lg-12" style="margin-top: 50px;">

                        <form class="form-group" id="postform" enctype="multipart/form-data">
                            <div class="panel panel-default" style="margin-bottom:5px;">
                                <div class="panel-body" style="padding-bottom:0px;">
                                    <textarea id="posttxt" name="posttxt" style="resize: none;width: 100%;height: 50px;" class="form-control" placeholder="Say Something. . ."></textarea>
                                    <br>

                                    <input type="hidden" id="fid" name="fid" value="<?php echo $fid ?>" />

                                    <div class="liveurl-loader"></div>
                                    <div class="urlcontentholder">
                                        <div class="liveurl">
                                            <div class="close" title="Entfernen"></div>
                                            <div class="inner">
                                                <div class="image"></div>
                                                <div class="details">
                                                    <div class="info">
                                                        <div class="title"></div>
                                                        <div class="description"></div>
                                                        <div class="url"></div>
                                                    </div>

                                                    <div class="video"></div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <input type="file" class="file" id="attachement" name="file" style="display: none; outline:none;" onchange="fileSelected(this)"/>
                                    <button type="button" class="btn btn-primary btn-md" id="btnAttachment" style="outline:none;" onclick="openAttachment()"><span class="glyphicon glyphicon-paperclip"></span> </button>

                                    <div style="float: right;">
                                        <button type="submit" id="savepost" name="savepost" class="btn btn-md btn-primary" style="padding-left: 10px;padding-right: 10px; outline:none; "><b>Post</b></button>
                                    </div>


                                    <center><div id="image-holder" class="col-md-12 col-xs-12 col-lg-12" style="display:none;"></div></center>
                                    <br>

                                    <input type="hidden" name="urlimage" id="urlimage"/>
                                    <input type="hidden" name="urltitle" id="urltitle"/>
                                    <input type="hidden" name="urldesc" id="urldesc"/>
                                    <input type="hidden" name="urlurl" id="urlurl"/>

                                </div>
                            </div>
                        </form>

                        <div class="loadingbox panel panel-default" style="display: none">
                            <div class="panel-body">
                                Uploading. . .
                            </div>
                        </div>

                        <div id="feed"></div>

                    </div>
                </div>
            </div>
        </div>
        <!-- /#page-content-wrapper -->
	</div>



<!-- Modal -->
<div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document" style="top: 200px;">
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
<input type="hidden" id="fid" value="<?php echo $fid ?>" />
<input type="hidden" id="lastpostid" value="0">
<input type="hidden" id="lowestposid" value="0">
<script type="text/javascript" src="js/home.js"></script>
<script src="js/jquery.liveurl.js"> </script>
<script src="js/liveurl.js"> </script>
