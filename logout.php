<script type="text/javascript">
	FB.logout(function(response) {
		});
</script>

<?php
session_start();
session_destroy();

header("location:index.php");
?>