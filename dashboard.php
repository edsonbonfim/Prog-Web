<?php

include 'api/Done.php';
Done::checkLogin(true);

?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Done</title>
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Roboto+Mono:400,500|Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="css/dashboard.css">
</head>
<body onload="Done.dashboard()">

    <header>
        <img src="img/logo-login.png" alt="Done">
    </header>
    
    <div class="tasks">
        <form id="form" onsubmit="Done.add(event, this)">
            <input type="text" id="input" placeholder="Nova tarefa" name="descricao" autofocus autocomplete="off">
        </form>
        <ul id="lista">
        </ul>

        <div class="text">
            <a onclick="Done.logout(event)">Sair</a>
        </div>
    </div>

    <script src="js/Done.js"></script>
    <script>
        window.setInterval(Done.dashboard, 5000);
    </script>

</body>
</html>