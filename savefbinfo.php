<?php
include "connection.php";

if(isset($_GET['fid']))
{
	//get the variable
	$fid = mysqli_escape_string($con,$_GET['fid']);			//facebook id
	$fdname = mysqli_escape_string($con,$_GET['dname']);	//facebook displayname
	$fdimg = "http://graph.facebook.com/".$fid."/picture?type=large";
	$fdcover = "https://graph.facebook.com/".$fid."?fields=cover";

	$q = $con->query("select * from teacher where fid = '$fid'");
	$c = $q->num_rows;
	$r = $q->fetch_array();

	if($c == 0)
	{
		$q = $con->query("insert into teacher (fid,fdname,fdimg,fdcover) values ('$fid','$fdname','$fdimg','$fdcover')");

		session_start();
		$_SESSION['fid'] = $fid;

		header("location:setprofile.php");
	}
	else
	{
		session_start();
		$_SESSION['fid'] = $fid;

		if($r['setprofile'] == 'no')
		{
			header("location:setprofile.php");
		}
		else
		{
			header("location:home.php");
		}
	}
}

?>
