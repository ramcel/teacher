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

if(isset($_POST['loadfeed']))
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

if(isset($_POST['loadnewfeed']))
{
	$data = array();

	$fid = mysqli_escape_string($con,$_POST['fid']);
	$recentid = mysqli_escape_string($con,$_POST['recentid']);

	if($recentid == "")
	{
		$recentid = 0;
	}

	$q = $con->query("select * from teacher_post where post_id = '$recentid'");
	$r = $q->fetch_array();

	$q1 = $con->query("select b.*,a.* from teacher_post as a left join teacher as b on a.fid = b.fid where a.fid = '$fid' and post_id > ($recentid) union select c.*,b.* from teacher_follower as a left join teacher_post as b on a.following_id = b.fid left join teacher as c on a.following_id = c.fid where follower_id = '$fid' and follower_status = 'connected' and post_id > ($recentid) union select c.*,b.* from teacher_follower as a left join teacher_post as b on a.follower_id = b.fid left join teacher as c on a.follower_id = c.fid where following_id = '$fid' and follower_status = 'connected' and post_id > ($recentid) order by post_id")or die($con->error);

	while($r1 = $q1->fetch_array())
	{
		$q2 = $con->query("select * from (select ifnull(post_id,'$r1[post_id]')as post_id,ifnull(count(*),0) as comments from teacher_post_comment where post_id = '$r1[post_id]')as c left join (select ifnull(post_id,'$r1[post_id]')as post_id,ifnull(count(*),0) as likes from teacher_post_like where post_id = '$r1[post_id]') as d on c.post_id = d.post_id where c.post_id = '$r1[post_id]'");
		$r2 = $q2->fetch_array();

		$q3 = $con->query("select * from teacher_post_like where post_id = '$r[post_id]' and fid = '$fid'");
		$c3 = $q3->num_rows;

		if($c3 > 0)
		{
			$likeclass = 'unlikepostbtn';
		}
		else
		{
			$likeclass = 'likepostbtn';
		}

		$data[] = array(
			'postid'        => $r1['post_id'],
			'fbid'          => $r1['fid'],
			'fdname'        => utf8_encode($r1['fdname']),
			'fdimg'         => $r1['fdimg'],
			'post'          => $r1['post'],
			'datepost'      => date('F d, Y g:i A',strtotime($r1['date_post'])),

			'filerealname'  => $r1['file_realname'],
			'filerename'    => $r1['file_rename'],
			'fileextension' => $r1['file_extension'],
			'filepath'      => $r1['file_path'],

			'urlurl'        => $r1['url_url'],
			'urltitle'      => $r1['url_title'],
			'urldesc'       => $r1['url_desc'],
			'urlimage'      => $r1['url_img'],

			'likes'         => $r2['likes'],
			'likesclass'     => $likeclass,
			'comments'      => $r2['comments']
		);
	}

	echo json_encode($data);

}

if(isset($_POST['testrecentid']))
{
	$fid = mysqli_escape_string($con,$_POST['fid']);
	$q = $con->query("select * from teacher_post as a left join teacher as b on a.fid = b.fid where a.fid = '$fid' union all select * from teacher_post as a left join teacher as b on a.fid = b.fid where a.fid in (select following_id from teacher_follower where follower_id = '$fid') order by post_id desc limit 1")or die($con->error());
	$r = $q->fetch_array();

	echo $r['post_id'];
}

if(isset($_POST['deletepost']))
{
	$postid = mysqli_escape_string($con,$_POST['postid']);

	$q = $con->query("select file_path from teacher_post where post_id = '$postid'")or die($con->error);
	$r = $q->fetch_array();

	if($r['file_path'] != "")
	{
		unlink($r['file_path']);
	}

	$con->query("delete from teacher_post where post_id = '$postid'");
	$con->query("delete from teacher_post_comment where post_id = '$postid'");
	$con->query("delete from teacher_post_like where post_id = '$postid'");
}

if(isset($_POST['loadsearch']))
{
	$search = mysqli_escape_string($con,$_POST['search']);
	$fid = mysqli_escape_string($con,$_POST['fid']);

	$q=$con->query("select * from teacher where fdname like '%$search%' and fid != '$fid' LIMIT 5");
	while($r=$q->fetch_array())
	{
		$fdname=utf8_encode($r['fdname']);
		$fdimg=$r['fdimg'];
		$fid=$r['fid'];

		$re_fdname='<b>'.$search.'</b>';

		$final_fdname = str_ireplace($search, $re_fdname, $fdname);

		echo "".
			"<a href='viewprofile.php?fid=$fid'>".
				"<div class='display_box' align='left'>".
					"<img src='$fdimg' class='img img-circle' style='height:40px;float:left; margin-right:6px' /> $final_fdname".
				"</div>".
			"</a>".
			"";
	}
}

if(isset($_POST['savepost']))
{
	$fid = mysqli_escape_string($con,$_POST['fid']);
	$post = mysqli_escape_string($con,$_POST['posttxt']);
	$urlurl = mysqli_escape_string($con,$_POST['urlurl']);
	$urltitle = mysqli_escape_string($con,$_POST['urltitle']);
	$urldesc = mysqli_escape_string($con,$_POST['urldesc']);
	$urlimage = mysqli_escape_string($con,$_POST['urlimage']);
	$datepost = date('Y-m-d H:i:s',strtotime("now"));
    $path = 'post-attachment/';

    $file = $_FILES['file']['name'];
    $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
    $rename = date('ymdhis',strtotime("now")).".".$ext;
    $realname = $_FILES['file']['name'];
    $path = $path.$rename;

    if($file != "")
    {
    	if(move_uploaded_file($_FILES['file']['tmp_name'], $path))
	    {
	    	$con->query("insert into teacher_post (fid,post,file_rename,file_realname,file_path,file_extension,url_url,url_title,url_desc,url_img,date_post) value ('$fid','$post','$rename','$realname','$path','$ext','$urlurl','$urltitle','$urldesc','$urlimage','$datepost')");
	    }
    }
    else
    {
    	$con->query("insert into teacher_post (fid,post,file_rename,file_realname,file_path,file_extension,url_url,url_title,url_desc,url_img,date_post) value ('$fid','$post','','','','','$urlurl','$urltitle','$urldesc','$urlimage','$datepost')");
    }

	$q = $con->query("select * from teacher_post where fid = '$fid' and post = '$post' and date_post = '$datepost'");
	$r = $q->fetch_array();
	echo $r['post_id'];
}
?>
