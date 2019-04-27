<?php

include 'BD.php';

$sth = BD::exec('INSERT INTO tasks (descricao) VALUES (?)', [$_POST['descricao']]);

$_POST['id'] = BD::lastInsertId();

echo json_encode($_POST);
