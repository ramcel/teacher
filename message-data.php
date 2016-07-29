<?php
include 'connection.php';

if(isset($_POST['loadnewmsg']))
{
	$threadid = $_POST['threadid'];
	$lastnewmessageid = $_POST['lastnewmessageid'];

	$data = array();

	$q = $con->query("select * from teacher_chat_message where thread_id = '$threadid' and message_id > '$lastnewmessageid'");
	while($r = $q->fetch_array())
	{

		$data[] = array(

			'msgid'    => $r['message_id'],
			'message'  => $r['message'],
			'datesend' => date('F j, Y g:i A',strtotime($r['date_send'])),
			'status'   => $r['status'],
			'msgtype'  => "recieverdiv col-xs-6 col-sm-6 col-md-6 col-lg-6"
		);
	}
	echo json_encode($data);
}

if(isset($_POST['testlastnewmessageid']))
{
	$threadid = $_POST['threadid'];

	$q = $con->query("select * from teacher_chat_message where thread_id = '$threadid' ORDER BY message_id DESC LIMIT 1");
	$r = $q->fetch_array();

	echo $r['message_id'];
}


if(isset($_POST['loadchatinfo']))
{
	$threadid = $_POST['threadid'];
	$fid = mysqli_escape_string($con,$_POST['fid']);

	$q = $con->query("select * from teacher_chat_thread where thread_id = '$threadid'")or die($con->error);
	$r = $q->fetch_array();

	$fid1 = $r['fid1'];
	$fid2 = $r['fid2'];

	if($fid1 == $fid)
	{
		$q1 = $con->query("select * from teacher where fid = '$r[fid2]'")or die($con->error);
		$r1 = $q1->fetch_array();

		$data = array(

			'fbimg' => $r1['fdimg'],
			'fbname' => $r1['fdname']

		);

		echo json_encode($data);
	}

	if($fid2 == $fid)
	{
		$q2 = $con->query("select * from teacher where fid = '$r[fid1]'");
		$r2 = $q2->fetch_array();

		$data = array(

			'fbimg' =>$r2['fdimg'],
			'fbname' =>$r2['fdname']

		);

		echo json_encode($data);
	}

}


if(isset($_POST['checkkungmeronpangiloload']))
{
	$threadid = $_POST['threadid'];
	$oldmsgid = mysqli_escape_string($con,$_POST['oldmsgid']);

	$q = $con->query("select count(*) as hasmoretoload from teacher_chat_message where thread_id = '$threadid' and message_id < '$oldmsgid'")or die($con->error);
	$r = $q->fetch_array();

	if($r['hasmoretoload'] > 0)
	{
		echo 'yes';
	}
	else
	{
		echo 'no';
	}
}

if(isset($_POST['loadoldmessage']))
{
	$threadid = $_POST['threadid'];
	$fid = mysqli_escape_string($con,$_POST['fid']);
	$oldmsgid = mysqli_escape_string($con,$_POST['oldmsgid']);

	$q = $con->query("select * from teacher_chat_message where thread_id = '$threadid' and message_id < '$oldmsgid' order by  message_id desc limit 5");
	while($r = $q->fetch_array())
	{

		if($r['sender_id'] == $fid)
		{
			$msgtype = "senderdiv col-xs-offset-6 col-xs-6 col-sm-6 col-md-6 col-lg-6";
		}
		else
		{
			$msgtype = "recieverdiv col-xs-6 col-sm-6 col-md-6 col-lg-6";
		}

		$data[] = array(

			'msgid'         => $r['message_id'],
			'message'       => $r['message'],
			'datesend'      => date('F j, Y g:i A',strtotime($r['date_send'])),
			'status'        => $r['status'],
			'msgtype'       => $msgtype
		);
	}
	echo json_encode($data);
}

if(isset($_POST['loadmsg']))
{
	$threadid = $_POST['threadid'];
	$fid = mysqli_escape_string($con,$_POST['fid']);
	$data = array();

	$q = $con->query("select * from teacher_chat_message where thread_id = '$threadid' order by  message_id desc limit 10");
	while($r = $q->fetch_array())
	{
		if($r['sender_id'] == $fid)
		{
			$msgtype = "senderdiv col-xs-offset-6 col-xs-6 col-sm-6 col-md-6 col-lg-6";
		}
		else
		{
			$msgtype = "recieverdiv col-xs-6 col-sm-6 col-md-6 col-lg-6";
		}

		$data[] = array(

			'msgid'    => $r['message_id'],
			'message'  => $r['message'],
			'datesend' => date('F j, Y g:i A',strtotime($r['date_send'])),
			'status'   => $r['status'],
			'msgtype'  => $msgtype
		);
	}
	echo json_encode($data);
}

if(isset($_POST['sendmsg']))
{
	$sender = $_POST['sender'];
	$reciever = $_POST['reciever'];
	$message = $_POST['txt'];
	$threadid = $_POST['threadid'];
	$datesend = date('Y-m-d H:i:s',strtotime("now"));

	$con->query("insert into teacher_chat_message (thread_id, sender_id, reciever_id, message, date_send) value ('$threadid','$sender','$reciever','$message','$datesend')")or die($con->error);

	$con->query("delete from teacher_chat_message where sender_id =''");

	$q = $con->query("select * from teacher_chat_message where date_send = '$datesend' and thread_id = '$threadid'");
	$r = $q->fetch_array();

	$data = array(

		'msgid'    => $r['message_id'],
		'sender'   => $r['sender_id'],
		'reciever' => $r['reciever_id'],
		'message'  => $r['message'],
		'datesend' => date('F j, Y g:i A',strtotime($r['date_send'])),
		'status'   => $r['status']
	);

	echo json_encode($data);
}
?>
