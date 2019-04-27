<?php

include 'BD.php';

$sth = BD::exec('SELECT * FROM tasks');

echo json_encode($sth->fetchAll(PDO::FETCH_OBJ));
