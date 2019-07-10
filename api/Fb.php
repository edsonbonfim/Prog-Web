<?php

require_once '../vendor/autoload.php';

use Facebook;

class Fb
{
    public static function getLink()
    {
        session_start();
        
        $fb = new Facebook\Facebook([
            'app_id' => '361908191090116',
            'app_secret' => 'e2dcd68d47ae106adac14a2a152879a3',
            'default_graph_version' => 'v3.2',
        ]);
        
        $helper = $fb->getRedirectLoginHelper();
        
        $permissions = ['email'];
        $loginUrl = $helper->getLoginUrl('http://localhost:3000/', $permissions);
        
        return ['link' => htmlspecialchars($loginUrl)];
    }

    public static function login()
    {

    }
}
