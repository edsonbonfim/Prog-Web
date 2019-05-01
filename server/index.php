<?php

header('Access-Control-Allow-Origin: *'); 

set_error_handler(function($errno, $errstr, $errfile, $errline) {
    echo json_encode([
        'errno' => $errno,
        'errstr' => $errstr,
        'errfile' => $errfile,
        'errline' => $errline
    ]);
    exit;
});

include 'vendor/autoload.php';

$uri = $_SERVER['REQUEST_URI'];

if (!preg_match('/\.(?:png|jpg|jpeg|gif)$/', $uri)) {

    $args = array_values(array_filter(explode('/', $uri)));

    if ($args[0] == 'auth' && $args[1] == 'login')
        new View\LoginView();

    else if ($args[0] == 'auth' && $args[1] == 'signup')
        new View\SignUpView();

    else if ($args[0] == 'usuarios') {
        if (!isset($args[1])) {
            echo json_encode(false);
        } else {
            new View\UsuariosView($args[1]);
        }
    }
}