<?php

include '../config.php';

$sql = $db->prepare('SELECT * FROM tasks');
$sql->execute();

$tarefas = $sql->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($tarefas);
