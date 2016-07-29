<?php  
include 'connection.php';

if(isset($_POST['likepost']))
{
	$fid = mysqli_escape_string($con,$_POST['fid']);
	$postid = mysqli_escape_string($con,$_POST['postid']);

	$q1 = $con->query("select * from teacher_post_like where post_id = '$postid' and fid = '$fid'");
	$c1 = $q1->num_rows;
	$r1 = $q1->fetch_array();

	$q = $con->query("select ifnull(post_id,'$postid')as post_id,ifnull(count(*),0) as likes from teacher_post_like where post_id = '$postid'");
	$r = $q->fetch_array();

	if($c1 == 0)
	{
		$con->query("insert into teacher_post_like (fid,post_id) value ('$fid','$postid')");
		echo $r['likes']+1;
	}
	else
	{
		echo $r['likes'];
	}
}

if(isset($_POST['unlikepost']))
{
	$fid = mysqli_escape_string($con,$_POST['fid']);
	$postid = mysqli_escape_string($con,$_POST['postid']);

	$con->query("delete from teacher_post_like where fid = '$fid' and post_id = '$postid'");

	$q = $con->query("select ifnull(post_id,'$postid')as post_id,ifnull(count(*),0) as likes from teacher_post_like where post_id = '$postid'");
	$c = $q->num_rows;
	$r = $q->fetch_array();

	if($c == 0)
	{
		echo "0";
	}
	else
	{
		echo $r['likes'];
	}

}

if(isset($_POST['loadlikes']))
{
	$fid = mysqli_escape_string($con,$_POST['fid']);
	$postid = mysqli_escape_string($con,$_POST['postid']);
	$data = array();

	$q = $con->query("select c.* from teacher_post as a right join teacher_post_like as b on a.post_id = b.post_id left join teacher as c on b.fid = c.fid where b.post_id = '$postid'");
	while($r = $q->fetch_array())
	{

		//test if the fid is already connected
		$q1 = $con->query("SELECT * from teacher_follower where follower_id = '$fid' and following_id = '$r[fid]'");
		$c1 = $q1->num_rows;
		$r1 = $q1->fetch_array();

		$q2 = $con->query("SELECT * from teacher_follower where follower_id = '$r[fid]' and following_id = '$fid'");
		$c2 = $q2->num_rows;
		$r2 = $q2->fetch_array();

		if($fid == $r['fid'])
		{
			$buttonlabel = "you";
		}
		else
		{
			if($c1 == 0 && $c2 == 0)
			{
				$buttonlabel = "Connect";
			}
			else if($c1 == 0 && $c2 == 1 && $r2['follower_status'] == 'pending')
			{
				$buttonlabel = "approver";
			}
			else if($c1 == 1 && $c2 == 0 && $r1['follower_status'] == 'pending')
			{
				$buttonlabel = "requester";
			}
			else if($c1 == 0 && $c2 == 1 && $r2['follower_status'] == 'connected')
			{
				$buttonlabel = "Connected";
			}
			else if($c1 == 1 && $c2 == 0 && $r1['follower_status'] == 'connected')
			{
				$buttonlabel = "Connected";
			}
			else
			{
				$buttonlabel = "Connect";
			}
		}

		$data[] = array(
			'fdname'           => utf8_encode($r['fdname']),
			'fdimg'            => $r['fdimg'],
			'fdid'             => $r['fid'],
			'connectionstatus' => $buttonlabel
		);
	}

	echo json_encode($data);
}

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

	$con->query("delete from teacher_follower where follower_id = '$fid' and following_id = '$profileid'");

}

if(isset($_POST['sendrecommendation']))
{
	$fid = mysqli_escape_string($con,$_POST['fid']);
	$profileid = mysqli_escape_string($con,$_POST['profileid']);
	$recommendation = mysqli_escape_string($con,$_POST['recommendation']);
	$datesent = mysqli_escape_string($con,$_POST['datesent']);
	$timesent = mysqli_escape_string($con,$_POST['timesent']);

	$con->query("insert into teacher_recommendation (profile_id,recommend_by,recommendation,date_sent,time_sent) value ('$profileid','$fid','$recommendation','$datesent','$timesent')");
}

if(isset($_POST['loadrecommendation']))
{
	$fid = mysqli_escape_string($con,$_POST['fid']);
	$data = array();
	$q = $con->query("select * from teacher_recommendation as a left join teacher as b on a.recommend_by = b.fid where a.profile_id = '$fid' order by date_sent desc, time_Sent desc limit 3")or die($con->error);
	while($r = $q->fetch_array())
	{
		$data[] = array(
			'fdname'         => utf8_encode($r['fdname']),
			'fdimg'          => $r['fdimg'],
			'recommendation' => $r['recommendation'],
			'datesent'       => $r['date_sent']
		);
	}

	echo json_encode($data);
}

if(isset($_POST['loadmorecontent']))
{
	$fid = mysqli_escape_string($con,$_POST['fid']);
	$frompostid = mysqli_escape_string($con,$_POST['lowestposid']);
	$topostid = $frompostid - 10;

	$q = $con->query("select b.*,a.* from teacher_post as a left join teacher as b on a.fid = b.fid where a.fid = '$fid' and post_id < $frompostid and post_id > $topostid  union select c.*,b.* from teacher_follower as a left join teacher_post as b on a.following_id = b.fid left join teacher as c on a.following_id = c.fid where follower_id = '$fid' and follower_status = 'connected' and post_id < $frompostid and post_id > $topostid   union select c.*,b.* from teacher_follower as a left join teacher_post as b on a.follower_id = b.fid left join teacher as c on a.follower_id = c.fid where following_id = '$fid' and follower_status = 'connected' and post_id < $frompostid and post_id > $topostid  order by post_id desc limit 10");

	while($r = $q->fetch_array())
	{

		$q1 = $con->query("select * from (select ifnull(post_id,'$r[post_id]')as post_id,ifnull(count(*),0) as comments from teacher_post_comment where post_id = '$r[post_id]')as c left join (select ifnull(post_id,'$r[post_id]')as post_id,ifnull(count(*),0) as likes from teacher_post_like where post_id = '$r[post_id]') as d on c.post_id = d.post_id where c.post_id = '$r[post_id]'");
		$r1 = $q1->fetch_array();

		$q2 = $con->query("select * from teacher_post_like where post_id = '$r[post_id]' and fid = '$fid'");
		$c2 = $q2->num_rows;

		if($c2 > 0)
		{
			$likeclass = 'unlikepostbtn';
		}
		else
		{
			$likeclass = 'likepostbtn';
		}

		$data[] = array(
			'postid'        => $r['post_id'],
			'fbid'          => $r['fid'],
			'fdname'        => utf8_encode($r['fdname']),
			'fdimg'         => $r['fdimg'],
			'post'          => $r['post'],
			'datepost'      => date('F d, Y g:i A',strtotime($r['date_post'])),

			'filerealname'  => $r['file_realname'],
			'filerename'    => $r['file_rename'],
			'fileextension' => $r['file_extension'],
			'filepath'      => $r['file_path'],

			'urlurl'        => $r['url_url'],
			'urltitle'      => $r['url_title'],
			'urldesc'       => $r['url_desc'],
			'urlimage'      => $r['url_img'],

			'likes'         => $r1['likes'],
			'likesclass'     => $likeclass,
			'comments'      => $r1['comments']
		);
	}
	echo json_encode($data);

}

if(isset($_POST['loadtimeline']))
{
	$fid = mysqli_escape_string($con,$_POST['fid']);
	$data = array();
	$q = $con->query("select b.*,a.* from teacher_post as a left join teacher as b on a.fid = b.fid where a.fid = '$fid' union select c.*,b.* from teacher_follower as a left join teacher_post as b on a.following_id = b.fid left join teacher as c on a.following_id = c.fid where follower_id = '$fid' and follower_status = 'connected' and post_id > 0  union select c.*,b.* from teacher_follower as a left join teacher_post as b on a.follower_id = b.fid left join teacher as c on a.follower_id = c.fid where following_id = '$fid' and follower_status = 'connected' and post_id > 0 order by post_id desc limit 10");
	while($r = $q->fetch_array())
	{
		$q1 = $con->query("select * from (select ifnull(post_id,'$r[post_id]')as post_id,ifnull(count(*),0) as comments from teacher_post_comment where post_id = '$r[post_id]')as c left join (select ifnull(post_id,'$r[post_id]')as post_id,ifnull(count(*),0) as likes from teacher_post_like where post_id = '$r[post_id]') as d on c.post_id = d.post_id where c.post_id = '$r[post_id]'");
		$r1 = $q1->fetch_array();

		$q2 = $con->query("select * from teacher_post_like where post_id = '$r[post_id]' and fid = '$fid'");
		$c2 = $q2->num_rows;

		if($c2 > 0)
		{
			$likeclass = 'unlikepostbtn';
		}
		else
		{
			$likeclass = 'likepostbtn';
		}

		$data[] = array(
			'postid'        => $r['post_id'],
			'fbid'          => $r['fid'],
			'fdname'        => utf8_encode($r['fdname']),
			'fdimg'         => $r['fdimg'],
			'post'          => $r['post'],
			'datepost'      => date('F d, Y g:i A',strtotime($r['date_post'])),

			'filerealname'  => $r['file_realname'],
			'filerename'    => $r['file_rename'],
			'fileextension' => $r['file_extension'],
			'filepath'      => $r['file_path'],

			'urlurl'        => $r['url_url'],
			'urltitle'      => $r['url_title'],
			'urldesc'       => $r['url_desc'],
			'urlimage'      => $r['url_img'],

			'likes'         => $r1['likes'],
			'likesclass'     => $likeclass,
			'comments'      => $r1['comments']
		);
	}

	echo json_encode($data);
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

//GET ALL THE OCCUPATION
if(isset($_POST['loadcollge']))
{
	$fid = mysqli_escape_string($con,$_POST['fid']);
	$data = array();
	$q = $con->query("select * from teacher_college where fid = '$fid' ");
	while($r = $q->fetch_array())
	{
		$data[] = array(
			'collegename' => $r['college_name'],
			'yearfrom'   => $r['year_from'],
			'yearto'     => $r['year_to']
		);
	}

	echo json_encode($data);
}

if(isset($_POST['loadbasicinfo']))
{
	$profileid = mysqli_escape_string($con,$_POST['profileid']);
	$fid = mysqli_escape_string($con,$_POST['fid']);

	$q = $con->query("SELECT * from teacher where fid = '$profileid'");
	$r = $q->fetch_array();

	$q1 = $con->query("SELECT * from teacher_follower where follower_id = '$fid' and following_id = '$profileid'");
	$c1 = $q1->num_rows;
	$r1 = $q1->fetch_array();

	$q2 = $con->query("SELECT * from teacher_follower where follower_id = '$profileid' and following_id = '$fid'");
	$c2 = $q2->num_rows;
	$r2 = $q2->fetch_array();



	if($c1 == 0 && $c2 == 0)
	{
		$buttonlabel = "Connect";
	}
	else if($c1 == 0 && $c2 == 1 && $r2['follower_status'] == 'pending')
	{
		$buttonlabel = "approver";
	}
	else if($c1 == 1 && $c2 == 0 && $r1['follower_status'] == 'pending')
	{
		$buttonlabel = "requester";
	}
	else if($c1 == 0 && $c2 == 1 && $r2['follower_status'] == 'connected')
	{
		$buttonlabel = "Connected";
	}
	else if($c1 == 1 && $c2 == 0 && $r1['follower_status'] == 'connected')
	{
		$buttonlabel = "Connected";
	}
	else
	{
		$buttonlabel = "Connect";
	}

	$data = array(
		'profileid'   => $r['fid'],
		'profilename' => utf8_encode($r['fdname']),
		'profileimg'  => $r['fdimg'],
		'buttonlabel' => $buttonlabel
	);

	echo json_encode($data);
}

if(isset($_POST['followuser']))
{
	$profileid = mysqli_escape_string($con,$_POST['profileid']);
	$fid = mysqli_escape_string($con,$_POST['fid']);

	$con->query("insert into teacher_follower (follower_id,following_id) value ('$fid','$profileid')");

	echo 'success';
}

if(isset($_POST['unfollowuser']))
{
	$profileid = mysqli_escape_string($con,$_POST['profileid']);
	$fid = mysqli_escape_string($con,$_POST['fid']);

	$con->query("delete from teacher_follower where follower_id = '$fid' and following_id = '$profileid'");
	$con->query("delete from teacher_follower where following_id = '$fid' and follower_id = '$profileid'");
}
?>
