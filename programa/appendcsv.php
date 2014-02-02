<?php
require_once("../classes/class.inputfilter.php");
$ifilter = new InputFilter();
$idExam = $ifilter->process($_POST['idExam']);
$name = $ifilter->process($_POST['name']);
$fecha = $ifilter->process($_POST['fecha']);
$data = $ifilter->process($_POST['data']);
$folder= $ifilter->process($_POST['folder']);
$type= $ifilter->process($_POST['type']);
//name: arr[0], fecha:strDate, data: notaMediaFinal,  folder:'listening', type:'csv'
$nGuardados=0;
//$file=$_SERVER["DOCUMENT_ROOT"]."/web/08_javi/compositions/".$name.'.txt';
$file='../'.$folder.'.'.$type;
//$file='../listening/resultados.csv';

/*
$to      = 'pepearroma@gmail.com';
$subject = 'Fake sendmail test';
$message = 'If we can read this, it means that our fake Sendmail setup works!';
$headers = 'From: jrodenaspua@gmail.com' . "\r\n" .
           'Reply-To: pepearroma@gmail.com' . "\r\n" .
           'X-Mailer: PHP/' . phpversion();

if(mail($to, $subject, $message, $headers)) {
    echo 'Email sent successfully!';
} else {   die('Failure: Email was not sent!'); }
*/
$nGuardados++;
if (isset($data)) {
	
	
	
	
	 $fp = fopen($file,"a");

	$csvData = array ($idExam,$name,$fecha,$data);
   fputcsv($fp, $csvData,";");

   fclose($fp);
   chmod($file, 0777);
   echo 'Se ha guardado correctamente su información! file= '.$file;
}
else {
    echo 'No hay datos que guardar!';
}

?>