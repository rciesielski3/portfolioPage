<?php
if(isset($_POST['email'])) {
    $email_to = "admin@mysmarthome.cba.pl";

    function died($error) {
        echo "We are very sorry, but there were error(s) found with the form you submitted. ";
        echo "These errors appear below.<br /><br />";
        echo $error."<br /><br />";
        echo "<b><u>Please go back and fix these errors.</u></b><br /><br />";
        die();
    }
     
    if(!isset($_POST['first_name']) ||
        !isset($_POST['email']) ||
		!isset($_POST['title']) ||
        !isset($_POST['message'])) {
        died('We are sorry, but there appears to be a problem with the form you submitted.');       
    }
     
    $first_name = $_POST['first_name']; 
    $title = $_POST['title']; 
    $email_from = $_POST['email']; 
    $message = $_POST['message']; 
     
    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
  if(!preg_match($email_exp,$email_from)) {
    $error_message .= 'The <b>email address</b> you entered does not appear to be valid.<br />';
  }
    $string_exp = "/^[A-Za-z .'-]+$/";
  if(!preg_match($string_exp,$first_name)) {
    $error_message .= 'The <b>Name</b> you entered does not appear to be valid.<br />';
  }
  if(!preg_match($string_exp,$title)) {
    $error_message .= 'The <b>subject</b> you entered does not appear to be valid.<br />';
  }
  if(strlen($message) < 5) {
    $error_message .= 'The <b>message</b> you entered do not appear to be valid.<br />';
  }
  if(strlen($error_message) > 0) {
    died($error_message);
  }
    $email_message = "Form details below.\n\n";
     
    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }
     
    $email_message .= "Name: ".clean_string($first_name)."\n";
    $email_message .= "E-mail: ".clean_string($email_from)."\n";
	$email_message .= "Title: ".clean_string($title)."\n";
    $email_message .= "Message: ".clean_string($message)."\n";
     
    $email_subject = "[mysmarthome.cba.pl] ".clean_string($title);
// create email headers
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
@mail($email_to, $email_subject, $email_message, $headers);  
?>
 
Thank you for your email. We will be in touch with you very soon.
 
<?php
}
die();
?>