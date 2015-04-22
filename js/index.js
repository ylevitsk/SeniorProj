// JavaScript source code
version = 0;
function compile() {
    $("#stateContainer").addClass("hide");
    $("#response").removeClass("hide");
    document.getElementById("eval").disabled = false;
    document.getElementById("start").disabled = false;
    document.getElementById("state").disabled = false;
    var str = document.getElementById("code").value;
    if (str.length == 0) {
        document.getElementById("response").innerHTML = "";
    }
    else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("response").innerHTML = xmlhttp.responseText;
                version++;
                params();
            }
        }
        xmlhttp.open("GET", "result.php?q=" + encodeURIComponent(str), false);
        xmlhttp.send();
    }
}
var lineState = 0;
function state() {
    $("#states").empty();
    document.getElementById("state").disabled = true;
    document.getElementById("compile").disabled = true;
    document.getElementById("start").disabled = true;
    document.getElementById("eval").disabled = true;
    getStates();
}

var loop = false;
var n = $("<div class = 'outter'></div>").addClass("flexible");
var printLine = ""
var columns = 0
var flag = 0
function getStates() {
    var str = document.getElementById("code").value;
    $("#paramContainer").addClass("hide");
    $("#response").addClass("hide");
    $("#stateContainer").removeClass("hide");
   
    if (str.length == 0) {
        document.getElementById("response").innerHTML = "";
    }
    else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                allText = xmlhttp.responseText;
                allText = allText.split("\r\n").join(" <br />");
                printLine = allText;

                columns++;
                if (flag > 0 && printLine.length >0) {
                    if (!loop) {
                        n = $("<div class='outter'></div>").addClass("flexible");
                        $("#states").append(n);
                        columns = 0;
                    }
                    n1 = $("<div id = 'st' class = 'inner'></div>");
                    n.append(n1);
                    n1.html(printLine);
                }
                else {
                    flag++;
                }
                    
                var txtFile;
                if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
                    txtFile = new XMLHttpRequest();
                }
                else {// code for IE6, IE5
                    txtFile = new ActiveXObject("Microsoft.XMLHTTP");
                }
                txtFile.onreadystatechange = function () {
                    if (txtFile.readyState == 4 && txtFile.status == 200) {
                       allText = txtFile.responseText;
                        allText = allText.split(" ").join("");
                        versionLine++;

                        if (allText.localeCompare("___return___") === 0) {
                            flag = 0
                            lineState = 0;
                            document.getElementById("compile").disabled = false;
                            document.getElementById("start").disabled = false;
                            document.getElementById("eval").disabled = false;
                            del("script.txt");
                            del("line.txt");
                            del("out.txt");
                        }
                        else {
                            lineState++;
                            checkLoop(loop);
                            getStates();
                        }
                           
                    }
                }
                txtFile.open("GET", "line.txt?version=" + versionLine, true);
                txtFile.send();
               
            }
        }
        var allVals = [];
        $(".flexible").each(function () {
            var t = $(this).find(".val").val();
            if(t != "")
                allVals.push(t);
        });
        if (allVals.length > 0) {
            xmlhttp.open("GET", "state.php?q=" + encodeURIComponent(str) + "&v=" + allVals + "&l=" + lineState, true);
            xmlhttp.send();
        }
    }
}
function checkLoop(check) {
    var txtFile;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        txtFile = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        txtFile = new ActiveXObject("Microsoft.XMLHTTP");
    }
    txtFile.onreadystatechange = function () {
        if (txtFile.readyState == 4 && txtFile.status == 200) {
            allText = txtFile.responseText;
            allText = allText.split(" ").join("");
            var tarea = document.getElementById("code");
            var lines = tarea.value.split("\n");

            for (var x = 0; x < lines.length; x++) {
               var temp = lines[x].split(" ").join("");
               if (allText.localeCompare(temp) == 0) {
                    break;
               }
            }
            if (check && x < lines.length) {
                var count = lines[x].match(/^\s+/)[0].length;
                var count2 = lines[x - 1].match(/^\s+/)[0].length;
                if (count > count2) {
                    if (lines[x].indexOf("for") > -1 || lines[x].indexOf("while") > -1) {
                        flag = 1
                        loop = false
                        return false
                    }
                    flag = 0
                    loop = true
                    return true
                }
                if (count == count2) {
                    if (lines[x].indexOf("for") > -1 || lines[x].indexOf("while") > -1) {
                        flag = 1;
                        loop = true
                        return true
                    }
                    flag = 0;
                    loop = true
                    return true
                }
                else {
                    if (lines[x].indexOf("for") > -1 || lines[x].indexOf("while") > -1) {
                       // flag = 0;
                        loop = true
                        return true
                    }
                    //flag = 1;
                    loop = false
                    return false
                }
            }
            if (x < lines.length && x> 1) {
                if (lines[x - 1].indexOf("for") > -1 || lines[x - 1].indexOf("while") > -1) {
                    flag = 0;
                    loop = true
                    return true
                }
                else {
                    flag = 1;
                    loop = false
                    return false;
                }
            }
            if (x >= lines.length) {
                flag = 0
                loop = false
                return false
            }
            else {
                flag = 1
                loop = false
                return false
            }           
        }
    }
    txtFile.open("GET", "line.txt?version=" + versionLine, true);
    txtFile.send();
}
function deleteFile(file_name) {
    $.ajax({
        url: 'delete.php',
        data: { 'file': file_name },
        success: function (response) {
        },
        error: function () {
        }
    });
}
function params() {
    var txtFile;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        txtFile = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        txtFile = new ActiveXObject("Microsoft.XMLHTTP");
    }
    txtFile.onreadystatechange = function () {
        if (txtFile.readyState == 4 && txtFile.status == 200) {
            $("#params").empty();
            allText = txtFile.responseText;
            lines = txtFile.responseText.split("\n");
            $("#paramContainer").removeClass("hide");
            for (var i = 1; i < lines.length - 1; i++) {
                var n = $("<div></div>").addClass("flexible");
                var n1 = $("<span></span>");
                n1.html(lines[i] + ": ");
                var n2 = $("<input type = 'text' size = '7' class = 'val'></input>");
                n.append(n1);
                n.append(n2);
                $("#params").append(n);
            }
        }
    }
    txtFile.open("GET", "params.txt?version=" + version, true);
    txtFile.send();
}
function eval() {
    var str = document.getElementById("code").value;

    if (str.length == 0) {
        document.getElementById("response").innerHTML = "";
    }
    else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("response").innerHTML = xmlhttp.responseText;
            }
        }
        var allVals = [];
        $(".flexible").each(function () {
            var t = $(this).find(".val").val();
            allVals.push(t);
        });
        xmlhttp.open("GET", "evaluate.php?q=" + encodeURIComponent(str) + "&v=" + allVals, true);
        xmlhttp.send();
    }
}
var lineNum = 0;
function start() {
    lineNum = 0;
    inspect();
    document.getElementById("next").disabled = false;
}
function nextLine() {
    inspect();
}
var versionLine = 0;
function inspect() {
    var str = document.getElementById("code").value;
    if (str.length == 0) {
        document.getElementById("response").innerHTML = "";
    }
    else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("response").innerHTML = xmlhttp.responseText;
                versionLine++;
                selectTextareaLine();             
            }
        }
        var allVals = [];
        $(".flexible").each(function () {
            var t = $(this).find(".val").val();
            if(t!= "")
                allVals.push(t);
        });
        if (allVals.length > 0) {
            xmlhttp.open("GET", "inspect.php?q=" + encodeURIComponent(str) + "&v=" + allVals + "&l=" + lineNum, true);
            xmlhttp.send();
        }
    }
}
function selectTextareaLine() {
    var txtFile;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        txtFile = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        txtFile = new ActiveXObject("Microsoft.XMLHTTP");
    }
    txtFile.onreadystatechange = function () {
        if (txtFile.readyState == 4 && txtFile.status == 200) {
            allText = txtFile.responseText;
            allText = allText.split(" ").join("");

            if (allText.localeCompare("___return___") === 0) {
                document.getElementById("next").disabled = true;
                del("script.txt");
                del("line.txt");
                del("out.txt");
            }
            else {
                var tarea = document.getElementById("code");
                var lines = tarea.value.split("\n");

                // calculate start/end
                var startPos = 0, endPos = tarea.value.length;
                for (var x = 0; x < lines.length; x++) {
                    var temp = lines[x].split(" ").join("");
                    if (allText.localeCompare(temp) == 0) {
                        break;
                    }
                    startPos += (lines[x].length + 1);
                }

                var endPos = lines[x].length + startPos;

                // do selection
                // Chrome / Firefox
                if (typeof (tarea.selectionStart) != "undefined") {
                    tarea.focus();
                    tarea.selectionStart = startPos;
                    tarea.selectionEnd = endPos;
                    lineNum++;
                    return true;
                }

                // IE
                if (document.selection && document.selection.createRange) {
                    tarea.focus();
                    tarea.select();
                    var range = document.selection.createRange();
                    range.collapse(true);
                    range.moveEnd("character", endPos);
                    range.moveStart("character", startPos);
                    range.select();
                    lineNum++;
                    return true;
                }
                return false;
            }
        }
    }
    txtFile.open("GET", "line.txt?version=" +versionLine, true);
    txtFile.send();
}

function del(file_name){
    $.ajax({
        url: 'delete.php',
        data: { 'file': file_name },
        success: function (response) {
            // do something
        },
        error: function () {
            // do something
        }
    });
}