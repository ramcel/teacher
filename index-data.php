<?php  
include 'connection.php';

if(isset($_POST['autofollow']))
{
	$loginid = $_POST['loginid'];
	$friendid = $_POST['friendid'];

	$q = $con->query("select * from teacher_follower where follower_id = '$loginid' and following_id = '$friendid'");
	$c = $q->num_rows;

	$q1 = $con->query("select * from teacher_follower where following_id = '$loginid' and follower_id = '$friendid'");
	$c1 = $q1->num_rows;

	if($c == 0 && $c1 == 0)
	{
		$con -> query("insert into teacher_follower (follower_id,following_id,follower_status) value ('$loginid','$friendid','connected')");
	}
}
?>