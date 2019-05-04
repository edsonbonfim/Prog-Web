<?php

require 'Usuarios.php';

function call($class, $method)
{
    $args = $_SERVER['REQUEST_METHOD'] == 'GET' ? $_GET : $_POST;
    $res = call_user_func_array([$class, $method], array_values($args));
    echo json_encode($res);
    exit;
}

extract($_GET);

$method = strtolower($_SERVER['REQUEST_METHOD']);

if (isset($user) && $method == 'get')
    call(Usuarios::class, 'get');

if (isset($login) && $method == 'post')
    call(Usuarios::class, 'login');

if (isset($signup) && $method == 'post')
    call(Usuarios::class, 'signup');

header('HTTP/1.1 404 Not Found');
