<?php

namespace App\Controller;

use EdsonOnildo\Router\Request;
use EdsonOnildo\Tpl\Tpl;
use App\Model\Task;

class TasksController
{
    public function get()
    {
        Tpl::assign('tasks', Task::all());
    }

    public function post(Request $request)
    {
        $task = new Task();
        $task->descricao = $request->descricao;
        $task->save();

        header('Location: /');
    }

    public function __destruct()
    {
        Tpl::render('index');
    }
}
