<?php

class BD
{
    private static $dbh = null;

    private static function conn()
    {
        if (!isset(self::$dbh) || is_null(self::$dbh))
        {
            try {
                // self::$dbh = new PDO('mysql:host=localhost;dbname=id9378600_done', 'id9378600_done', 'donedone');
                self::$dbh = new PDO('pgsql:host=ec2-54-83-1-101.compute-1.amazonaws.com;dbname=dfgj4371d1o9e0', 'hbleunknylyume', '6b442f893080ea6a1703b1cf747a2ec4a040d75abd753cca88b7d2cfba67d5e1');
                self::$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (\PDOException $e) {
                die($e->getMessage());
            }
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
