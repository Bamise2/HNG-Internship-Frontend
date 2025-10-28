<?php

require_once __DIR__ . '/../vendor/autoload.php';

use App\Controller\HomeController;
use App\Controller\AuthController;
use App\Controller\DashboardController;
use App\Controller\TicketController;
use App\Utils\Session;

// Initialize session
Session::init();

// Setup Twig
$loader = new \Twig\Loader\FilesystemLoader(__DIR__ . '/../src/views');
$twig = new \Twig\Environment($loader, [
    'cache' => false, // Disable cache for development
    'debug' => true
]);

// Get request URI and method
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Simple router
switch ($requestUri) {
    case '/':
        $controller = new HomeController($twig);
        $controller->index();
        break;

    case '/auth/login':
        $controller = new AuthController($twig);
        if ($requestMethod === 'POST') {
            $controller->loginPost();
        } else {
            $controller->login();
        }
        break;

    case '/auth/signup':
        $controller = new AuthController($twig);
        if ($requestMethod === 'POST') {
            $controller->signupPost();
        } else {
            $controller->signup();
        }
        break;

    case '/auth/logout':
        $controller = new AuthController($twig);
        $controller->logout();
        break;

    case '/dashboard':
        $controller = new DashboardController($twig);
        $controller->index();
        break;

    case '/tickets':
        $controller = new TicketController($twig);
        $controller->index();
        break;

    case '/tickets/create':
        if ($requestMethod === 'POST') {
            $controller = new TicketController($twig);
            $controller->create();
        } else {
            header('Location: /tickets');
        }
        break;

    case '/tickets/update':
        if ($requestMethod === 'POST') {
            $controller = new TicketController($twig);
            $controller->update();
        } else {
            header('Location: /tickets');
        }
        break;

    case '/tickets/delete':
        if ($requestMethod === 'POST') {
            $controller = new TicketController($twig);
            $controller->delete();
        } else {
            header('Location: /tickets');
        }
        break;

    default:
        http_response_code(404);
        echo $twig->render('layout/base.twig', [
            'content' => '<div class="container" style="padding: 4rem 0; text-align: center;"><h1>404 - Page Not Found</h1><p><a href="/">Go Home</a></p></div>'
        ]);
        break;
}