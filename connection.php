<?php
//Connection to database
$con = mysqli_connect("localhost","root","");
//Connection to 0fees
// $con = mysqli_connect("sql105.byetcluster.com","0fe_18525553","orangeapps");
if (!$con){
    die('Could not connect to the server'.mysql_error());
}
else
{
	echo "";
}

$db = mysqli_select_db($con,'teacher_community');
//Connection to 0fees database
// $db = mysqli_select_db($con,'0fe_18525553_tc4');

if(!$db)
{
    die('Database not found!'.mysql_error());
}

date_default_timezone_set('Asia/Manila');
?>
