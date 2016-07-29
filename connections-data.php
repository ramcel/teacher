<?php
include 'connection.php';

if(isset($_POST['approverequest']))
{
	$fid = mysqli_escape_string($con,$_POST['fid']);
	$followingid = mysqli_escape_string($con,$_POST['followingid']);

	$con->query("UPDATE teacher_follower set follower_status = 'connected' where following_id = '$fid' and follower_id = '$followingid'")or die($con->error());
}


if(isset($_POST['cancelrequest']))
{
	$fid = mysqli_escape_string($con,$_POST['fid']);
	$followingid = mysqli_escape_string($con,$_POST['followingid']);

	$con->query("delete from teacher_follower where follower_id = '$fid' and following_id = '$followingid'");

}

if(isset($_POST['loadrequest']))
{
	$fid = mysqli_escape_string($con,$_POST['fid']);
	$data = array();

	$q = $con->query("select b.* from teacher_follower as a left join teacher as b on a.following_id = b.fid where follower_id = '$fid' and follower_status = 'pending' union select b.* from teacher_follower as a left join teacher as b on a.follower_id = b.fid where following_id = '$fid' and follower_status = 'pending'")or die($con->error());
	$c = $q->num_rows;

	while($r = $q->fetch_array())
	{

		$q1 = $con->query("SELECT * from teacher_follower where follower_id = '$fid' and following_id = '$r[fid]'");
		$c1 = $q1->num_rows;

		$q2 = $con->query("SELECT * from teacher_follower where follower_id = '$r[fid]' and following_id = '$fid'");
		$c2 = $q2->num_rows;

		if($c1 > 0)
		{
			$requesttype = 'requester';
		}

		if($c2 > 0)
		{
			$requesttype = 'approver';
		}

		$data[] = array(
			'connectedname' => utf8_encode($r['fdname']),
			'connectedimg'  => $r['fdimg'],
			'connectedid'   => $r['fid'],
			'requesttype'   => $requesttype
		);
	}


	echo json_encode($data);

}

if(isset($_POST['loadteacheryoumayknow']))
{
	$fid = mysqli_escape_string($con,$_POST['fid']);
	$data = array();

	// $q = $con->query("SELECT distinct c.* from teacher_follower as a left join (select follower_id,following_id from teacher_follower where follower_id in (select following_id from teacher_follower where follower_id = '$fid')) as b on a.following_id = b.follower_id left join teacher as c on b.following_id = c.fid where a.follower_id = '$fid' and c.fid != '$fid' and c.fid not in (select following_id from teacher_follower where follower_id = '$fid')");

	$q = $con->query("select * from teacher where fid not in (select following_id from teacher_follower where follower_id = '$fid') and fid != '$fid' and fid not in (select follower_id from teacher_follower where following_id = '$fid')");
	while($r = $q->fetch_array())
	{
		$data[] = array(
			'teacheryouknowname' => utf8_encode($r['fdname']),
			'teacheryouknowimg'  => $r['fdimg'],
			'teacheryouknowid'  => $r['fid']
		);
	}

	echo json_encode($data);
}

if(isset($_POST['loadconnections']))
{
	$fid = mysqli_escape_string($con,$_POST['fid']);
	$data = array();

	$q = $con->query("select b.* from teacher_follower as a left join teacher as b on a.following_id = b.fid where follower_id = '$fid' and follower_status = 'connected' union select b.* from teacher_follower as a left join teacher as b on a.follower_id = b.fid where following_id = '$fid' and follower_status = 'connected' ");
	while($r = $q->fetch_array())
	{
		$data[] = array(
			'connectedname' => utf8_encode($r['fdname']),
			'connectedimg'  => $r['fdimg'],
			'connectedid'  => $r['fid']
		);
	}

	echo json_encode($data);

}
?>
