<?php
  // primero hay que incluir la clase phpmailer para poder instanciar
  //un objeto de la misma
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';

$fileData = file_get_contents("php://input");
$jsonData = json_decode($fileData, true);



  $mail = new PHPMailer(true);                              // Passing `true` enables exceptions
try {
    //Server settings
    $mail->SMTPDebug = 0;                                 // 2 for debugging Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'mx1.hostinger.com.ar';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'mensajeria@sebaalonso.com';                 // SMTP username
    $mail->Password = 'EDl1yjpP5JTi';                           // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                                    // TCP port to connect to
  $mail->CharSet = 'UTF-8';
    //Recipients
    $mail->setFrom('mensajeria@sebaalonso.com', 'Seba Alonso Sitio Web Oficial');
     $mail->addAddress('sebitico@hotmail.com', 'Seba Alonso');       // Add a recipient
   // $mail->addAddress('ellen@example.com');               // Name is optional
    $mail->addReplyTo($jsonData['email'], 'Respuesta de sebaalonso.com');
  //  $mail->addCC('cc@example.com');
   // $mail->addBCC('bcc@example.com');

    //Attachments
   // $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Mensajeria de sebaalonso.com';
    $mail->Body    = 'Mensaje de:<br>'. $jsonData["nombre"].'</b><br>'.$jsonData["msg"].' <br> <a href="mailto:'.$jsonData["email"].'">Responder</a> ';
    $mail->AltBody = 'Mensaje: '.$jsonData['msg'];
    $mail->send();
    echo 'Me enviaste un mensaje, te responderé a la brevedad. 
    Saludos!
    Seba.';
} catch (Exception $e) {
    echo "ocurrio un error al enviar mensaje..";
}



  
?>
