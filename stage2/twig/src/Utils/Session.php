<?php
namespace App\Utils;

class Session
{
    private const SESSION_KEY = 'ticketapp_session';
    private const USERS_FILE = __DIR__ . '/../../data/users.json';

    public static function init()
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    }

    private static function getUsers()
    {
        if (!file_exists(self::USERS_FILE)) {
            $defaultUsers = [
                [
                    'id' => 1,
                    'email' => 'demo@ticket.app',
                    'password' => password_hash('password123', PASSWORD_DEFAULT),
                    'name' => 'Demo User'
                ],
                [
                    'id' => 2,
                    'email' => 'admin@ticket.app',
                    'password' => password_hash('admin123', PASSWORD_DEFAULT),
                    'name' => 'Admin User'
                ]
            ];
            
            $dir = dirname(self::USERS_FILE);
            if (!is_dir($dir)) {
                mkdir($dir, 0777, true);
            }
            
            file_put_contents(self::USERS_FILE, json_encode($defaultUsers));
            return $defaultUsers;
        }
        
        return json_decode(file_get_contents(self::USERS_FILE), true);
    }

    public static function login($email, $password)
    {
        $users = self::getUsers();
        
        foreach ($users as $user) {
            if ($user['email'] === $email && password_verify($password, $user['password'])) {
                $_SESSION[self::SESSION_KEY] = [
                    'token' => bin2hex(random_bytes(32)),
                    'user' => [
                        'id' => $user['id'],
                        'email' => $user['email'],
                        'name' => $user['name']
                    ],
                    'expiresAt' => time() + (24 * 60 * 60)
                ];
                
                return true;
            }
        }
        
        return false;
    }

    public static function signup($name, $email, $password)
    {
        $users = self::getUsers();
        
        // Check if user exists
        foreach ($users as $user) {
            if ($user['email'] === $email) {
                return false;
            }
        }
        
        // Create new user
        $newUser = [
            'id' => count($users) + 1,
            'email' => $email,
            'password' => password_hash($password, PASSWORD_DEFAULT),
            'name' => $name
        ];
        
        $users[] = $newUser;
        file_put_contents(self::USERS_FILE, json_encode($users));
        
        // Auto login
        $_SESSION[self::SESSION_KEY] = [
            'token' => bin2hex(random_bytes(32)),
            'user' => [
                'id' => $newUser['id'],
                'email' => $newUser['email'],
                'name' => $newUser['name']
            ],
            'expiresAt' => time() + (24 * 60 * 60)
        ];
        
        return true;
    }

    public static function logout()
    {
        unset($_SESSION[self::SESSION_KEY]);
    }

    public static function isAuthenticated()
    {
        if (!isset($_SESSION[self::SESSION_KEY])) {
            return false;
        }
        
        $session = $_SESSION[self::SESSION_KEY];
        
        if ($session['expiresAt'] < time()) {
            self::logout();
            return false;
        }
        
        return true;
    }

    public static function getUser()
    {
        if (self::isAuthenticated()) {
            return $_SESSION[self::SESSION_KEY]['user'];
        }
        
        return null;
    }

    public static function requireAuth()
    {
        if (!self::isAuthenticated()) {
            header('Location: /auth/login');
            exit;
        }
    }
} 