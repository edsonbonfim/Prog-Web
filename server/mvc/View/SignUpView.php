<?php

namespace View;

use Controller\AuthController;

class SignUpView
{
    public function __construct()
    {
        extract($_POST);
        echo AuthController::signup($nome, $usuario, $email, $senha);
    }
}
