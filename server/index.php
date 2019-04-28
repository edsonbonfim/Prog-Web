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

$args = array_values(array_filter(explode('/', $_SERVER['REQUEST_URI'])));

if ($args[0] == 'auth' && $args[1] == 'login')
    new View\LoginView();

else if ($args[0] == 'auth' && $args[1] == 'signup')
    new View\SignUpView();
