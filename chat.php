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
<html id="body">
<head>
    <title>Messages - Teacher Community</title>
    <link rel="shortcut icon" type="image/x-icon" href="favicon.png" />

    <?php include 'ext-bootstrap.php' ?>

    <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/css/select2.min.css" rel="stylesheet" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.min.js"></script>

    <link rel="stylesheet" type="text/css" href="select2/css/select2.min.css">
    <script type="text/javascript" src='select2/js/select2.min.js'></script>
</head>
<body>

    <div id="wrapper">

        <?php include 'side-nav.php' ?>

        <div class="col-xs-10 col-sm-11 col-md-11 col-lg-11" style="background:transparent;padding: 10px;margin-top:100px;">
            <input type="text" id="chatsearch" placeholder="Search Conversation" class="form-control" style="padding: 5px" >
        </div>

        <div class="col-xs-2 col-sm-1 col-md-1 col-lg-1" style="background:transparent;padding: 10px;margin-top:100px;">
            <button class="btn btn-primary addchat"><span class="glyphicon glyphicon-plus"></span></button>
        </div>

        <!-- Page Content -->
            <div class="container-fluid"style="background-color:white;">

                <div class="row">
                    <div class="col-xs-12 col-md-12 col-lg-12">

                        <div class="container">
                            <br>
                            <div id="getthread"></div>

                            <center><div class="loading"></div></center>
                        </div>

                    </div>
                </div>
            </div>

        <!-- /#page-content-wrapper -->
    </div>
</body>
</html>

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

<style type="text/css">
html{
  background-color: white;
}
.loading
{
    width: 16px;
    height: 11px;
    margin: 10px 0;
    background: url(otherimg/url-loader.gif);
}
</style>

<?php include 'ext-script.php' ?>
<input type="hidden" id="fid" value="<?php echo $fid ?>">
<script type="text/javascript" src="js/chat.js"></script>
