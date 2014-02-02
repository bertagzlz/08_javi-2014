<?php

$to      = 'pepearroma@gmail.com';
$subject = 'Fake sendmail test';
$message = 'If we can read this, it means that our fake Sendmail setup works!';
$headers = 'From: jrodenaspua@gmail.com' . "\r\n" .
           'Reply-To: pepearroma@gmail.com' . "\r\n" .
           'X-Mailer: PHP/' . phpversion();

if(mail($to, $subject, $message, $headers)) {
    echo 'Email sent successfully!';
} else {
    die('Failure: Email was not sent!');
}
/*


require_once "Mail.php";

$from = 'jrodenaspua@gmail.com';
$to = 'pepearroma@gmail.com';
$subject = 'Hi!';
$body = "Hi,\n\nHow are you?";

$headers = array(
    'From' => $from,
    'To' => $to,
    'Subject' => $subject
);
//auth_username=jrodenaspua@gmail.com	
//auth_password=K4Gv&xXw^g

$smtp = Mail::factory('smtp', array(
        'host' => 'ssl://smtp.gmail.com',
        'port' => '465',
        'auth' => true,
        'username' => 'jrodenaspua@gmail.com',
        'password' => 'K4Gv&xXw^g'
    ));

$mail = $smtp->send($to, $headers, $body);

if (PEAR::isError($mail)) {
    echo('<p>' . $mail->getMessage() . '</p>');
} else {
    echo('<p>Message successfully sent!</p>');
}
*/




?>