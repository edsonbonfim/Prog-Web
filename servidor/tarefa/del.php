<?php

include '../config.php';

$id = $_POST['id'] ?? "";

if (empty($id)) {
    response('400 Bad Request');
}

$sql = $db->prepare('DELETE FROM tasks WHERE id = ?');
$res = $sql->execute([$id]);

if ($res == 1 && $sql->rowCount() == 1) {
    response('204 No Content');
}

response('404 Not Found');
