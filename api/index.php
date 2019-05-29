<?php

require_once 'Usuarios.php';
require_once 'Tarefas.php';

extract($_GET);

switch ($acao)
{
    case 'login':
        extract($_POST);
        $dados = Usuarios::login($user, $senha);
        break;

    case 'signup':
        extract($_POST);
        $dados = Usuarios::signup($nome, $usuario, $email, $senha);
        break;

    case 'getUser':
        $dados = Usuarios::get($user);
        break;

    case 'getTarefas':
        $dados = (!isset($user)) ? Tarefas::getAll() : Tarefas::get($user);
        break;

    case 'addTarefa':
        extract($_POST);
        $dados = Tarefas::add($user, $titulo, $descricao);
        break;
}

echo json_encode($dados);
