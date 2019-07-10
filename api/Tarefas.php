<?php

require_once 'BD.php';

class Tarefas extends BD
{
    public static function getAll(): ?array
    {
        $sth = self::query('SELECT * FROM tarefas');
        
        if ($sth->rowCount() == 0)
            return [];
        
        return $sth->fetchAll(PDO::FETCH_ASSOC);
    }

    private static function addInterval($data, $intervalo) {
        $data = new DateTime($data);
        $data->add(DateInterval::createfromdatestring("+$intervalo day"));
        return $data->format('Y-m-d H:i:s');
    }

    public static function get($id): array
    {   
        $sth = self::query('SELECT * FROM tarefas WHERE id_usuario = ?', [$id]);
        
        if ($sth->rowCount() == 0)
            return [];
        
        $results = $sth->fetchAll(PDO::FETCH_ASSOC);

        $intervalos = [0, 0, 1, 7, 30];

        foreach($results as $result) {

            if (strtotime(date('Y-m-d H:i:s')) >= strtotime($result['fim']) && $result['recorrencia'] > 1) {

                $intervalo = $intervalos[$result['recorrencia']];

                $sth = self::query("UPDATE tarefas SET inicio = ?, fim = ? WHERE id_tarefa = ?", [
                    self::addInterval($result['inicio'], $intervalo),
                    self::addInterval($result['fim'], $intervalo),
                    $result['id_tarefa']
                ]);
            }
        }

        return $results;
    }

    public static function add($user, $descricao, $inicio, $fim, $recorrencia)
    {
        $sth = self::query('INSERT INTO tarefas (id_usuario, descricao, inicio, fim, recorrencia) VALUES (?, ?, ?, ?, ?)', [$user, $descricao, $inicio, $fim, $recorrencia]);
        $id_tarefa = self::lastInsertId();
        return compact('descricao', 'id_tarefa');
    }

    public static function del($tarefa)
    {
        $sth = self::query('DELETE FROM tarefas WHERE id_tarefa = ?', [$tarefa]);
        return [];
    }
}
