<?php

namespace View;

use Model\Usuarios;

class UsuariosView
{
    public function __construct($id) {
        echo json_encode(Usuarios::get($id));
    }
}
