<?php

include '../config.php';

$id = $_POST['id'];

$sql = $db->prepare('DELETE FROM tasks WHERE id = ?');
$res = $sql->execute([$id]);

if ($res == 1 && $sql->rowCount() == 1) {
    header('HTTP/1.1 204 No Content');
    exit;
}

header('HTTP/1.1 404 Not Found');
