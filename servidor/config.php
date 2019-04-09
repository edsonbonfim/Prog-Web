<?php

header('Access-Control-Allow-Origin: *');

$db = new PDO('mysql:host=localhost;dbname=note', 'root', '');

function response($response)
{
    header("HTTP/1.1 $response");
    exit;
}

function clean($string)
{
    return trim(htmlspecialchars($string));
}
