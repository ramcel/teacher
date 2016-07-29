// $(document).ready(function() {
//     swal({
//         title: "Welcome to \n Teacher's Community \n \n " + $(".fdname").text(),
//         imageUrl: "logo.jpg"
//     });
// });


$(".connect").click(function(){
    var aa  = $(this);
    var id  = aa.attr('id');
    var btntxt = aa.text();

    if(btntxt == 'Connect')
    {
        $.ajax({
            url     : 'setprofile-data.php',
            type    : 'POST',
            data    : 'connect=1' + '&followerid=' + fid + '&followingid=' + id,
            success : function(data)
            {
                aa.removeClass('btn-primary');
                aa.addClass('btn-danger');
                aa.text("Cancel");
            }
        });
    }

    if(btntxt == 'Cancel')
    {
        $.ajax({
            url     : 'setprofile-data.php',
            type    : 'POST',
            data    : 'cancel=1' + '&followerid=' + fid + '&followingid=' + id,
            success : function(data)
            {
                aa.removeClass('btn-danger');
                aa.addClass('btn-primary');
                aa.text("Connect");
            }
        });
    }
})


$(".nextbackbtn").click(function(){
    var aa = $(this);
    var btntxt = aa.text();

    if(btntxt == 'Next')
    {
        $.ajax({
            url     : 'setprofile-data.php',
            type    : 'POST',
            data    : 'checkhasdata=1' + '&fid=' + fid,
            success : function(data)
            {

                if(data == 'missing')
                {
                    swal({
                        title: "Please Fill Up All Information"
                    });
                }

                if(data == 'ok')
                {
                    aa.text("Back");
                    $(".skipbtn").text("Save");
                    $("#profile").tab("show");

                    $(".profiletab").removeClass('active');
                    $(".connectiontab").removeClass('disabled');
                    $(".connectiontab").addClass("active");

                    $("#profile").removeClass('active');
                    $("#connections").addClass('active');
                }
            }
        });
    }

    if(btntxt == 'Back')
    {
        aa.text("Next");
        $(".skipbtn").text("Skip");

        $(".connectiontab").removeClass('active');
        $(".connectiontab").addClass('disabled');
        $(".profiletab").addClass("active");

        $("#connections").removeClass('active');
        $("#profile").addClass('active');
    }
});

$('.skipbtn').click(function(){
    var btntxt = $(".skipbtn").text();

    if(btntxt == "Skip")
    {
        $(".nextbackbtn").text("Back");
        $(".skipbtn").text("Save");
        $("#profile").tab("show");

        $(".profiletab").removeClass('active');
        $(".connectiontab").removeClass('disabled');
        $(".connectiontab").addClass("active");

        $("#profile").removeClass('active');
        $("#connections").addClass('active');
    }

    if(btntxt == "Save")
    {
        $.ajax({
            url     : 'setprofile-data.php',
            type    : 'POST',
            data    : 'savesetup=1' + '&fid=' + fid,
            success : function(data)
            {
                if(data == 'notenough')
                {
                    swal({
                        title: "Connection Request must be more than 5 request"
                    });
                }
                else
                {
                    $(window).attr('location','home.php');
                }
            }
        });
    }
})

$(document).on('click','.skipno',function(){
    $('#modal').modal("hide");
})

$(document).on('click','.skipyes',function(){

    $.ajax({
        url     : 'setprofile-data.php',
        type    : 'POST',
        data    : 'skipsetup=1' + '&fid=' + fid,
        success : function(data)
        {
            $('#modal').modal("hide");
            $(window).attr('location','home.php');
        }
    });

    //window.location.replace("home.php");
})

var fid = $("#fid").val();
loadcollge();
loadsubj();
loadachievement();
loaddegree();

function loaddegree()
{
    $.ajax({

        url      : 'setprofile-data.php',
        type     : 'POST',
        data     : 'loaddegree=1' + '&fid=' + fid,
        dataType : 'JSON',
        success  : function(data)
        {
            for(var i = 0; i < data.length; i++)
            {
                var degree = data[i].degree;
                var degreeid = data[i].degreeid;
                var yearfrom = data[i].yearfrom;
                var yearto = data[i].yearto;

                var tobeappend = ""+
                                "<div class='well col-xs-12 col-md-12 welldegree"+degreeid+"'>"+

                                    "<table style='width:100%;'>"+
                                        "<tr>"+
                                            "<td style='width:90%;'>"+
                                                "<p class='header'>"+
                                                degree+
                                                "</p>"+
                                                "<p class='subheader'>"+
                                                yearfrom +
                                                " - "+
                                                yearto+
                                                "</p>"+
                                            "</td>"+

                                            "<td style='width:90%;vertical-align:top;text-align:right;'>"+
                                                "<button class='btn btn-xs btn-link deletedegree' id='"+degreeid+"' data-toggle='modal' data-target='#modal'><span class='glyphicon glyphicon-remove'></span></button> "+
                                            "</td>"+
                                        "</tr>"+
                                    "</table>"
                                "</div>"+
                                "";

                $(".degreecontainer").append(tobeappend);
            }
        }

    });
}

function loadachievement()
{
    $.ajax({

        url      : 'setprofile-data.php',
        type     : 'POST',
        data     : 'loadachievement=1' + '&fid=' + fid,
        dataType : 'JSON',
        success  : function(data)
        {
            for(var i = 0; i < data.length; i++)
            {
                var achievementid = data[i].achievementid;
                var achievement = data[i].achievement;
                var yearawarded = data[i].yearawarded;

                var tobeappend = ""+
                                "<div class='well col-xs-12 col-md-12 wellachievement"+achievementid+"'>"+
                                    "<table style='width:100%;'>"+
                                        "<tr>"+
                                            "<td style='width:90%;'>"+
                                                "<p class='header'>"+
                                                achievement+
                                                "</p>"+
                                                "<p class='subheader'>"+
                                                yearawarded+
                                                "</p>"+
                                            "</td>"+

                                            "<td style='width:90%;vertical-align:top;text-align:right;'>"+
                                                "<button class='btn btn-xs btn-link deleteachievement' id='"+achievementid+"' data-toggle='modal' data-target='#modal'><span class='glyphicon glyphicon-remove'></span></button> "+
                                            "</td>"+
                                        "</tr>"+
                                    "</table>"
                                "</div>"+
                                "";
                $(".achievementcontainer").append(tobeappend);
            }
        }

    });
}

function loadsubj()
{
    $.ajax({

        url      : 'setprofile-data.php',
        type     : 'POST',
        data     : 'loadsubj=1' + '&fid=' + fid,
        dataType : 'JSON',
        success  : function(data)
        {
            for(var i = 0; i < data.length; i++)
            {
                var subjid = data[i].subjid;
                var subject = data[i].subject;

                var tobeappend = ""+
                                "<div class='well col-xs-12 col-md-12 wellsubj"+subjid+"'>"+
                                    "<table style='width:100%;'>"+
                                        "<tr>"+
                                            "<td style='width:90%;'>"+
                                                "<p class='header'>"+
                                                subject+
                                                "</p>"+
                                            "</td>"+

                                            "<td style='width:90%;vertical-align:top;text-align:right;'>"+
                                                "<input type='hidden' id='subjid' value='"+subjid+"' />"+
                                                "<button class='btn btn-xs btn-link deletesubj' id='"+subjid+"' data-toggle='modal' data-target='#modal'><span class='glyphicon glyphicon-remove'></span></button> "+
                                            "</td>"+
                                        "</tr>"+
                                    "</table>"
                                "</div>"+
                                "";
                $(".subjectcontainer").append(tobeappend);
            }
        }

    });
}

function loadcollge()
{
    $.ajax({

        url      : 'setprofile-data.php',
        type     : 'POST',
        data     : 'loadcollge=1' + '&fid=' + fid,
        dataType : 'JSON',
        success  : function(data)
        {
            for(var i = 0; i < data.length; i++)
            {
                var collegename = data[i].collegename;
                var collegeid = data[i].collegeid;
                var yearfrom = data[i].yearfrom;
                var yearto = data[i].yearto;

                var tobeappend = ""+
                                "<div class='well col-xs-12 col-md-12 welloccupation"+collegeid+"'>"+

                                    "<table style='width:100%;'>"+
                                        "<tr>"+
                                            "<td style='width:90%;'>"+
                                                "<p class='header'>"+
                                                collegename+
                                                "</p>"+
                                                "<p class='subheader'>"+
                                                yearfrom +
                                                " - "+
                                                yearto+
                                                "</p>"+
                                            "</td>"+

                                            "<td style='width:90%;vertical-align:top;text-align:right;'>"+
                                                "<button class='btn btn-xs btn-link deleteoccupation' id='"+collegeid+"' data-toggle='modal' data-target='#modal'><span class='glyphicon glyphicon-remove'></span></button> "+
                                            "</td>"+
                                        "</tr>"+
                                    "</table>"
                                "</div>"+
                                "";
                $(".collogecontainer").append(tobeappend);
            }
        }

    });
}

//DELETE MODAL FOR DEGREE
$(document).on('click','.deletedegree',function(){
    var degreeid = $(this).attr('id');
    var degree = $(this).parents('tr').children('td').eq(0).children('.header').text();

    var tobeappend = ""+
                        "Are you sure you want to delete " + degree + "?"+
                        "<br><br>"+
                        "<button class='btn btn-danger btn-md deleteyesdegree'><span class='fa fa-check'></span> YES</button> "+
                        "<button class='btn btn-warning btn-md deletenodegree'><span class='glyphicon glyphicon-remove'></span> NO</button> "+
                        "<input type='hidden' id='degreeididhidden' value='"+degreeid+"' />"+
                        "";

    $("#modallabel").text("Delete Bachelor Degree");
    $("#modalcontainer").append(tobeappend);
    //$('#modal').modal();
})

//DELETE MODAL FOR ACHIEVEMENT
$(document).on('click','.deleteachievement',function(){
    var achievementid = $(this).attr('id');
    var achievement = $(this).parents('tr').children('td').eq(0).children('h3').text();

    var tobeappend = ""+
                        "Are you sure you want to delete " + achievement + "?"+
                        "<br><br>"+
                        "<button class='btn btn-danger btn-md deleteyesachievement'><span class='fa fa-check'></span> YES</button> "+
                        "<button class='btn btn-warning btn-md deletenoachievement'><span class='glyphicon glyphicon-remove'></span> NO</button> "+
                        "<input type='hidden' id='achievementididhidden' value='"+achievementid+"' />"+
                        "";

    $("#modallabel").text("Delete Achievement");
    $("#modalcontainer").append(tobeappend);
    //$('#modal').modal();
})

//DELETE MODAL FOR OCCUPATION
$(document).on('click','.deleteoccupation',function(){
    var occupation = $(this).parents('tr').children('td').eq(0).children('.header').text();
    var divparent = $(this).attr('id');

    var tobeappend = ""+
                        "Are you sure you want to delete " + occupation + "?"+
                        "<br><br>"+
                        "<button class='btn btn-danger btn-md deleteyesoccupation'><span class='fa fa-check'></span> YES</button> "+
                        "<button class='btn btn-warning btn-md deletenooccupation'><span class='glyphicon glyphicon-remove'></span> NO</button> "+
                        "<input type='hidden' id='occupationhidden' value='"+occupation+"' />"+
                        "<input type='hidden' id='divparent' value='"+divparent+"' />"+
                        "";

    $("#modallabel").text("Delete Occupation");
    $("#modalcontainer").append(tobeappend);
    //$('#modal').modal();
})

//DELETE MODAL FOR SUBJECT
$(document).on('click','.deletesubj',function(){
    var subjid = $(this).attr('id');
    var subject = $(this).parents('tr').children('td').eq(0).children('h4').text();

    var tobeappend = ""+
                        "Are you sure you want to delete " + subject + "?"+
                        "<br><br>"+
                        "<button class='btn btn-danger btn-md deleteyessubject'><span class='fa fa-check'></span> YES</button> "+
                        "<button class='btn btn-warning btn-md deletenosubject'><span class='glyphicon glyphicon-remove'></span> NO</button> "+
                        "<input type='hidden' id='subjidhidden' value='"+subjid+"' />"+
                        "";

    $("#modallabel").text("Delete Subject");
    $("#modalcontainer").append(tobeappend);
    //$('#modal').modal();
})

//YES BUTTON FOR DELETE IN DEGREE
$(document).on('click','.deleteyesdegree',function(){

    var degreeidid = $("#degreeididhidden").val();

    $.ajax({
        url      : 'setprofile-data.php',
        type     : 'POST',
        data     : 'deletedegree=1' + '&degreeid=' + degreeidid,
        success  : function(data)
        {
            $(".welldegree"+degreeidid).slideUp();
        }
    });

    $('#modal').modal("hide");
})

//NO BUTTON FOR DELETE IN DEGREE
$(document).on('click','.deletenodegree',function(){
    $('#modal').modal("hide");
})

//YES BUTTON FOR DELETE IN OCCUPATION
$(document).on('click','.deleteyesoccupation',function(){

    var occupation = $("#occupationhidden").val();
    var divparent = $("#divparent").val();

    $.ajax({
        url      : 'setprofile-data.php',
        type     : 'POST',
        data     : 'deleteoccupation=1' + '&occupation=' + occupation,
        success  : function(data)
        {
            $("#"+divparent).parents('.well').slideUp();
        }
    });

    $('#modal').modal("hide");
})

//NO BUTTON FOR DELETE IN OCCUPATION
$(document).on('click','.deletenooccupation',function(){
    $('#modal').modal("hide");
})

//YES BUTTON FOR DELETE IN SUBJECT
$(document).on('click','.deleteyessubject',function(){
    var subjid = $("#subjidhidden").val();

    $.ajax({
        url      : 'setprofile-data.php',
        type     : 'POST',
        data     : 'deletesubj=1' + '&subjid=' + subjid,
        success  : function(data)
        {
            $(".wellsubj"+subjid).slideUp();
        }
    });

    $('#modal').modal("hide");
})

//NO BUTTON FOR DELETE IN SUBJECT
$(document).on('click','.deletenosubject',function(){
    $('#modal').modal("hide");
})

//YES BUTTON FOR DELETE IN ACHIEVEMENT
$(document).on('click','.deleteyesachievement',function(){
    var achievementid = $("#achievementididhidden").val();

    $.ajax({
        url      : 'setprofile-data.php',
        type     : 'POST',
        data     : 'deleteachievement=1' + '&achievementid=' + achievementid,
        success  : function(data)
        {
            $(".wellachievement"+achievementid).slideUp();
        }
    });

    $('#modal').modal("hide");
})

//NO BUTTON FOR DELETE IN ACHIEVEMENT
$(document).on('click','.deletenoachievement',function(){
    $('#modal').modal("hide");
})


//ADD OCCUPATION
$(document).on('submit','#addcollege',function(e){
    e.preventDefault();

    var collegetxt = $("#collegetxt").val();
    var yearfrom = $("#yearfrom").val();
    var yearto = $("#yearto").val();

    if(yearfrom == "")
    {
        $("#yearfrom").css('border-color','red');
    }
    else
    {
        $("#yearfrom").css('border-color','green');
    }

    if(yearto == "")
    {
        $("#yearto").css('border-color','red');
    }
    else
    {
        $("#yearto").css('border-color','green');
    }

    if(collegetxt == "")
    {
        $("#collegetxt").css('border-color','red');
    }
    else
    {
        $("#collegetxt").css('border-color','green');
    }

    if(yearfrom > yearto || yearto == "")
    {
        $("#yearto").css('border-color','red');
    }
    else
    {
        $("#yearto").css('border-color','green');
    }

    if(yearfrom != "" && yearto != "" && collegetxt != "" && yearfrom <= yearto)
    {
        $.ajax({

            url      : 'setprofile-data.php',
            type     : 'POST',
            data     : 'addcollege=1' + '&collegetxt=' + collegetxt + '&yearfrom=' + yearfrom + '&yearto=' + yearto + '&fid=' + fid,
            success  : function(data)
            {
                var tobeappend = ""+
                                    "<div class='well col-xs-12 col-md-6 welloccupation"+data+"''>"+
                                        "<table style='width:100%;'>"+
                                            "<tr>"+
                                                "<td style='width:90%;'>"+
                                                    "<p class='header'>"+
                                                    collegetxt+
                                                    "</p>"+
                                                    "<p class='subheader'>"+
                                                    yearfrom +
                                                    " - "+
                                                    yearto+
                                                    "</p>"+
                                                "</td>"+

                                                "<td style='width:90%;vertical-align:top;text-align:right;'>"+
                                                    "<button class='btn btn-xs btn-link deleteoccupation' id='"+data+"' data-toggle='modal' data-target='#modal'><span class='glyphicon glyphicon-remove'></span></button> "+
                                                "</td>"+
                                            "</tr>"+
                                        "</table>"
                                    "</div>"+
                                    "";

                $("#collegetxt").css('border-color','#ccc');
                $("#yearfrom").css('border-color','#ccc');
                $("#yearto").css('border-color','#ccc');

                $("#collegetxt").val("");
                $("#yearfrom").val("");
                $("#yearto").val("");

                $(".collogecontainer").append(tobeappend);
                $(".addoccupationformdiv").slideToggle();
            }

        });
    }
})

//ADD SUBJECT
$(document).on('submit','#addsubject',function(e){
    e.preventDefault();

    var subject = $("#subject").val();

    if(subject == "")
    {
        $("#subject").css('border-color','red');
    }
    else
    {
        $("#subject").css('border-color','green');

        $.ajax({
            url      : 'setprofile-data.php',
            type     : 'POST',
            data     : 'addsubject=1' + '&subject=' + subject + '&fid=' + fid,
            success  : function(data)
            {
                var subjid = data;

                var tobeappend = ""+
                                "<div class='well col-xs-12 col-md-6 wellsubj"+subjid+"'>"+
                                    "<table style='width:100%;'>"+
                                        "<tr>"+
                                            "<td style='width:90%;'>"+
                                                "<p class='header'>"+
                                                subject+
                                                "</p>"+
                                            "</td>"+

                                            "<td style='width:90%;vertical-align:top;text-align:right;'>"+
                                                "<input type='hidden' id='subjid' value='"+subjid+"' />"+
                                                "<button class='btn btn-xs btn-link deletesubj' id='"+subjid+"' data-toggle='modal' data-target='#modal'><span class='glyphicon glyphicon-remove'></span></button> "+
                                            "</td>"+
                                        "</tr>"+
                                    "</table>"
                                "</div>"+
                                "";

                    $("#subject").css('border-color','#ccc');
                    $("#subject").val("");
                    $(".subjectcontainer").append(tobeappend);
                    $(".addsubjectformdiv").slideToggle();
            }
        })
    }
})

//ADD ACHIEVEMENT
$(document).on('submit','#addachievement',function(e){
    e.preventDefault();

    var achievement = $("#achievement").val();
    var yearawarded = $("#yearawarded").val();

    if(yearawarded == "")
    {
        $("#yearawarded").css('border-color','red');
    }
    else
    {
        $("#yearawarded").css('border-color','green');
    }

    if(achievement == "")
    {
        $("#achievement").css('border-color','red');
    }
    else
    {
        $("#achievement").css('border-color','green');
    }

    if(achievement != "" && yearawarded != "")
    {
        $.ajax({
            url      : 'setprofile-data.php',
            type     : 'POST',
            data     : 'addachievement=1' + '&achievement=' + achievement + '&yearawarded=' + yearawarded + '&fid=' + fid,
            success  : function(data)
            {
                var achievementid = data;

                var tobeappend = ""+
                                "<div class='well col-xs-12 col-md-6 wellachievement"+achievementid+"'>"+
                                    "<table style='width:100%;'>"+
                                        "<tr>"+
                                            "<td style='width:90%;'>"+
                                                "<p class='header'>"+
                                                achievement+
                                                "</p>"+
                                                "<p class='subheader'>"+
                                                yearawarded +
                                                "</p>"+
                                            "</td>"+

                                            "<td style='width:90%;vertical-align:top;text-align:right;'>"+
                                                "<button class='btn btn-xs btn-link deleteachievement' id='"+achievementid+"' data-toggle='modal' data-target='#modal'><span class='glyphicon glyphicon-remove'></span></button> "+
                                            "</td>"+
                                        "</tr>"+
                                    "</table>"
                                "</div>"+
                                "";

                    $("#achievement").css('border-color','#ccc');
                    $("#yearawarded").css('border-color','#ccc');
                    $("#achievement").val("");
                    $("#yearawarded").val("");
                    $(".achievementcontainer").append(tobeappend);
                    $(".addawardsformdiv").slideToggle();
            }
        })
    }
})

//ADD DEGREE
$(document).on('submit','#adddegree',function(e){
    e.preventDefault();

    var degree = $("#degree").val();
    var yearfrom = $("#yearfromdegree").val();
    var yearto = $("#yeartodegree").val();

    if(yearfrom == "")
    {
        $("#yearfromdegree").css('border-color','red');
    }
    else
    {
        $("#yearfromdegree").css('border-color','green');
    }

    if(yearto == "")
    {
        $("#yeartodegree").css('border-color','red');
    }
    else
    {
        $("#yeartodegree").css('border-color','green');
    }

    if(degree == "")
    {
        $("#degree").css('border-color','red');
    }
    else
    {
        $("#degree").css('border-color','green');
    }

    if(yearfrom > yearto || yearto == "")
    {
        $("#yeartodegree").css('border-color','red');
    }
    else
    {
        $("#yeartodegree").css('border-color','green');
    }

    if(yearfrom != "" && yearto != "" && degree != "" && yearfrom <= yearto)
    {
        $.ajax({

            url      : 'setprofile-data.php',
            type     : 'POST',
            data     : 'adddegree=1' + '&degree=' + degree + '&yearfrom=' + yearfrom + '&yearto=' + yearto + '&fid=' + fid,
            success  : function(data)
            {

                var tobeappend = ""+
                                "<div class='well col-xs-12 col-md-6 welldegree"+data+"'>"+

                                    "<table style='width:100%;'>"+
                                        "<tr>"+
                                            "<td style='width:90%;'>"+
                                                "<p class='header'>"+
                                                degree+
                                                "</p>"+
                                                "<p class='subheader'>"+
                                                yearfrom +
                                                " - "+
                                                yearto+
                                                "</p>"+
                                            "</td>"+

                                            "<td style='width:90%;vertical-align:top;text-align:right;'>"+
                                                    "<button class='btn btn-xs btn-link deletedegree' id='"+data+"' data-toggle='modal' data-target='#modal'><span class='glyphicon glyphicon-remove'></span></button> "+
                                                "</td>"+
                                        "</tr>"+
                                    "</table>"
                                "</div>"+
                                "";

                $("#degree").css('border-color','#ccc');
                $("#yearfromdegree").css('border-color','#ccc');
                $("#yeartodegree").css('border-color','#ccc');

                $("#degree").val("");
                $("#yearfromdegree").val("");
                $("#yeartodegree").val("");

                $(".degreecontainer").append(tobeappend);
                $(".adddegreeformdiv").slideToggle();
            }

        });
    }
})


$('#modal').on('hidden.bs.modal',function(){
    $("#modalcontainer").empty();
    $("#modallabel").text('');
});


$(".addoccupationtoggle").click(function(){
    $(".addoccupationformdiv").slideToggle();
})

$(".addsubjecttoggle").click(function(){
    $(".addsubjectformdiv").slideToggle();
})

$(".addawardstoggle").click(function(){
    $(".addawardsformdiv").slideToggle();
})

$(".adddegreettoggle").click(function(){
    $(".adddegreeformdiv").slideToggle();
})
