<?php

include '../config.php';

$descricao = clean($_POST['descricao']) ?? "";

if (empty($descricao)) {
    response('400 Bad Request');
}

$sql = $db->prepare('INSERT INTO tasks (descricao) VALUES (?)');
$sql->execute([$descricao]);

$id = $db->lastInsertId();
$sql = $db->prepare('SELECT * FROM tasks WHERE id = ?');
$sql->execute([$id]);

$tarefa = $sql->fetch(PDO::FETCH_ASSOC);

echo json_encode($tarefa);
