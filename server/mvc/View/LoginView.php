<?php

namespace View;

use Controller\AuthController;

class LoginView
{
    public function __construct()
    {
        extract($_POST);
        echo AuthController::login(strtolower($login), $senha);
    }
}
