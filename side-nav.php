<?php
$qinfo = $con->query("select * from teacher where fid = '$fid'");
$rinfo = $qinfo->fetch_array();

$fbname = $rinfo['fdname'];
$fbimg = $rinfo['fdimg'];
$fbcover = $rinfo['fdcover'];

if($rinfo['setprofile'] == 'no')
{
    header("location:setprofile.php");
}
?>

<!-- <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> -->

<body  id="bodys">
<!-- Sidebar -->
<nav class="navbar navbar-default navbar-fixed-top" role="navigation" style="  background-color: #337AB7;">
    <div class="container-fluid">
      <div class="navbar-header">
        <div class="navbar-header page-scroll">
          <ul class="nav navbar-nav" style="margin-top: 0px;margin-bottom: 0px;margin-left:20px;margin-right:20px;">
              <div class="col-xs-3 col-md-3 col-lg-3 "><li class="active"><a href="home.php"><span class="glyphicon glyphicon-home white icon"></span></a></></li></div>
              <div class="col-xs-3 col-md-3 col-lg-3 "><li><a href="profile.php"><span id="profile" class="glyphicon glyphicon-user white icon"></span></a></li>  </div>
              <div class="col-xs-3 col-md-3 col-lg-3 "><li><a href="chat.php"><span class="glyphicon glyphicon-envelope white icon"></span></a></li>  </div>
              <div class="col-xs-3 col-md-3 col-lg-3 "><li><a href="connections.php"><span class="glyphicon glyphicon-resize-small white icon"></span></a></li>  </div>

          </ul>
        </div>
      </div>

    </div>
    <br>
    <div class="collapse navbar-collapse navbar-ex1-collapse"style="padding-bottom:10px;">
      <input type="text" class="form-control" id="searchbox" placeholder="Search Co-Teacher Here. . . " style="border-radius: 0px;padding: 10px;border-radius:5px;" />
      <div id="display" class="col-md-12 col-xs-12 "></div>
    </div>


        <!-- Collect the nav links, forms, and other content for toggling -->
        <!-- <div class="collapse navbar-collapse navbar-ex1-collapse"style="margin-top:25px;">


        <input type="text" class="form-control" id="searchbox" placeholder="Search Co-Teacher Here. . . " style="border-radius: 0px;padding: 10px;border-radius:5px;" />



        </div> -->
        <!-- /.navbar-collapse -->
    </div>
    <!-- /.container -->
</nav>
<!-- /#sidebar-wrapper -->




    <!-- <div class="col-xs-2 col-md-1 col-lg-1 ">
        <button style="background:#337AB7;border-color:transparent;color:white;outline: none;" class="btn btn-default" id="menu-toggle"><span class="menu glyphicon glyphicon-menu-hamburger"></span></button>
    </div> -->

    <!-- <div class="col-xs-10 col-md-11 col-lg-11 ">
        <input type="text" class="form-control" id="searchbox" placeholder="Search Co-Teacher Here. . . " style="border-radius: 0px;padding: 10px;border-radius:5px;" />
        <div id="display" class="col-md-12 col-xs-12"></div>
    </div> -->


<input type="hidden" id="fbimg" value="<?php echo $fbimg ?>">
<input type="hidden" id="fbname" value="<?php echo $fbname ?>">
<script type="text/javascript" src="js/jquery.watermarkinput.js"></script>
<script type="text/javascript" src="js/side-nav.js"></script>

<style type="text/css">

.white
{
  color:white;
}

.icon
{
  top: 20px;
  padding-left: 21px;
  padding-right: 20px;
}

#display
{
    z-index: 5;
    position: absolute;
    display:none;
    border-left:solid 1px #dedede;
    border-right:solid 1px #dedede;
    border-bottom:solid 1px #dedede;
    overflow:hidden;
    background: #ccc;
    padding-left: 0px;
    padding-right: 2px;
    margin-left: -1px;
}
.display_box
{
    padding:10px;
    border-top:solid 1px #dedede;
    font-size:20px;
    height:60px;
    background:white;
}

.display_box:hover
{
    background:#3b5998;
    color:#FFFFFF;
}
#shade
{
    background-color:#00CCFF;
}

.badge
{
    display: inline-block;
    min-width: 10px;
    padding: 10px 10px 10px 0px;
    font-size: 12px;
    font-weight: bold;
    line-height: 1;
    color: #337AB7;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    background-color: #F2FFFF;
    border-radius: 10px;
    padding-left: 0px;
    padding-top: 5px;
    padding-bottom: 5px;
}
body
{
  /*background-color: #337AB7;*/
}
</style>
</body>
