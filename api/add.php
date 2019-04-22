<?php

include '../conexao.php';

$sth = $dbh->prepare('INSERT INTO tasks (descricao) VALUES (?)');
$sth->execute([$_POST['descricao']]);

$_POST['id'] = $dbh->lastInsertId();

echo json_encode($_POST);
