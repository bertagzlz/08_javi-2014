<?php
require_once("../classes/class.inputfilter.php");
$ifilter = new InputFilter();
//echo $ifilter->process($_POST['data']);
//echo $ifilter->process($_POST['data']);
$data = $ifilter->process($_POST['data']);
$name = $ifilter->process($_POST['name']);
$folder= $ifilter->process($_POST['folder']);
$type= $ifilter->process($_POST['type']);
//$name = $data.substr($data,0,20);//$ifilter->process($_POST['name']);
$nGuardados=0;
//$file=$_SERVER["DOCUMENT_ROOT"]."/web/08_javi/compositions/".$name.'.txt';
$file='../'.$folder.'/'.$name.'.'.$type;
// sería en el directorio actual
//$file='./'.$folder.'/'.$name.'.'.$type; 
//$file="./compositions/".$name.'.text';
/*foreach ($_FILES as $file) {
	$fileTemp=$dir.$file;
	if (file_exists($fileTemp)) {
		echo "<br/>El archivo ".$file["name"]." ya existe<br/>";
		}
}*/
$nGuardados++;
if (isset($data)) {
    $fp = fopen($file, 'w');
    fwrite($fp, utf8_decode($data));
    fclose($fp);
    chmod($file, 0777);
    echo 'Se ha guardado correctamente su información!';
}
else {
    echo 'No hay datos que guardar!';
}
?>