<?php  
include 'connection.php';

if(isset($_POST['noofrequest']))
{
	$fid = mysqli_escape_string($con,$_POST['fid']);

	$q = $con->query("select count(*) as noofrequest from teacher_follower where follower_id = '$fid' and follower_status = 'pending' ");
	$r = $q->fetch_array();

	echo $r['noofrequest'];
}
?>
