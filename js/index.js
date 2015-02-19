// JavaScript source code
function compile() {
    document.getElementById("eval").disabled = false;
    document.getElementById("start").disabled = false;
    var str = document.getElementById("code").value;
    if (str.length == 0) {
        document.getElementById("response").innerHTML = "";
    }
    else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("response").innerHTML = xmlhttp.responseText;
                params();
            }
        }
        xmlhttp.open("GET", "result.php?q=" + encodeURIComponent(str), false);
        xmlhttp.send();
    }
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
    txtFile.open("GET", "params.py", true);
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
                selectTextareaLine();
            }
        }
        var allVals = [];
        $(".flexible").each(function () {
            var t = $(this).find(".val").val();
            allVals.push(t);
        });
        xmlhttp.open("GET", "inspect.php?q=" + encodeURIComponent(str) + "&v=" + allVals + "&l=" + lineNum, true);
        xmlhttp.send();
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

            var tarea = document.getElementById("code");
            var lines = tarea.value.split("\n");

            if (lineNum < lines.length) {

                // calculate start/end
                var startPos = 0, endPos = tarea.value.length;
                for (var x = 0; x < lines.length; x++) {
                    if (allText.localeCompare(lines[x])==0) { //if (x == lineNum)
                        break;
                    }
                    startPos += (lines[x].length + 1);

                }

                var endPos = lines[lineNum].length + startPos;
                if (lineNum >= lines.length - 1) {
                    document.getElementById("next").disabled = true;
                }

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
            }
            if (lineNum >= lines.length - 1) {
                document.getElementById("next").disabled = true;
            }
            return false;
            
        }
    }
    txtFile.open("GET", "line.txt", true);
    txtFile.send();
}