<?php

namespace Model;

use PDO;

class Usuarios extends BD
{
    public static function get($user, $senha)
    {
        $sth = self::query('SELECT id_usuario, nome, usuario, email FROM tabela WHERE (usuario = ? OR email = ?) AND senha = ?', [$user, $user, md5($senha)]);
        return $sth->fetch(PDO::FETCH_ASSOC);
    }

    public static function add(string $nome, string $usuario, string $email, string $senha): bool
    {
        $sth = self::query("INSERT INTO tabela (nome, usuario, email, senha) VALUES (?, ?, ?, ?)", [$nome, $usuario, $email, md5($senha)]);
        return $sth->rowCount() == 1;
    }

    public static function del(int $id)
    {
        $sth = self::query("DELETE FROM tabela WHERE id_usuario = ?", [$id]);
        return $sth->rowCount() == 1;
    }
}
