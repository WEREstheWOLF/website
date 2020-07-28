<?php
$_POST['name'];
$name=$_POST['name'];
echo 'Your name is ' . $name;
//if(isset($_POST['form'])){
  $name=%_POST['name'];
  $fp = fopen('data.txt', 'a');
  fwrite($fp, $data);
  fclose($fp);
//}
?>


/*if((isset( $_POST['submit'])){
  echo '<h2>form data retreived using $_REQUEST variable test</h2>'
  $name = $_REQUEST['name'];
  echo 'Your name is ' . $name;
}
if( filter_has_var(INPUT_POST, 'submit' )){
  echo '<h2>form data retreived using $_POST variable test</h2>'
  $name = $_POST['name'];
  echo 'Your name is ' . $name;
}
if( filter_has_var(INPUT_GET, 'submit' )){
  echo '<h2>form data retreived using $_GET variable test</h2>'
  $name = $_GET['name'];
  echo 'Your name is ' . $name;
}*/
