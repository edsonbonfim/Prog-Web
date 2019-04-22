<?php
    session_start();
    if (isset($_SESSION['id'])) header('Location: /dashboard.php');
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Note</title>
</head>

<body>

    <form id="login" onsubmit="app.login(event, this)">
        <input type="email" name="email" placeholder="E-mail" autofocus>
        <input type="password" name="senha" placeholder="Senha">
        <input type="submit" value="Entrar">
    </form>

    <div id="btn-login"></div>

    <script src="js/Tarefas.js"></script>
    <script src="js/Login.js"></script>

    <script>
        let app = new Tarefas();
    </script>

</body>
</html>