<?php

include '../config.php';

$id = $_POST['id'] ?? "";

if (empty($id)) {
    response('HTTP/1.1 400 Bad Request');
}

$sql = $db->prepare('DELETE FROM tasks WHERE id = ?');
$res = $sql->execute([$id]);

if ($res == 1 && $sql->rowCount() == 1) {
    response('HTTP/1.1 204 No Content');
}

response('HTTP/1.1 404 Not Found');
