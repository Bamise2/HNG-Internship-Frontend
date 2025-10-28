<?php

namespace App\Controller;

use App\Utils\Session;
use App\Utils\Storage;

class DashboardController
{
    private $twig;

    public function __construct($twig)
    {
        $this->twig = $twig;
    }

    public function index()
    {
        Session::requireAuth();

        $stats = Storage::getStats();

        echo $this->twig->render('dashboard.twig', [
            'isAuthenticated' => true,
            'user' => Session::getUser(),
            'stats' => $stats,
            'success' => $_SESSION['success'] ?? null
        ]);
        
        unset($_SESSION['success']);
    }
}