
<!--
<script src="bootstrap/js/jquery.js"></script>
-->
<script src="http://hammerjs.github.io/dist/hammer.min.js"></script>
<script src="http://hammerjs.github.io/dist/hammer-time.min.js"></script>
<script>

$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#searchbox").slideToggle(100);
    $("#wrapper").toggleClass("toggled");

});



$(document).on('keyup','#searchbox',function(){
	var searchbox = $(this).val();
	var parentwidth = $(this).width();

	$("#display").empty();

	if(searchbox=='')
	{
		$("#display").hide();
	}
	else
	{
		$.ajax({

			url     : "home-data.php",
			type    : "POST",
			data    : 'loadsearch=1' + '&search=' + searchbox + '&fid=' + fid,
			success : function(data)
			{
				if(data.length == 0)
				{
					$("#display").width(parentwidth+24);
					$("#display").text("No Result Found.").show();
				}
				else
				{
					$("#display").width(parentwidth+24);
					$("#display").append(data).show();
				}
			}
		});
	}
});







// $(document).on('click','.connectionstopbtn',function(){
// 	$(".connectionstopbtn").addClass('active');
// 	$(".requesttopbtn").removeClass('active');
// 	$(".suggestionstopbtn").removeClass('active');
//
// 	$("#requestdiv").empty();
// 	$("#connectionsdiv").empty();
// 	$("#findotherconnectionsdiv").empty();
// 	loadconnections();
// })
//
// $(document).on('click','.requesttopbtn',function(){
// 	$(".connectionstopbtn").removeClass('active');
// 	$(".requesttopbtn").addClass('active');
// 	$(".suggestionstopbtn").removeClass('active');
//
// 	$("#requestdiv").empty();
// 	$("#connectionsdiv").empty();
// 	$("#findotherconnectionsdiv").empty();
// 	loadrequest();
// })
//
// $(document).on('click','.suggestionstopbtn',function(){
// 	$(".connectionstopbtn").removeClass('active');
// 	$(".requesttopbtn").removeClass('active');
// 	$(".suggestionstopbtn").addClass('active');
//
// 	$("#requestdiv").empty();
// 	$("#connectionsdiv").empty();
// 	$("#findotherconnectionsdiv").empty();
// 	loadteacheryoumayknow();
// })



//
// $(function(){
// var connectionsdiv = document.getElementById("connectionsdiv");
// Hammer(connectionsdiv).on("swipeleft", function() {
//   if ($('#wrapper').hasClass('toggled')){
//
//   } else {
//       $(".requesttopbtn").trigger('click');
//       $(".connectionstopbtn").removeClass('active');
//     }
//
//
// });
// });
//
// $(function(){
// var requestdiv = document.getElementById("requestdiv");
// Hammer(requestdiv).on("swipeleft", function() {
//   if ($('#wrapper').hasClass('toggled')){
//
//   } else {
//       $(".suggestionstopbtn").trigger('click');
//     }
//
// });
// });


// //Right
// $(function(){
// var requestdiv = document.getElementById("requestdiv");
// Hammer(requestdiv).on("swiperight", function() {
//   if ($('#wrapper').hasClass('toggled')){
//
//   } else {
//       $(".connectionstopbtn").trigger('click');
//     }
//
// });
// });


// var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
// $('#body').bind(mousewheelevt, function(e){
//
//     var evt = window.event || e //equalize event object
//     evt = evt.originalEvent ? evt.originalEvent : evt; //convert to originalEvent if possible
//     var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta //check for detail first, because it is used by Opera and FF
//
//     if(delta > 0) {
//         //scroll up
//           $(".navbar-ex1-collapse").slideDown();
//
//         // alert('up');
//     }
//     else{
//         //scroll down
//           $(".navbar-ex1-collapse").slideUp();
//
//         // alert('down');
//
//     }
// });
// if ($('#wrapper3').on()){
//     $(".navbar-ex1-collapse").hide();
//   } else {
//
//     }
//
// });
$(".navbar-ex1-collapse").show();


var lastScrollTop = 0;
$(document).scroll(function(event){
   var st = $(this).scrollTop();
   if (st > lastScrollTop){
       // downscroll code
       $(".navbar-ex1-collapse").slideUp("fast");
   } else {
      // upscroll code
        $(".navbar-ex1-collapse").slideDown("fast");
   }
   lastScrollTop = st;
});


//Right
// $(function(){
// var wrapper2 = document.getElementById("wrapper2");
// Hammer(wrapper2).on("swiperight", function() {
//   if ($('#wrapper2').ready()){
//     $("#profile").trigger('click');
//   } else {
//
//     }
//
// });
// });
// $(function(){
// var body = document.getElementById("body");
// Hammer(body).on("swipeleft", function() {
//   $("#profile").trigger('click');
//
// });
// });


// $(function(){
// var body = document.getElementById("body");
// Hammer(body).on("swipeleft", function() {
//   $("#searchbox").slideDown(100);
//   $("#wrapper").removeClass("toggled");
//   $("#page-content-wrapper").fadeTo(100, 1);
//   $("#profile").trigger('click');
//
// });
//
// Hammer(body).on("swiperight", function() {
//   $("#searchbox").slideUp(100);
//   $("#wrapper").addClass("toggled");
//   $("#page-content-wrapper").fadeTo(100, 0.6);
//
// });
// });


</script>
