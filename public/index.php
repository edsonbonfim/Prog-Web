<?php

session_start();

require_once "../vendor/autoload.php";

use EdsonOnildo\Router\Route;

use EdsonOnildo\Tpl\Tpl;

Tpl::config([
    'dev' => true,
    'template_dir' => '../src/views/'
]);

Route::post('/', function ($request) {

    $_SESSION['tasks'][] = $request->task;
    header('Location: /');
});

Route::get('/', function () {

    EdsonOnildo\Tpl\Tpl::assign('tasks', $_SESSION['tasks']);
    EdsonOnildo\Tpl\Tpl::render('index');
});
