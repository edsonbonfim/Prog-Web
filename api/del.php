<?php

include '../conexao.php';

$id = $_POST['id'];

$sth = $dbh->prepare('DELETE FROM tasks WHERE id = ?');
$sth->execute([$id]);
