<?php

session_start();

$_SESSION['id'] = null;

unset($_SESSION['id']);
unset($_SESSION);
