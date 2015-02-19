<?php
$q = rawurldecode($_REQUEST["q"]);
$q = str_replace("\n", "\r\n", $q);
$result = "Errors in code";    

if($q != ""){
    $code = fopen("code.py", "w");
    fwrite($code, $q);
    fclose($code);
    $output = shell_exec("python p1.py");
    $vars = fopen("vars.py", "r");
    if($vars != false){
        $contents = fread($vars, filesize("vars.py"));
        echo $contents; 
        fclose($vars);
        unlink("vars.py");
        unlink("code.py");
    }
    else
        echo $result;
}
else{
    echo "";
}
?>