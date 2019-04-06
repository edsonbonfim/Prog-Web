<?php

include '../config.php';

$descricao = $_POST['descricao'];

$sql = $db->prepare('INSERT INTO tasks (descricao) VALUES (?)');
$sql->execute([$descricao]);

$id = $db->lastInsertId();

$sql = $db->prepare('SELECT * FROM tasks WHERE id = ?');
$sql->execute([$id]);

$tarefa = $sql->fetch(PDO::FETCH_ASSOC);

echo json_encode($tarefa);
