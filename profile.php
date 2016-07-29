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
	<title>Profile - Teacher Community</title>
  <link rel="shortcut icon" type="image/x-icon" href="favicon.png" />

	<?php include 'ext-bootstrap.php' ?>
</head>
<body id="body">

	<div id="wrapper">

		<?php include 'side-nav.php' ?>

	    <div style="width: 100;background: url(otherimg/bg.jpg);height: 260px;margin-top: 70px;">
	    	<br>
	    	<center><img src="<?php echo $fbimg; ?>" class=' img img-circle' style="height: 140px; width:140px;"/></center>
	    	<br>
	    	<center><h2 style="color:white;"><?php echo $fbname; ?></h2></center>
	    	<br>
	    </div>


		<!-- Page Content -->
        <div id="page-content-wrapper" style="padding-right:0px; padding-left:0px;">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xs-12 col-md-12 col-lg-12" style="padding-left: 0px;padding-right: 0px;">


                      <!-- RECOMMENDATION -->
                      <div class="panel panel-default">
                        <div class="panel-heading" style="padding-right: 5px;height: 70px;background-color: white;">
                          <h5>Recommendation</h5>
                        </div>

                        <div class="panel-body">
                          <div id="recommendationdiv"></div>
                        </div>
                      </div>

                      	<!-- OCCUPATION -->
	                    <div class="panel panel-default" style="margin-bottom: 10px;">
                        <div class="panel-heading" style="padding-right: 5px;height: 70px;background-color: white;">
					  			        <button style="margin-top: 10px;float:right; outline:none;padding-left: 5px;padding-right: 5px;padding-bottom: 2px;padding-top: 2px;" class="btn btn-primary addoccupationtoggle"><span class="glyphicon glyphicon-plus"></span></button>
                          <h5 style='color:#337AB7;'><img src="otherimg/occupation.png" height=32px width=32px> Occupation</h5>
					  		      </div>

					  		<div class="panel-body">

					  			<div class="addoccupationformdiv" style="display: none; height: 150px;">
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
						  						<button style="outline:none;" class="btn btn-primary btn-blocked btn-md"><span class="fa fa-plus"></span> ADD</button>
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
	                    <div class="panel panel-default" style="margin-bottom: 10px;">
					  		<div class="panel-heading" style="padding-right: 5px;height: 70px;background-color: white;">
					  			<button style="margin-top: 10px;float:right; outline:none;padding-left: 5px;padding-right: 5px;padding-bottom: 2px;padding-top: 2px;" class="btn btn-primary addsubjecttoggle"><span class="glyphicon glyphicon-plus"></span></button>

					  			<h5 style='color:#337AB7;'><img src="otherimg/book.png" height=32px width=32px> Subject</h5>
					  		</div>

					  		<div class="panel-body">
                  				<div class="addsubjectformdiv" style="display: none">
						  			<form id="addsubject" class="form-group">
						  				<div class="row">
						  					<div class="col-md-8 col-xs-8">
						  						<input type="text" id="subject" class="form-control" placeholder="Name of Subject" />
						  					</div>

						  					<div class="col-md-4 col-xs-4">
						  						<button style="outline:none;" class="btn btn-primary btn-blocked btn-md style="width:100%;" "><span class="fa fa-plus"></span> ADD</button>
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
	                    <div class="panel panel-default" style="margin-bottom: 10px;">
					  		<div class="panel-heading" style="padding-right: 5px;height: 70px;background-color: white;">
					  			<button style="margin-top: 10px;float:right; outline:none;padding-left: 5px;padding-right: 5px;padding-bottom: 2px;padding-top: 2px;" class="btn btn-primary addawardstoggle"><span class="glyphicon glyphicon-plus"></span></button>

					  			<h5 style='color:#337AB7;'><img src="otherimg/medal.png" height=32px width=32px> Achivements / Awards</h5>
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
						  						<button style="outline:none;" class="btn btn-primary btn-blocked btn-md"><span class="fa fa-plus"></span> ADD</button>
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
                    <div class="panel panel-default" style="margin-bottom: 10px;">
		                <div class="panel-heading" style="padding-right: 5px;height: 70px;background-color: white;">
		                  <button style="margin-top: 10px;float:right; outline:none;padding-left: 5px;padding-right: 5px;padding-bottom: 2px;padding-top: 2px;" class="btn btn-primary adddegreettoggle"><span class="glyphicon glyphicon-plus"></span></button>

		                  <h5 style='color:#337AB7;'><img src="otherimg/degree.png" height=32px width=32px> Degree</h5>
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
		                        			<button style="outline:none;" class="btn btn-primary btn-blocked btn-md"><span class="fa fa-plus"></span> ADD</button>
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

<?php include 'ext-script.php' ?>
<input type="hidden" id="fid" value="<?php echo $fid ?>">
<script type="text/javascript" src="js/profile.js"></script>
