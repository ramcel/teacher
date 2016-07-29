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

if(isset($_GET['threadid']))
{
    $threadid = $_GET['threadid'];

    $qthread = $con->query("select * from teacher_chat_thread where thread_id = '$threadid'");
    $rthread = $qthread->fetch_array();

    if($rthread['fid1'] == $fid)
    {
        $fid1 = $rthread['fid1'];
        $fid2 = $rthread['fid2'];
    }
    else
    {
        $fid1 = $rthread['fid2'];
        $fid2 = $rthread['fid1'];
    }

}
?>

<input type="hidden" id="fid1" value="<?php echo $fid1 ?>">
<input type="hidden" id="fid2" value="<?php echo $fid2 ?>">
<input type="hidden" id="threadid" value="<?php echo $threadid ?>">

<input type="hidden" id="newmessageid">
<input type="hidden" id="oldmessageid">
<input type="hidden" id="hasmoretoload">

<!DOCTYPE html>
<html>
<head>
    <title>Messages - Teacher Community</title>
    <link rel="shortcut icon" type="image/x-icon" href="favicon.png" />

    <?php include 'ext-bootstrap.php' ?>

    <script type="text/javascript">
 // tae
    </script>
</head>
<body id="body">

    <div id="wrapper">
      <div id="wrapper3">

        <?php include 'side-nav.php' ?>

        <!-- Page Content -->
            <div class="container-fluid" style="padding-left: 0px;padding-right: 0px;margin-top:48px;">

                <div class="panel panel-default" style="border-radius: 0px; border:0px solid transparent;padding-bottom:0px;padding-top: 0px;margin-bottom:0px;margin-top:0px;">
                    <div class="panel-heading" style="background:#337AB7;border-radius:0px; padding-bottom: 0px; padding-top: 0px;">

                        <div class="row">
                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"><div class="chatinfo"></div></div>

                            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                <div class="name" style="margin-top:13px;font-weight: bold;color: white;"></div>
                            </div>

                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="margin-top:10px;text-align:right">
                                <div>
                                    <div class="dropdown " style="/*float: right">
                                        <button class="btn btn-primary dropdown-toggle" type="button" id="settingmenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" style="border-color: #337AB7; outline:none;">
                                        <span class="glyphicon glyphicon-cog" style="color: white;"></span>
                                      </button>
                                      <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="settingmenu">
                                        <li><a href="#">Delete Message</a></li>
                                      </ul>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>

                    <div class="messeagecontainer" style="width: 100%;background:white;text-align:center;overflow-x:hidden;"></div>

                    <div class="panel-body sendmessageformdivision" style="padding-bottom: 0px;padding-top: 0px;margin-top:10px;">

                        <form id="sendmsgform">
                            <div class="col-xs-10 col-sm-11 col-md-11 col-lg-11">
                                <input type="text" id="messagetxt" autocomplete="off" class="form-control" style="font-size: 13px;">
                            </div>

                            <div class="col-xs-2 col-sm-1 col-md-1 col-lg-1">
                                <button class="btn btn-primary btn-block sendmsgbtn" type="submit" disabled=""><span class="glyphicon glyphicon-send"></span></button>
                            </div>
                        </form>
                    </div>
                    <br>
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

.senderdiv
{
    margin-bottom:10px;
    text-align: right;
    margin-top: 5px;
}

.senderdiv .messagediv
{
    background:#337AB7;
    padding-right:10px;
    margin-right: 10px;
    padding:10px;
    color: white;
    border-radius: 10px;
}

.senderdiv .datesenddiv
{
    color: #999;
    font-size: 10px;
    padding-right:10px;
    margin-right: 10px;
}

.recieverdiv
{
    margin-bottom:10px;
    text-align: left;
}

.recieverdiv .messagediv
{
    background:#f5f5f5;
    padding-left: 10px;
    margin-left: 10px;
    padding:10px;
    color: black;
    border-radius: 10px;
}

.recieverdiv .datesenddiv
{
    color: #999;
    font-size: 10px;
    padding-left: 10px;
    margin-left: 10px;
}
#body
{
  background-color: white;
}
</style>

<?php include 'ext-script.php' ?>
<input type="hidden" id="fid" value="<?php echo $fid ?>">
<script type="text/javascript" src="js/message.js"></script>




<div class="scrollto">

</div>
