<?php

require_once 'BD.php';

class Tarefas extends BD
{
    public static function getAll(): ?array
    {
        $sth = self::query('SELECT * FROM tarefas');
        $res = $sth->fetchAll(PDO::FETCH_ASSOC);
        return $res ? $res : null;
    }

    public static function get($id): ?array
    {
        $sth = self::query('SELECT * FROM tarefas WHERE id_usuario = ?', [$id]);
        $res = $sth->fetchAll(PDO::FETCH_ASSOC);
        return $res ? $res : null;
    }

    public static function add($user, $titulo, $descricao)
    {
        $sth = self::query('INSERT INTO tarefas (id_usuario, titulo, descricao) VALUES (?, ?, ?)', [$user, $titulo, $descricao]);
    }
}
