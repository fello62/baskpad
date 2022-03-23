<?php
$testo = str_replace("\r", "",$_POST['txt']);

header('Content-Type: application/octec-stream');
header('Content-Disposition: attachment; filename=' . $_POST['nomefile']);
header('Content-Length: ' . strlen($testo));
print($testo);
?>