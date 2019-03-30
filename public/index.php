<?php

session_start();

require_once "../vendor/autoload.php";

use EdsonOnildo\Router\Route;
use EdsonOnildo\Tpl\Tpl;
use Bonfim\ActiveRecord\ActiveRecord;

Tpl::config([
    'dev' => true,
    'template_dir' => dirname(getcwd()) . '/app/View/'
]);

ActiveRecord::config('mysql:host=localhost;dbname=note', 'root', 'batatapalha123');

Route::get('/', 'TasksController@get');
Route::post('/', 'TasksController@post');
