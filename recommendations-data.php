<?php  
include 'connection.php';

if(isset($_POST['testrecentid']))
{
	$fid = mysqli_escape_string($con,$_POST['fid']);
	$q = $con->query("select * from teacher_recommendation as a left join teacher as b on a.recommend_by = b.fid where a.profile_id = '$fid' order by date_sent desc, time_Sent desc limit 1")or die($con->error);
	$r = $q->fetch_array();

	echo $r['recommendation_id'];

}

if(isset($_POST['loadnewrecommendation']))
{
	$fid = mysqli_escape_string($con,$_POST['fid']);
	$recentid = mysqli_escape_string($con,$_POST['recentid']);
	$data = array();
	$q = $con->query("select * from teacher_recommendation as a left join teacher as b on a.recommend_by = b.fid where a.profile_id = '$fid' and recommendation_id > '$recentid' order by date_sent desc, time_Sent desc")or die($con->error);
	while($r = $q->fetch_array())
	{
		$data[] = array(
			'recommendationid' => $r['recommendation_id'],
			'fdname'           => utf8_encode($r['fdname']),
			'fdimg'            => $r['fdimg'],
			'recommendation'   => $r['recommendation'],
			'datesent'         => $r['date_sent']
		);
	}

	echo json_encode($data);
}

if(isset($_POST['loadrecommendation']))
{
	$fid = mysqli_escape_string($con,$_POST['fid']);
	$data = array();
	$q = $con->query("select * from teacher_recommendation as a left join teacher as b on a.recommend_by = b.fid where a.profile_id = '$fid' order by date_sent desc, time_Sent desc")or die($con->error);
	while($r = $q->fetch_array())
	{
		$data[] = array(
			'recommendationid' => $r['recommendation_id'],
			'fdname'           => utf8_encode($r['fdname']),
			'fdimg'            => $r['fdimg'],
			'recommendation'   => $r['recommendation'],
			'datesent'         => $r['date_sent']
		);
	}

	echo json_encode($data);
}




?>
