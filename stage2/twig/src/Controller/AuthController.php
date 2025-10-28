<?php

namespace App\Controller;

use App\Utils\Session;

class AuthController
{
    private $twig;

    public function __construct($twig)
    {
        $this->twig = $twig;
    }

    public function login()
    {
        if (Session::isAuthenticated()) {
            header('Location: /dashboard');
            exit;
        }

        echo $this->twig->render('auth/login.twig', [
            'error' => $_SESSION['error'] ?? null
        ]);
        
        unset($_SESSION['error']);
    }

    public function loginPost()
    {
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';

        if (Session::login($email, $password)) {
            $_SESSION['success'] = 'Login successful! Welcome back.';
            header('Location: /dashboard');
            exit;
        }

        $_SESSION['error'] = 'Invalid email or password';
        header('Location: /auth/login');
        exit;
    }

    public function signup()
    {
        if (Session::isAuthenticated()) {
            header('Location: /dashboard');
            exit;
        }

        echo $this->twig->render('auth/signup.twig', [
            'error' => $_SESSION['error'] ?? null
        ]);
        
        unset($_SESSION['error']);
    }

    public function signupPost()
    {
        $name = $_POST['name'] ?? '';
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';
        $confirmPassword = $_POST['confirmPassword'] ?? '';

        // Validation
        if (empty($name) || empty($email) || empty($password)) {
            $_SESSION['error'] = 'All fields are required';
            header('Location: /auth/signup');
            exit;
        }

        if ($password !== $confirmPassword) {
            $_SESSION['error'] = 'Passwords do not match';
            header('Location: /auth/signup');
            exit;
        }

        if (Session::signup($name, $email, $password)) {
            $_SESSION['success'] = 'Account created successfully! Welcome aboard.';
            header('Location: /dashboard');
            exit;
        }

        $_SESSION['error'] = 'User with this email already exists';
        header('Location: /auth/signup');
        exit;
    }

    public function logout()
    {
        Session::logout();
        $_SESSION['success'] = 'Logged out successfully';
        header('Location: /');
        exit;
    }
}