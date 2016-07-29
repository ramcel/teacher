<?php  
include 'connection.php';

if(isset($_POST['cancel']))
{
    $followerid = mysqli_escape_string($con,$_POST['followerid']);
    $followingid = mysqli_escape_string($con,$_POST['followingid']);

    $con->query("DELETE from teacher_follower where following_id = '$followingid' and follower_id = '$followerid'")or die($con->error);

}

if(isset($_POST['connect']))
{
    $followerid = mysqli_escape_string($con,$_POST['followerid']);
    $followingid = mysqli_escape_string($con,$_POST['followingid']);

    $q = $con->query("select * from teacher_follower where following_id = '$followerid' and follower_id = '$followingid'");
    $c = $q->num_rows;

    $q1 = $con->query("select * from teacher_follower where following_id = '$followingid' and follower_id = '$followerid'");
    $c1 = $q1->num_rows;

    if($c == 0 && $c1 == 0)
    {
        $con->query("insert into teacher_follower (follower_id, following_id) value ('$followerid','$followingid')");
    }
}

if(isset($_POST['savesetup']))
{
    $fid = mysqli_escape_string($con,$_POST['fid']);

    $q1 = $con->query("select count(*) as noofrequest from teacher_follower where follower_id = '$fid'");
    $r1 = $q1->fetch_array();

    if($r1['noofrequest'] < 5)
    {
        echo 'notenough';
    }
    else
    {
        $con->query("update teacher set setprofile = 'yes' where fid = '$fid'");
    }
}

if(isset($_POST['checkhasdata']))
{
    $fid = mysqli_escape_string($con,$_POST['fid']);

    $q1 = $con->query("select * from teacher_degree where fid = '$fid' ");
    $c1 = $q1->num_rows;

    $q2 = $con->query("select * from teacher_college where fid = '$fid' ");
    $c2 = $q2->num_rows;

    $q3 = $con->query("select * from teacher_subject where fid = '$fid' ");
    $c3 = $q3->num_rows;

    $q4 = $con->query("select * from teacher_achievement where fid = '$fid' ");
    $c4 = $q4->num_rows;

    if($c1 == 0)
    {
        echo 'missing';
    }

    else if($c2 == 0)
    {
        echo 'missing';
    }

    else if($c3 == 0)
    {
        echo 'missing';
    }

    else if($c4 == 0)
    {
        echo 'missing';
    }

    else if($c1 != 0 && $c2 != 0 && $c3 != 0 && $c4 != 0)
    {
        echo 'ok';
    }

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

    $con->query("INSERT into teacher_college(college_name,year_from,year_to,fid) values ('$collegetxt','$yearfrom','$yearto','$fid')");

    $q = $con->query("SELECT * from teacher_college where fid = '$fid' and college_name = '$collegetxt' and year_from = '$yearfrom' and year_to = '$yearto' ");
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
