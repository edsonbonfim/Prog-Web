<?php

require_once 'mvc/controller/AuthController.php';

AuthController::checkLogin(false);

include 'header.php';

?>
<body>
    <header>
        <img src="img/logo-login.png" alt="Done">
    </header>

    <div class="content">
        <div class="text">
            <a href="/" id="msg">Não pense por muito tempo; faça.</a>
        </div>

        <form onsubmit="Done.signup(event)">
            <input type="text" name="nome" placeholder="Nome Completo" autofocus autocomplete="off">
            <input type="text" name="usuario" placeholder="Usuário" autocomplete="off">
            <input type="text" name="email" placeholder="E-mail" autocomplete="off">
            <input type="password" name="senha" placeholder="Senha">
            <input type="submit" class="btn" value="Criar minha conta">
        </form>

        <div class="text">
            <a href="/">Fazer login</a>
        </div>
    </div>

    <script src="js/Done.js"></script>
</body>
</html>