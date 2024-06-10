<?php
if (isset($_POST['email'])) {
  $email_to = "admin@mysmarthome.cba.pl";

  function redirectWithError($message) {
    header("Location: https://rciesielski3.github.io/portfolio.html?error=" . urlencode($message));
    die();
  }

  if (!isset($_POST['first_name']) || !isset($_POST['email']) || !isset($_POST['title']) || !isset($_POST['message'])) {
    redirectWithError('We are sorry, but there appears to be a problem with the form you submitted.');
  }

  $first_name = htmlspecialchars($_POST['first_name']); 
  $title = htmlspecialchars($_POST['title']); 
  $email_from = htmlspecialchars($_POST['email']); 
  $message = htmlspecialchars($_POST['message']); 

  $error_message = "";

  if (!filter_var($email_from, FILTER_VALIDATE_EMAIL)) {
    $error_message .= 'The <b>email address</b> you entered does not appear to be valid.<br />';
  }

  if (strlen($message) < 5) {
    $error_message .= 'The <b>message</b> you entered do not appear to be valid.<br />';
  }

  if (strlen($error_message) > 0) {
    redirectWithError($error_message);
  }

  $email_message = "Form details below.\n\n";

  $email_message .= "Name: " . $first_name . "\n";
  $email_message .= "E-mail: " . $email_from . "\n";
  $email_message .= "Title: " . $title . "\n";
  $email_message .= "Message: " . $message . "\n";

  $email_subject = "[mysmarthome.cba.pl] " . $title;

  $headers = 'From: ' . $email_from . "\r\n" .
    'Reply-To: ' . $email_from . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

  if (mail($email_to, $email_subject, $email_message, $headers)) {
    echo "Thank you for your email. We will be in touch with you very soon.";
  } else {
    echo "There was an error sending your email. Please try again later.";
  }
}
?>
