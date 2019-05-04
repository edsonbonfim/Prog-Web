<?php

include 'BD.php';

use PDO;

class Usuarios extends BD
{
    public static function get(string $user): ?array
    {
        $sth = self::query('SELECT id_usuario, nome, usuario, email FROM tabela WHERE usuario = ? OR email = ?', [$user, $user]);
        $res = $sth->fetch(PDO::FETCH_ASSOC);
        return $res ? $res : null;
    }

    public static function login(string $user, string $senha): ?array
    {
        $sth = self::query('SELECT id_usuario, nome, usuario, email FROM tabela WHERE (usuario = ? OR email = ?) AND senha = ?', [$user, $user, md5($senha)]);
        $res = $sth->fetch(PDO::FETCH_ASSOC);
        return $res ? $res : null;
    }

    public static function signup(string $nome, string $usuario, string $email, string $senha): ?array
    {
        if (!is_null(self::get($usuario)) || !is_null(self::get($email)))
            return null;

        $sth = self::query("INSERT INTO tabela (nome, usuario, email, senha) VALUES (?, ?, ?, ?)", [$nome, $usuario, $email, md5($senha)]);
        
        if ($sth->rowCount() != 1)
            return null;
        
        return [
            'id_usuario' => self::lastInsertId(),
            'nome' => $nome,
            'usuario' => $usuario,
            'email' => $email
        ];
    }
}
