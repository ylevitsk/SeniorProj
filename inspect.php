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
    fclose($script);
}
else{
    $script = fopen("script.txt", "a");
    fwrite($script, "s\r\n");
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
           $str2 = $str2 . " < script.txt > out.txt";
           exec($str2, $return_val, $return_code);
           fclose($code);
           
           $out = fopen("out.txt", "r");
           $outline = fread($out, filesize("out.txt"));
           $arrline = explode("\r\n", $outline);
           $strline = $arrline[count($arrline) - 3];
           $strline = substr($strline, 3);
           $linetxt = fopen("line.txt", "w");
           fwrite($linetxt, $strline);
           fclose($linetxt);
           unlink("code.py");

           $arr2 = explode("\r\n", $q);               
           $st = array("import os", "import inspect", "import re", "imports = 'os', 're', 'inspect', 'sys'", "_file_ = open('vars.py', 'w')",
               "for name in dir():",
               "   if name == ('_return_')  or name.startswith('_') == 0 and name not in imports and name != ('imports') and name != ('_file_') and name != ('_file1_'):",
               "      if (str(eval(name))).startswith('<function') == 1 :","         s = name + ' = ' + str(inspect.getargspec(eval(name))[0]) + '\\n'",
               "      else:","         s = name + ' = ' + str(eval(name))+ '\\n'", "      _file_.write(s)", "_file_.close()");
           $strline = str_replace(" ", "", $strline);
           
           for($i = 0; $i < count($arr2); $i++){
               $temp = str_replace(" ", "", $arr2[$i]);
               if (strcmp($strline, $temp) === 0)
                   break;
           }
           $line = $arr2[$i];
           if($i == "0")
               $count = 3;
           else
               $count = 0;
           
           for($j = 0; $j < strlen($line); $j++){
               if(strcmp($line[$j], " ") == 0)
                   $count++;
               elseif(strpos($line, "if") !== false){
                   $count +=3;
                   break;
               }
               elseif(strpos($line, "while") !== false){
                   $count +=3;
                   break;
               }
               elseif(strpos($line, "for") !== false){
                   $count +=3;
                   break;
               }
               elseif(strpos($line, "else") !== false){
                   $count +=3;
                   break;
               }
               else
                   break;
           }       
          
           if(strpos($line, "return") !== false){
               $code= fopen("code.py", "a");
               $s = "\r\nimport sys\r\nif __name__ == '__main__':\r\n   print " . $arr[0] . "(*sys.argv[1:])";
               fwrite($code, $q);
               fwrite($code, $s);
               exec($str, $return_val, $return_code);
               $vars = fopen("vars.py", "a");
               fwrite($vars, "return: " . $return_val[0]);
               fclose($vars);
           }
           else{
               $space = str_repeat("\s", $count);
               for($j = 0; $j < count($st); $j++) {
                   $st[$j] = $space . $st[$j];
                   $st[$j] = str_replace("\s", " ", $st[$j]);
               }
               
               $res = array_merge(array_slice($arr2, 0, $i + 1, true), $st);
               $res = array_merge($res, array_slice($arr2, $i +1, count($arr2), true));
               $s = array("import sys", "if __name__ == '__main__':", "   print " . $arr[0] . "(*sys.argv[1:])");
               $res = array_merge($res, $s);
               
               $code= fopen("code.py", "w");
               fwrite($code, implode("\r\n", $res));    
               shell_exec($str);
           }
                
           $vars = fopen("vars.py", "r");
           $contents = fread($vars, filesize("vars.py"));
           
           fclose($vars);
           fclose($code);
           fclose($params);
           unlink("code.py");
           unlink("out.txt");
           
           echo $contents; 
       }
    }
    else{
        echo "Compile function";
    }
}
?>