/*
SQLyog - Free MySQL GUI v5.02
Host - 5.6.12-log : Database - teacher_community
*********************************************************************
Server version : 5.6.12-log
*/


create database if not exists `teacher_community`;

USE `teacher_community`;

/*Table structure for table `teacher` */

DROP TABLE IF EXISTS `teacher`;

CREATE TABLE `teacher` (
  `fid` varchar(100) NOT NULL,
  `fdname` varchar(100) NOT NULL,
  `fdimg` text NOT NULL,
  PRIMARY KEY (`fid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `teacher` */

insert into `teacher` values 
('10154100699975395','Maecy Mañago','http://graph.facebook.com/10154100699975395/picture?type=large'),
('10201798902732154','Inno Ferrer','http://graph.facebook.com/10201798902732154/picture?type=large'),
('10204805046406288','Yrvin Naperi Villafuerte','http://graph.facebook.com/10204805046406288/picture?type=large'),
('10209766106130937','Gian Javelona','http://graph.facebook.com/10209766106130937/picture?type=large'),
('1226937477330513','Jeric Nario Gonzales','http://graph.facebook.com/1226937477330513/picture?type=large'),
('1229306243760763','Roland Emmanuel Salunga','http://graph.facebook.com/1229306243760763/picture?type=large'),
('1244836138868584','Vladz Ki','http://graph.facebook.com/1244836138868584/picture?type=large'),
('632268136949265','Cecilia Sol','http://graph.facebook.com/632268136949265/picture?type=large'),
('751829034974854','DoRe MiFa Sol','http://graph.facebook.com/751829034974854/picture?type=large');

/*Table structure for table `teacher_achievement` */

DROP TABLE IF EXISTS `teacher_achievement`;

CREATE TABLE `teacher_achievement` (
  `achievement_id` int(10) NOT NULL AUTO_INCREMENT,
  `fid` varchar(100) NOT NULL,
  `achievement` text NOT NULL,
  `yearawarded` year(4) NOT NULL,
  PRIMARY KEY (`achievement_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `teacher_achievement` */

insert into `teacher_achievement` values 
(1,'751829034974854','2nd Place in Best Thesis',2015),
(2,'751829034974854','Champion in SQL Manipulation',2014),
(3,'751829034974854','Participant in Andriod Developing',2015),
(4,'10209766106130937','Innovator award',2016);

/*Table structure for table `teacher_college` */

DROP TABLE IF EXISTS `teacher_college`;

CREATE TABLE `teacher_college` (
  `college_id` int(10) NOT NULL AUTO_INCREMENT,
  `fid` varchar(100) NOT NULL,
  `college_name` text NOT NULL,
  `year_from` int(10) NOT NULL,
  `year_to` int(10) NOT NULL,
  PRIMARY KEY (`college_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

/*Data for the table `teacher_college` */

insert into `teacher_college` values 
(1,'751829034974854','Sti College Fairview',2000,2005),
(2,'751829034974854','Our Lady of Fatima University',2006,2007),
(3,'751829034974854','AMA University',2007,2008),
(4,'751829034974854','University of the Philippines',2008,2009),
(5,'1229306243760763','Test',2001,0),
(11,'10201798902732154','haha',0,0),
(12,'10154100699975395','Sacr',2009,2013);

/*Table structure for table `teacher_degree` */

DROP TABLE IF EXISTS `teacher_degree`;

CREATE TABLE `teacher_degree` (
  `degree_id` int(10) NOT NULL AUTO_INCREMENT,
  `fid` varchar(100) NOT NULL,
  `bachelor_degree` text NOT NULL,
  `year_from` year(4) NOT NULL,
  `year_to` year(4) NOT NULL,
  PRIMARY KEY (`degree_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

/*Data for the table `teacher_degree` */

insert into `teacher_degree` values 
(6,'751829034974854','Bachelor of Science in Information Technology',2016,2017),
(7,'10201798902732154','Bachelor of Science in Information Technology',2012,2016);

/*Table structure for table `teacher_follower` */

DROP TABLE IF EXISTS `teacher_follower`;

CREATE TABLE `teacher_follower` (
  `follow_id` int(10) NOT NULL AUTO_INCREMENT,
  `follower_id` varchar(100) NOT NULL,
  `following_id` varchar(100) NOT NULL,
  `follower_status` varbinary(100) NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`follow_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `teacher_follower` */

insert into `teacher_follower` values 
(2,'10154100699975395','751829034974854','pending'),
(3,'751829034974854','632268136949265','pending');

/*Table structure for table `teacher_post` */

DROP TABLE IF EXISTS `teacher_post`;

CREATE TABLE `teacher_post` (
  `post_id` int(10) NOT NULL AUTO_INCREMENT,
  `fid` varchar(100) NOT NULL,
  `post` text NOT NULL,
  `file_rename` text NOT NULL,
  `file_realname` text NOT NULL,
  `file_path` text NOT NULL,
  `file_extension` text NOT NULL,
  `url_url` text NOT NULL,
  `url_title` text NOT NULL,
  `url_desc` text NOT NULL,
  `url_img` text NOT NULL,
  `date_post` datetime NOT NULL,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

/*Data for the table `teacher_post` */

insert into `teacher_post` values 
(1,'751829034974854','www.orangeapps.ph','','','','','http://www.orangeapps.ph','OrangeApps | School Management System','OrangeApps school management system allows schools to manage its entire operation from online enrollment,grading,tuition fee monitoring and online learning.','http://www.orangeapps.ph/img/facebook.jpg?random=1468102072092','2016-07-10 06:07:55'),
(2,'751829034974854','www.orangeapps.ph','','','','','http://www.orangeapps.ph','OrangeApps | School Management System','OrangeApps school management system allows schools to manage its entire operation from online enrollment,grading,tuition fee monitoring and online learning.','http://www.orangeapps.ph/img/facebook.jpg?random=1468102210756','2016-07-10 06:10:14'),
(3,'751829034974854','hahaha','','','','','','','','','2016-07-10 06:11:13'),
(4,'751829034974854','heh','','','','','','','','','2016-07-10 06:12:28'),
(5,'751829034974854','pelase','','','','','','','','','2016-07-10 06:13:31'),
(6,'751829034974854','hahahahha','','','','','','','','','2016-07-10 06:15:42'),
(7,'751829034974854','qwer','','','','','','','','','2016-07-10 06:17:26'),
(8,'751829034974854','qwerty','','','','','','','','','2016-07-10 06:24:43'),
(9,'751829034974854','trewq','','','','','','','','','2016-07-10 06:24:48');

/*Table structure for table `teacher_post_comment` */

DROP TABLE IF EXISTS `teacher_post_comment`;

CREATE TABLE `teacher_post_comment` (
  `comment_id` int(10) NOT NULL AUTO_INCREMENT,
  `post_id` int(10) NOT NULL,
  `fid` varchar(100) NOT NULL,
  `comment` text NOT NULL,
  `attachment` text NOT NULL,
  `date_comment` date NOT NULL,
  `time_comment` time NOT NULL,
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `teacher_post_comment` */

insert into `teacher_post_comment` values 
(1,27,'10201798902732154','Yay','','2016-07-07','15:45:20'),
(2,27,'10201798902732154','Hello','','2016-07-07','15:49:32'),
(3,27,'10209766106130937','hahaha','','2016-07-07','15:54:29'),
(4,9,'751829034974854','hello','','2016-07-08','19:25:00');

/*Table structure for table `teacher_post_like` */

DROP TABLE IF EXISTS `teacher_post_like`;

CREATE TABLE `teacher_post_like` (
  `like_id` int(10) NOT NULL AUTO_INCREMENT,
  `fid` varchar(100) NOT NULL,
  `post_id` int(10) NOT NULL,
  PRIMARY KEY (`like_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `teacher_post_like` */

/*Table structure for table `teacher_recommendation` */

DROP TABLE IF EXISTS `teacher_recommendation`;

CREATE TABLE `teacher_recommendation` (
  `recommendation_id` int(10) NOT NULL AUTO_INCREMENT,
  `profile_id` varchar(100) NOT NULL,
  `recommend_by` varchar(100) NOT NULL,
  `recommendation` text NOT NULL,
  `date_sent` date NOT NULL,
  `time_sent` time NOT NULL,
  PRIMARY KEY (`recommendation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

/*Data for the table `teacher_recommendation` */

insert into `teacher_recommendation` values 
(1,'10201798902732154','751829034974854','asd','2016-07-07','16:25:17'),
(2,'10201798902732154','751829034974854','adsfasfa','2016-07-07','16:26:06'),
(3,'10201798902732154','751829034974854','asd','2016-07-07','16:26:36'),
(4,'10154100699975395','10209766106130937','Great dev!','2016-07-07','16:29:06'),
(5,'10209766106130937','10154100699975395','Testing 123','2016-07-07','16:30:26'),
(6,'10201798902732154','751829034974854','asdasd','2016-07-07','16:32:19'),
(7,'10201798902732154','751829034974854','asdasd','2016-07-07','16:33:04'),
(8,'10201798902732154','751829034974854','asd','2016-07-07','16:34:02');

/*Table structure for table `teacher_seminar` */

DROP TABLE IF EXISTS `teacher_seminar`;

CREATE TABLE `teacher_seminar` (
  `seminar_id` int(10) NOT NULL AUTO_INCREMENT,
  `fid` varchar(100) NOT NULL,
  `seminar` text NOT NULL,
  `date_attended` date NOT NULL,
  PRIMARY KEY (`seminar_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `teacher_seminar` */

/*Table structure for table `teacher_subject` */

DROP TABLE IF EXISTS `teacher_subject`;

CREATE TABLE `teacher_subject` (
  `subj_id` int(10) NOT NULL AUTO_INCREMENT,
  `fid` varchar(100) NOT NULL,
  `subj_name` text NOT NULL,
  PRIMARY KEY (`subj_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

/*Data for the table `teacher_subject` */

insert into `teacher_subject` values 
(7,'751829034974854','Economics'),
(8,'751829034974854','Advance Programming'),
(9,'1229306243760763','1'),
(10,'10209766106130937','Programmibg');
