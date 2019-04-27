<?php

namespace Controller;

use Model\Usuarios as User;

class AuthController
{
    public static function signup(string $nome, string $usuario, string $email, string $senha): string
    {
        if (User::check(['usuario'], [$usuario]))
            return self::send(false, 'Usuário já cadastrado');

        if (User::check(['email'], [$email]))
            return self::send(false, 'Email já cadastrado');

        if (!User::add($nome, $usuario, $email, $senha))
            return self::send(false, 'Erro, tente novamente');
            
        return self::send(true, 'Usuário cadastrado com sucesso');
    }

    public static function login(string $user, string $senha): string
    {
        if (!User::check(['usuario', 'email'], [$user, $user]))
            return self::send(false, 'Usuário não cadastrado');

        if (!$user = User::get($user, $senha))
            return self::send(false, 'Senha inválida');

        return json_encode(['status' => true, 'user' => $user]);
    }

    public static function logout()
    {
        session_start();
        
        unset($_SESSION['login']);
        unset($_SESSION);
        
        session_destroy();
    }

    public static function checkLogin(int $logado)
    {
        session_start();

        if ($logado && !isset($_SESSION['login']))
            header('Location: /');
        
        if (!$logado && isset($_SESSION['login']))
            header('Location: /dashboard.php');
    }

    private static function send(bool $status, string $msg)
    {
        return json_encode([
            'status' => $status,
            'statusText' => $msg
        ]);
    }
}
