<?php

use PDO;
use PDOException;
use ReflectionClass;

class BD
{
    private static $dbh = null;

    private static function conn()
    {
        if (!isset(self::$dbh) || is_null(self::$dbh))
        {
            // self::$dbh = new PDO('mysql:host=localhost;dbname=id9378600_done', 'id9378600_done', 'donedone');
            self::$dbh = new PDO('mysql:host=localhost;dbname=done', 'root', '');
            self::$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        return self::$dbh;
    }

    public static function query($query, $data = [])
    {
        $query = str_replace('tabela', self::getTable(), $query);

        $dbh = self::conn();

        $sth = $dbh->prepare($query);
        $sth->execute($data);

        return $sth;
    }

    public static function check(array $keys, array $values) : bool
    {
        $table = self::getTable();

        $q = "SELECT * FROM $table WHERE ";
        
        $i = 0;
        $n = count($keys) - 1;

        for (; $i < $n; $i++) {
            $q .= "{$keys[$i]} = ? OR ";
        }

        $q .= "{$keys[$i]} = ?";

        $sth = self::query($q, $values);

        return $sth->rowCount() == 1;
    }

    public static function lastInsertId()
    {
        return self::conn()->lastInsertId();
    }

    private static function getTable(): string
    {
        $class = new ReflectionClass('\\' . get_called_class());
        $table = $class->getShortName();
        return strtolower($table);
    }
}
