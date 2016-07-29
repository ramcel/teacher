<?php
include 'connection.php';

//LOAD RECOMMEDATION
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

//DELETE DEGREE
if(isset($_POST['deletedegree']))
{
	$degreeid = mysqli_escape_string($con,$_POST['degreeid']);
	$con->query("delete from teacher_degree where degree_id = '$degreeid'");
	echo 'success';
}

//GET ALL THE DEGREE
if(isset($_POST['loaddegree']))
{
	$fid = mysqli_escape_string($con,$_POST['fid']);
	$data = array();
	$q = $con->query("select * from teacher_degree where fid = '$fid' ");
	while($r = $q->fetch_array())
	{
		$data[] = array(
			'degreeid' => $r['degree_id'],
			'degree' => $r['bachelor_degree'],
			'yearfrom'   => $r['year_from'],
			'yearto'     => $r['year_to']
		);
	}

	echo json_encode($data);
}

//ADD DEGREE
if(isset($_POST['adddegree']))
{
	$degree = mysqli_escape_string($con,$_POST['degree']);
	$yearfrom = mysqli_escape_string($con,$_POST['yearfrom']);
	$yearto = mysqli_escape_string($con,$_POST['yearto']);
	$fid = mysqli_escape_string($con,$_POST['fid']);

	$con->query("insert into teacher_degree(bachelor_degree,year_from,year_to,fid) values ('$degree','$yearfrom','$yearto','$fid')");

	$q = $con->query("select * from teacher_degree where fid = '$fid' and bachelor_degree = '$degree' and year_from = '$yearfrom' and year_to = '$yearto'");
	$r = $q->fetch_array();

	echo $r['degree_id'];
}

//DELETE OCCUPATION
if(isset($_POST['deleteoccupation']))
{
	$occupation = mysqli_escape_string($con,$_POST['occupation']);
	$con->query("delete from teacher_college where college_name = '$occupation'");
	echo 'success';
}

//GET ALL THE OCCUPATION
if(isset($_POST['loadcollge']))
{
	$fid = mysqli_escape_string($con,$_POST['fid']);
	$data = array();
	$q = $con->query("select * from teacher_college where fid = '$fid' ");
	while($r = $q->fetch_array())
	{
		$data[] = array(
			'collegeid'   => $r['college_id'],
			'collegename' => $r['college_name'],
			'yearfrom'   => $r['year_from'],
			'yearto'     => $r['year_to']
		);
	}

	echo json_encode($data);
}

//ADD OCCUPATION
if(isset($_POST['addcollege']))
{
	$collegetxt = mysqli_escape_string($con,$_POST['collegetxt']);
	$yearfrom = mysqli_escape_string($con,$_POST['yearfrom']);
	$yearto = mysqli_escape_string($con,$_POST['yearto']);
	$fid = mysqli_escape_string($con,$_POST['fid']);

	$con->query("insert into teacher_college(college_name,year_from,year_to,fid) values ('$collegetxt','$yearfrom','$yearto','$fid')");

	$q = $con->query("select * from teacher_college where fid = '$fid' ");
	$r = $q->fetch_array();

	echo $r['college_id'];
}

//DELETE SUBJECT
if(isset($_POST['deletesubj']))
{
	$subjid = mysqli_escape_string($con,$_POST['subjid']);
	$con->query("delete from teacher_subject where subj_id = '$subjid'");
}

//ADD SUBJECT
if(isset($_POST['addsubject']))
{
	$subject = mysqli_escape_string($con,$_POST['subject']);
	$fid = mysqli_escape_string($con,$_POST['fid']);

	$con->query("insert into teacher_subject(subj_name,fid) values ('$subject','$fid')");

	$q = $con->query("select * from teacher_subject where fid = '$fid' and subj_name = '$subject'");
	$r = $q->fetch_array();

	echo $r['subj_id'];
}

//GET ALL THE SUBJECT
if(isset($_POST['loadsubj']))
{
	$fid = mysqli_escape_string($con,$_POST['fid']);
	$data = array();
	$q = $con->query("select * from teacher_subject where fid = '$fid' ");
	while($r = $q->fetch_array())
	{
		$data[] = array(
			'subjid'  => $r['subj_id'],
			'subject' => $r['subj_name']
		);
	}

	echo json_encode($data);
}

//DELETE ACHIEVEMENT
if(isset($_POST['deleteachievement']))
{
	$achievementid = mysqli_escape_string($con,$_POST['achievementid']);
	$con->query("delete from teacher_achievement where achievement_id = '$achievementid'");
}

//ADD ACHIEVEMENT
if(isset($_POST['addachievement']))
{
	$achievement = mysqli_escape_string($con,$_POST['achievement']);
	$yearawarded = mysqli_escape_string($con,$_POST['yearawarded']);
	$fid = mysqli_escape_string($con,$_POST['fid']);

	$con->query("insert into teacher_achievement(achievement,yearawarded,fid) values ('$achievement','$yearawarded','$fid')");

	$q = $con->query("select * from teacher_achievement where fid = '$fid' and achievement = '$achievement' and yearawarded = '$yearawarded'");
	$r = $q->fetch_array();

	echo $r['achievement_id'];
}

//GET ALL THE ACHIEVEMENT
if(isset($_POST['loadachievement']))
{
	$fid = mysqli_escape_string($con,$_POST['fid']);
	$data = array();
	$q = $con->query("select * from teacher_achievement where fid = '$fid' ");
	while($r = $q->fetch_array())
	{
		$data[] = array(
			'achievementid'  => $r['achievement_id'],
			'achievement' => $r['achievement'],
			'yearawarded' => $r['yearawarded']
		);
	}

	echo json_encode($data);
}
?>
