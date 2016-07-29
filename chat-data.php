<?php
include 'connection.php';

if(isset($_POST['loadchatsearch']))
{
	$fid = mysqli_escape_string($con,$_POST['fid']);
	$search = mysqli_escape_string($con,$_POST['search']);
	$data = array();

	$q = $con->query("SELECT b.* from teacher_chat_thread as a left join teacher as b on a.fid2 = b.fid where fid1 = '$fid' and fdname like '%$search%' union SELECT b.* from teacher_chat_thread as a left join teacher as b on a.fid1 = b.fid where  fdname like '%$search%' and fid2 = '$fid'")or die($con->error);
	$c = $q->num_rows;
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

if(isset($_POST['checkifhasathread']))
{
	$fid1 = mysqli_escape_string($con,$_POST['fid1']);
	$fid2 = mysqli_escape_string($con,$_POST['fid2']);

	$q = $con->query("SELECT thread_id from teacher_chat_thread as a left join teacher as b on a.fid2 = b.fid where fid1 = '$fid1' and fid2 = '$fid2' union SELECT thread_id from teacher_chat_thread as a left join teacher as b on a.fid1 = b.fid where fid2 = '$fid1' and fid1 = '$fid2'")or die($con->error());
	$c = $q->num_rows;
	$r = $q->fetch_array();

	if($c > 0)
	{
		echo $r['thread_id'];
	}
	else
	{
		$con->query("insert into teacher_chat_thread (fid1,fid2) value ('$fid1','$fid2')");

		$q1 = $con->query("SELECT thread_id from teacher_chat_thread as a left join teacher as b on a.fid2 = b.fid where fid1 = '$fid1' and fid2 = '$fid2' union SELECT thread_id from teacher_chat_thread as a left join teacher as b on a.fid1 = b.fid where fid2 = '$fid1' and fid1 = '$fid2'");
		$r1 = $q1->fetch_array();

		echo $r1['thread_id'];
	}
}

if(isset($_POST['loadchat']))
{
	$fid = mysqli_escape_string($con,$_POST['fid']);
	$data = array();

	$q = $con->query("SELECT b.* from teacher_chat_thread as a left join teacher as b on a.fid2 = b.fid where fid1 = '$fid' union SELECT b.* from teacher_chat_thread as a left join teacher as b on a.fid1 = b.fid where fid2 = '$fid'");
	$c = $q->num_rows;
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

if(isset($_POST['loadconnections']))
{
	$fid = mysqli_escape_string($con,$_POST['fid']);
	$data = array();

	$q = $con->query("select b.* from teacher_follower as a left join teacher as b on a.following_id = b.fid where follower_id = '$fid' union select b.* from teacher_follower as a left join teacher as b on a.follower_id = b.fid where following_id = '$fid'");
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



// if(isset($_POST['loadmessages']))
// {
// 	$fid = mysqli_escape_string($con,$_POST['fid']);
// 	$data = array();

// 	$q = $con->query("select b.* from teacher_follower as a left join teacher as b on a.following_id = b.fid where follower_id = '$fid' and follower_status = 'connected' union select b.* from teacher_follower as a left join teacher as b on a.follower_id = b.fid where following_id = '$fid' and follower_status = 'connected' ");
// 	while($r = $q->fetch_array())
// 	{
// 		$data[] = array(
// 			'connectedname' => utf8_encode($r['fdname']),
// 			'connectedimg'  => $r['fdimg'],
// 			'connectedid'  => $r['fid']
// 		);
// 	}

// 	echo json_encode($data);

// }
?>
