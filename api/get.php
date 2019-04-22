<?php

include '../conexao.php';

$sth = $dbh->prepare('SELECT * FROM tasks');
$sth->execute();

echo json_encode($sth->fetchAll(PDO::FETCH_OBJ));
