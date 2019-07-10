<?php

header('Access-Control-Allow-Origin: *');

require_once 'Usuarios.php';
require_once 'Tarefas.php';
require_once 'Fb.php';

extract($_GET);

switch ($acao)
{
    // Retorna o link para login com o facebook
    case 'fbLink':
        $dados = Fb::getLink();
        break;

    // Callback de retorno com os dados de login com o facebook
    case 'fbLogin':
        $dados = Fb::login();
        break;

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
        $dados = Tarefas::add($user, $descricao, $inicio, $fim, $recorrencia);
        break;

    case 'delTarefa':
        $dados = Tarefas::del($tarefa);
        break;
}

echo json_encode($dados);
