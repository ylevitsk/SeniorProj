<?php
$q = rawurldecode($_REQUEST["q"]);
$q = str_replace("\n", "\r\n", $q);
$v = explode(",", $_REQUEST["v"]);
$result = "Errors in code";    
$str = "python code.py ";

if($q != ""){
    $code = fopen("code.py", "a");
    $params = fopen("params.txt", "r");
    if($params && $code){
       if(($line = fgets($params)) !==false){
           $arr = explode("\r\n", $line);
           $s = "\r\nimport sys\r\nif __name__ == '__main__':\r\n   print " . $arr[0] . "(*sys.argv[1:])";
           fwrite($code, $q);
           fwrite($code, $s);
           for($x = 0; $x < count($v); $x = $x + 1)
               $str =  $str . $v[$x] . " ";
           exec($str, $return_val, $return_code);
           fclose($code);
           fclose($params);
           unlink("code.py");
           if($return_code == 0)
              echo "return: " . $return_val[0];
           else
               echo $result;
       }
    }
    else{
        echo "Compile function";
    }
}
?>