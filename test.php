<!DOCTYPE html>
<html>
<body>
  <?php
  // These code snippets use an open-source library. http://unirest.io/php
$response = Unirest\Request::get("https://name-gender.p.mashape.com/getGender?country=us&language=en&name=John",
array(
  "X-Mashape-Key" => "<required>",
  "Accept" => "application/json"
)
);
echo json_decode($response);
  ?>
</body>
</html>
