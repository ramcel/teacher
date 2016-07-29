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

  $fqinfo = $con->query("select * from teacher where fid = '$fid'");
  $frinfo = $fqinfo->fetch_array();

  if($frinfo['setprofile'] == 'yes')
  {
    header("location:home.php");
  }
}
?>


<!DOCTYPE html>
<html>
<head>
	<title></title>

    <link rel="stylesheet" type="text/css" href="alertscript/sweetalert.css">
    <script type="text/javascript" src="alertscript/sweetalert.min.js"></script>
    <script type="text/javascript" src="alertscript/sweetalert-dev.js"></script>

	<?php include 'ext-bootstrap.php' ?>
</head>
<body id="body">

    <div class="well well-sm" style="background: #337ab7;border-color: #337ab7;border-radius: 0px;">
        <table>
            <tr>
                <td>
                    <img src="<?php echo $frinfo['fdimg'] ?>" class='img img-responsive img-circle' style='height: 100px;'>
                </td>

                <td style="vertical-align: middle;text-align: center">
                    <h2 style="color: white">&nbsp;&nbsp;&nbsp;&nbsp;Welcome</h2>
                    <h5 style="color: white" class="fdname">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<?php echo utf8_encode($frinfo['fdname']) ?></h5>
                </td>
            </tr>
        </table>
    </div>

    <div class="col-xs-12 col-md-12 col-lg-12" style="padding-right: 10px;padding-left: 10px;">

        <!-- Nav tabs -->
        <!-- <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active disabled profiletab">
                <a>
                    <span class="glyphicon glyphicon-user"></span>
                    Profile Info
                </a>
            </li>

            <li role="presentation" class="disabled connectiontab">
                <a>
                    <span class="glyphicon glyphicon-link"></span>
                    Suggested Connections

                </a>
            </li>
        </ul> -->

        <div class="panel panel-default" style="/*border-radius:0px;border-top: 0px solid transparent;">
            <div class="panel-body">

                <!-- Tab panes -->
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane active" id="profile">

                        <!-- OCCUPATION -->
                        <div class="panel panel-default">
                            <div class="panel-heading">
                              <button style="outline:none;float:right;padding-top: 1px;padding-bottom: 0px;padding-right: 4px;padding-left: 4px;margin-top: 3px;margin-right: 3px;" class="btn btn-primary addoccupationtoggle"><span class="glyphicon glyphicon-plus"></span></button>
                                <h5 style='color:#337AB7;'><span class="glyphicon glyphicon-lock"></span> Occupation</h5>
                            </div>

                            <div class="panel-body">

                                <div class="addoccupationformdiv" style="display: none">
                                    <form id="addcollege" class="form-group">
                                        <div class="row">
                                            <div class="col-md-12 col-xs-12">
                                                <input type="text" id="collegetxt" class="form-control" placeholder="Name of College" />
                                            </div>
                                        </div>
                                        <br>

                                        <div class="row">
                                            <div class="col-md-6 col-xs-6">
                                                <input type="number" id="yearfrom" class="form-control" placeholder="Year Started" />
                                            </div>

                                            <div class="col-md-6 col-xs-6">
                                                <input type="number" id="yearto" class="form-control" placeholder="Year Ended" />
                                            </div>
                                        </div>
                                        <br>

                                        <div class="row">
                                            <div class="col-md-12 col-xs-12">
                                                <button class="btn btn-primary btn-blocked btn-md"><span class="fa fa-plus"></span> ADD</button>
                                            </div>
                                        </div>
                                    </form>

                                <br><hr><br>
                                </div>

                                <div class="collogecontainer"></div>

                            </div>
                        </div>
                        <!-- END OF OCCUPATION -->

                        <!-- SUBJECT -->
                        <div class="panel panel-default">
                            <div class="panel-heading">
                              <button style="outline:none;float:right;padding-top: 1px;padding-bottom: 0px;padding-right: 4px;padding-left: 4px;margin-top: 3px;margin-right: 3px;" class="btn btn-primary addoccupationtoggle"><span class="glyphicon glyphicon-plus"></span></button>
                              <h5 style='color:#337AB7;'><span class="glyphicon glyphicon-book"></span> Subject</h5>
                            </div>

                            <div class="panel-body">
                                <div class="addsubjectformdiv" style="display: none">
                                    <form id="addsubject" class="form-group">
                                        <div class="row">
                                            <div class="col-md-8 col-xs-8">
                                                <input type="text" id="subject" class="form-control" placeholder="Name of Subject" />
                                            </div>

                                            <div class="col-md-4 col-xs-4">
                                                <button class="btn btn-primary btn-blocked btn-md style="width:100%;" "><span class="fa fa-plus"></span> ADD</button>
                                            </div>
                                        </div>
                                    </form>
                                <br><hr><br>
                            </div>

                                <div class="subjectcontainer"></div>

                            </div>
                        </div>
                        <!-- END OF SUBJECT -->

                        <!-- ACHIEVEMENTS -->
                        <div class="panel panel-default">
                            <div class="panel-heading">
                              <button style="outline:none;float:right;padding-top: 1px;padding-bottom: 0px;padding-right: 4px;padding-left: 4px;margin-top: 3px;margin-right: 3px;" class="btn btn-primary addoccupationtoggle"><span class="glyphicon glyphicon-plus"></span></button>
                              <h5 style='color:#337AB7;'><span class="glyphicon glyphicon-certificate"></span> Achivements / Awards</h5>
                            </div>

                            <div class="panel-body">
                                <div class="addawardsformdiv" style="display: none">
                                    <form id="addachievement" class="form-group">
                                        <div class="row">
                                            <div class="col-md-12 col-xs-12">
                                                <input type="text" id="achievement" class="form-control" placeholder="Achivement / Awards" />
                                            </div>
                                        </div>
                                        <br>

                                        <div class="row">
                                            <div class="col-md-6 col-xs-6">
                                                <input type="number" id="yearawarded" class="form-control" placeholder="Year Awarded" />
                                            </div>

                                            <div class="col-md-6 col-xs-6">
                                                <button class="btn btn-primary btn-blocked btn-md"><span class="fa fa-plus"></span> ADD</button>
                                            </div>
                                        </div>
                                    </form>
                                    <br><hr><br>
                                </div>

                                <div class="achievementcontainer"></div>

                            </div>
                        </div>
                        <!-- END OF ACHIEVEMENTS -->

                        <!-- DEGREE -->
                        <div class="panel panel-default">
                            <div class="panel-heading">
                              <button style="outline:none;float:right;padding-top: 1px;padding-bottom: 0px;padding-right: 4px;padding-left: 4px;margin-top: 3px;margin-right: 3px;" class="btn btn-primary addoccupationtoggle"><span class="glyphicon glyphicon-plus"></span></button>
                              <h5 style='color:#337AB7;'><span class="glyphicon glyphicon-education blue"></span> Degree</h5>
                            </div>

                            <div class="panel-body">
                                <div class="adddegreeformdiv" style="display: none">
                                    <form id="adddegree" class="form-group">
                                        <div class="row">
                                            <div class="col-md-12 col-xs-12">
                                                <input type="text" id="degree" class="form-control" placeholder="Degree" />
                                            </div>
                                        </div>
                                        <br>

                                        <div class="row">
                                            <div class="col-md-6 col-xs-6">
                                                <input type="number" id="yearfromdegree" class="form-control" placeholder="Year From" />
                                            </div>

                                            <div class="col-md-6 col-xs-6">
                                                <input type="number" id="yeartodegree" class="form-control" placeholder="Year to" />
                                            </div>
                                        </div>
                                        <br>

                                        <div class="row">
                                            <div class="col-md-12 col-xs-12">
                                                <button class="btn btn-primary btn-blocked btn-md"><span class="fa fa-plus"></span> ADD</button>
                                            </div>
                                        </div>
                                    </form>
                                    <br><hr><br>
                                </div>

                                <div class="degreecontainer"></div>
                            </div>
                        </div>
                        <!-- END OF DEGREE -->
                    </div>


                    <div role="tabpanel" class="tab-pane" id="connections">

                        <?php
                        $teacherq = $con->query("select * from teacher where fid != '$fid' and fid not in (select following_id from teacher_follower where follower_id = '$fid')");
                        while($teacherr = $teacherq->fetch_array())
                        {

                            $requestedq = $con->query("select * from teacher_follower where follower_id = '$fid' and following_id = '$teacherr[fid]'");
                            $requestedc = $requestedq->num_rows;
                            $requestedr = $requestedq->fetch_array();

                        ?>
                                <div class='panel panel-default'>
                                    <div class='panel-body'>

                                        <div class='row'>
                                            <div class="col-xs-3 col-md-2 col-lg-2">
                                                <img src="<?php echo $teacherr['fdimg'] ?>" style="height: 40px;width: 40px" class='img img-responsive img-circle' />
                                            </div>

                                            <div class="col-xs-4 col-md-5 col-lg-5" style="text-align:left;">
                                                <p style='width: 10em; overflow: hidden;white-space: nowrap;text-overflow: ellipsis;'><?php echo utf8_encode($teacherr['fdname']) ?></p>
                                            </div>

                                            <div class="col-xs-5 col-md-5 col-lg-5 " style="text-align:right;">
                                                <?php

                                                if($requestedc > 0)
                                                {
                                                    echo "<button class='btn btn-xs btn-danger connect' id='$teacherr[fid]'>Cancel</button> ";
                                                }

                                                if($requestedc == 0)
                                                {
                                                    echo "<button class='btn btn-xs btn-primary connect' id='$teacherr[fid]'>Connect</button> ";
                                                }

                                                ?>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        <?php
                        }
                        ?>


                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class=" col-xs-6  col-sm-6 col-md-6 col-lg-6">
                <button type="button" class="btn btn-primary btn-block nextbackbtn">Next</button>
            </div>

            <div class="col-xs-6  col-sm-6 col-md-6 col-lg-6">
                <button type="button" class="btn btn-primary btn-block skipbtn">Skip</button>
            </div>

            <!-- <div class=" col-xs-4  col-sm-4 col-md-3 col-lg-4">
                <a href="logout.php" class="btn btn-primary btn-block ">Logout</a>
            </div> -->
        </div>


        <br>

    </div>

</body>
</html>

<!-- Modal -->
<div class="modal fade " id="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-sm" role="document"style="top: 150px;">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h5 class="modal-title" id="modallabel"></h5>
      </div>
      <div class="modal-body">
        <div id="modalcontainer">

        </div>
      </div>
    </div>
  </div>
</div>
<!-- -->
<style>
input,input::-webkit-input-placeholder
    {
      font-size: 12px;
      line-height: 2;
    }

</style>

<input type="hidden" id="fid" value="<?php echo $fid ?>">
<?php include 'ext-script.php' ?>
<script type="text/javascript" src="js/setprofile.js"></script>
