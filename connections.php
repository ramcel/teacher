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
    <title>Connection - Teacher Community</title>
    <link rel="shortcut icon" type="image/x-icon" href="favicon.png" />

    <?php include 'ext-bootstrap.php' ?>
</head>
<body id="body">

    <div id="wrapper">

        <?php include 'side-nav.php' ?>

        <!-- Page Content -->
        <div id="page-content-wrapper" style="padding-right:0px; padding-left:0px;padding-top: 0px;margin-top:40px;">

            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding:0px;">
                <button class="btn btn-block btn-primary connectionstopbtn active" style="border:1px solid #337ab7;border-radius: 0px; outline: none;">Connection</button>
            </div>

            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding:0px;">
                <button class="btn btn-block btn-primary requesttopbtn" style="border:1px solid #337ab7;border-radius: 0px;outline: none;">Request</button>
            </div>

            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding:0px;">
                <button class="btn btn-block btn-primary suggestionstopbtn" style="border:1px solid #337ab7;border-radius: 0px;outline: none;">Suggestions</button>
            </div>


            <div class="container-fluid">

                <div class="row">
                    <div class="col-xs-12 col-md-12 col-lg-12">

                        <div class="container">
                        <br>

                            <div id="requestdiv"></div>
                            <div id="connectionsdiv"></div>
                            <div id="findotherconnectionsdiv"></div>
                            <div class="loading"></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <!-- /#page-content-wrapper -->
    </div>
</body>
</html>

<style type="text/css">
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
<script type="text/javascript" src="js/connections.js"></script>
