<?php

include 'api/Done.php';
Done::checkLogin(false);

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
        
        <form onsubmit="Done.login(event)">
            <input type="text" name="user" placeholder="E-mail ou usuário" autofocus autocomplete="off">
            <input type="password" name="senha" placeholder="Senha">
            <input type="submit" class="btn" value="Entrar">
        </form>

        <div class="text">
            <a href="signup.php">Criar uma conta</a>
        </div>
    </div>

    <script src="js/Done.js"></script>

</body>
</html>