<?php

header('Access-Control-Allow-Origin: *');

$db = new PDO('mysql:host=localhost;dbname=note', 'root', '');
