<?php

namespace App\Controller;

use App\Utils\Session;

class HomeController
{
    private $twig;

    public function __construct($twig)
    {
        $this->twig = $twig;
    }

    public function index()
    {
        echo $this->twig->render('landing.twig', [
            'isAuthenticated' => Session::isAuthenticated(),
            'user' => Session::getUser()
        ]);
    }
}