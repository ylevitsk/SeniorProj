<?php
$q = rawurldecode($_REQUEST["q"]);
$q = str_replace("\n", "\r\n", $q);
$v = explode(",", $_REQUEST["v"]);
$l = $_REQUEST["l"];
$result = "Errors in code";    
$str = "python code.py ";
$str2 = "python -m pdb code.py ";

if ($l == "0"){
    unlink("script.txt");
    $script = fopen("script.txt", "a");
    fwrite($script, "s\r\n");
    fwrite($script, "s\r\n");
    fwrite($script, "s\r\n");
    fwrite($script, "s\r\n");
    fwrite($script, "vars()\r\n");
    fclose($script);
}
else{
    $script = fopen("script.txt", "a");
    fwrite($script, "s\r\n");
    fwrite($script, "vars()\r\n");
    fclose($script);
}
if($q != ""){  
    $params = fopen("params.py", "r");
    if($params){
       if(($line = fgets($params)) !==false){
           $arr = explode("\r\n", $line);
           for($x = 0; $x < count($v); $x = $x + 1){
               $str =  $str . $v[$x] . " ";
               $str2 =  $str2 . $v[$x] . " ";           
           }
           
           $code= fopen("code.py", "a");
           $s = "\r\nimport sys\r\nif __name__ == '__main__':\r\n   print " . $arr[0] . "(*sys.argv[1:])";
           fwrite($code, $q);
           fwrite($code, $s);
           
           exec($str, $return_val, $return_code);
           if ($return_code === 0){
               $str2 = $str2 . " < script.txt > out.txt";
               exec($str2, $return_val, $return_code);
               fclose($code);
           
               $out = fopen("out.txt", "r");
               $outline = fread($out, filesize("out.txt"));
               $arrline = explode("\r\n", $outline);
               $strline = $arrline[count($arrline) - 4];
               $strline = substr($strline, 3);
               $linetxt = fopen("line.txt", "w");
               fwrite($linetxt, $strline);
               fclose($linetxt);
           
               $vars = fopen("vars.py", "a");
               if(strcmp($arrline[count($arrline)- 6], "--Return--") === 0){
                  //vars
                  $varsline = $arrline[count($arrline) -8];
                  $varsline = substr($varsline, 7);
                  $varsSep = explode(",", $varsline);
                  for($i = 0; $i<count($varsSep); $i++){
                      $varsSep2 = explode(":",$varsSep[$i]);
                      $varsSep3= preg_split ("/[\']/", $varsSep2[0]);
                      $varsSep4= preg_split ("/[}]/", $varsSep2[1]);
                      $string = $varsSep3[1] . " = " . $varsSep4[0] . "\r\n";
                      echo $string;
                  } 
                  
                  //return
                  $varsline = $arrline[count($arrline) - 7];
                  $varsline = substr($varsline, 6);
                  $string = "Return = " . $varsline . "\r\n";
                  echo $string;
                  $linetxt = fopen("line.txt", "w");
                  fwrite($linetxt, "___return___");
                  fclose($linetxt);
              }
              else{
                //vars
                 $varsline = $arrline[count($arrline) -3];
                 $varsline = substr($varsline, 7);
                 $varsSep = explode(",", $varsline);
                 for($i = 0; $i<count($varsSep); $i++){
                     $varsSep2 = explode(":",$varsSep[$i]);
                     $varsSep3= preg_split ("/[\']/", $varsSep2[0]);
                     $varsSep4= preg_split ("/[}]/", $varsSep2[1]);
                     $string = $varsSep3[1] . " = " . $varsSep4[0] . "\r\n";
                     echo $string;
                 }      
              }   
              fclose($var);
              unlink("code.py");
          }
          else{
             echo $result;
          }
       }
    }
}
else{
    echo "Compile function";
}


?>