<?php

include '../../conexao.php';

extract($_POST);

$senha = md5($senha);

$sth = $dbh->prepare('SELECT id, email, senha FROM usuarios WHERE email = ? AND senha = ?');
$sth->execute([$email, $senha]);

$user = $sth->fetch(PDO::FETCH_OBJ);

if (isset($user) && $user->email == $email && $user->senha == $senha) {
    session_start();

    $_SESSION['id'] = md5($user->id);

    echo json_encode([
        'message' => 'OK',
        'id' => md5($user->id)
    ]);
} else {
    echo json_encode([
        'message' => 'E-mail ou senha invalidos'
    ]);
    header('HTTP/1.1 400 Not Found');
}

exit;
