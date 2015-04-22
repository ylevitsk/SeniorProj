<!DOCTYPE html>
<head>
    <title>Code Walkthrough</title>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js" type="text/javascript"></script>
    <link href="css/style1.css" rel=" stylesheet" type="text/css"/>
    <meta http-equiv="Cache-control" content="no-cache">
</head>
<body>
   <p id="title">Python Code Walk-Through</p>
    <br />
    <button id="compile" onClick ="compile()" value="Submit">Compile</button> 
    <button id="state" onClick ="state()" value="State" disabled>State</button> 
    <button id="eval" onClick ="eval()" value="Evaluate" disabled>Evaluate</button> 
    <button id="start" onclick ="start()" disabled>Start</button>
    <button id="next" onclick ="nextLine()" disabled>Next Step</button>
    <br />
    <div>
        <div id ="codeContainer">
             <textarea id="code" placeholder="Enter a function.."></textarea>
        </div>
        <div>
            <div id="paramContainer" class ="hide">
                <div id="ParamHeader" class="flexable">
                    <h2>Parameters</h2>
                </div>
                <div id="params"></div>
            </div>
            <div id="stateContainer" class ="hide">
                <div id="states"></div>
            </div>
            <textarea readonly id="response"></textarea>
         </div> 
    </div>
    <br />
      <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
      <script type="text/javascript" src="js/index.js"></script>
</body>
</html>
