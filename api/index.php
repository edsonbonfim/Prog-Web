<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require 'Usuarios.php';

function view($a)
{
    echo json_encode($a);
    exit;
}

extract($_GET);

$method = strtolower($_SERVER['REQUEST_METHOD']);

if (isset($user) && $method == 'get')
    view(Usuarios::get($user));

if (isset($login) && $method == 'post')
{
    extract($_POST);
    view(Usuarios::login($user, $senha));
}

if (isset($signup) && $method == 'post')
{
    extract($_POST);
    view(Usuarios::signup($nome, $usuario, $email, $senha));
}

echo json_encode(null);
