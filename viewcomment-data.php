<?php
include 'connection.php';

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

if(isset($_POST['sendcomment']))
{
	$fid = $_POST['fid'];
	$postid = $_POST['postid'];
	$comment = $_POST['comment'];

	$datecomment = date('Y-m-d',strtotime("-7 hours -1 mins"));
	$timecomment = date("H:i:s",strtotime("-7 hours -1 mins"));

	$con->query("insert into teacher_post_comment (fid,post_id,comment,date_comment,time_comment) value ('$fid','$postid','$comment','$datecomment','$timecomment')");

	$q = $con->query("select * from teacher_post_comment where fid = '$fid' and post_id = '$postid' and comment = '$comment' and date_comment = '$datecomment' and time_comment = '$timecomment'");
	$r = $q->fetch_array();

	echo $r['comment_id'];
}

if(isset($_POST['testrecentid']))
{
	$postid = mysqli_escape_string($con,$_POST['postid']);
	$q = $con->query("select * from teacher_post_comment as a left join teacher as b on a.fid = b.fid where post_id = '$postid' order by comment_id desc limit 1")or die($con->error());
	$r = $q->fetch_array();

	echo $r['comment_id'];
}

if(isset($_POST['loadnewcomment']))
{
	$postid = $_POST['postid'];
	$recentid = $_POST['recentid'];

	$data = array();

	$q = $con->query("select * from teacher_post_comment as a left join teacher as b on a.fid = b.fid where comment_id > $recentid and post_id = '$postid' order by comment_id desc");
	while($r = $q->fetch_array())
	{
		$data[] = array(

			'commentid' => $r['comment_id'],
			'fbid' => $r['fid'],
			'fbname' => utf8_encode($r['fdname']),
			'fbimg' => $r['fdimg'],
			'comment' => $r['comment'],
			'attachment' => $r['attachment'],
			'datecomment' => date('F d, Y g:i A',strtotime($r['date_comment'].$r['time_comment'] )),
			'timecomment' => $r['time_comment']

		);
	}

	echo json_encode($data);
}

if(isset($_POST['loadcomment']))
{
	$fid = $_POST['fid'];
	$postid = $_POST['postid'];
	$data = array();

	$q = $con->query("select * from teacher_post_comment as a left join teacher as b on a.fid = b.fid where post_id = '$postid' order by comment_id ");
	while($r = $q->fetch_array())
	{
		$data[] = array(

			'commentid' => $r['comment_id'],
			'fbid' => $r['fid'],
			'fbname' => utf8_encode($r['fdname']),
			'fbimg' => $r['fdimg'],
			'comment' => $r['comment'],
			'attachment' => $r['attachment'],
			'datecomment' => date('F d, Y g:i A',strtotime($r['date_comment'].$r['time_comment'] )),
			'timecomment' => $r['time_comment']

		);
	}

	echo json_encode($data);
}

if(isset($_POST['loadpost']))
{
	$fid = $_POST['fid'];
	$postid = $_POST['postid'];

	$q = $con->query("select * from teacher_post as a left join teacher as b on a.fid = b.fid left join (select ifnull(post_id,'$postid')as post_id,ifnull(count(*),0) as comments from teacher_post_comment where post_id = '$postid')as c on a.post_id = c.post_id left join (select ifnull(post_id,'$postid')as post_id,ifnull(count(*),0) as likes from teacher_post_like where post_id = '$postid') as d on a.post_id = d.post_id where a.post_id = '$postid'");
	$c = $q->num_rows;
	$r = $q->fetch_array();

	if($c > 0)
	{
		$data = array(

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

			'likes'         => $r['likes'],
			'comments'      => $r['comments'],

			'status'        => 'ok'

		);

		echo json_encode($data);
	}
	else
	{
		$data = array(

			'status'        => 'notok'

		);
		echo json_encode($data);
	}


}
?>
