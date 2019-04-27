<?php

include 'BD.php';

$id = $_POST['id'];
$sth = BD::exec('DELETE FROM tasks WHERE id = ?', [$id]);
