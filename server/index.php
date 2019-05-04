<?php

header('Access-Control-Allow-Origin: *'); 

include getcwd() . '/server/vendor/autoload.php';

$uri = $_SERVER['REQUEST_URI'];

$args = array_values(array_filter(explode('/', $uri)));

if (@$args[0] == 'api')
{
    
    if (@$args[1] == 'auth' && @$args[2] == 'login')
        new View\LoginView();
    
    else if (@$args[1] == 'auth' && @$args[2] == 'signup')
        new View\SignUpView();
    
    else if (@$args[1] == 'usuarios') {
        if (!isset($args[2])) {
            echo json_encode(false);
        } else {
            new View\UsuariosView(@$args[2]);
        }
    }

    exit;
}
