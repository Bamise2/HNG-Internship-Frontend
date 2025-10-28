<?php

namespace App\Controller;

use App\Utils\Session;
use App\Utils\Storage;

class TicketController
{
    private $twig;

    public function __construct($twig)
    {
        $this->twig = $twig;
    }

    public function index()
    {
        Session::requireAuth();

        $tickets = Storage::getTickets();
        $filter = $_GET['filter'] ?? 'all';

        if ($filter !== 'all') {
            $tickets = array_filter($tickets, fn($t) => $t['status'] === $filter);
        }

        echo $this->twig->render('tickets/index.twig', [
            'isAuthenticated' => true,
            'user' => Session::getUser(),
            'tickets' => $tickets,
            'filter' => $filter,
            'success' => $_SESSION['success'] ?? null,
            'error' => $_SESSION['error'] ?? null
        ]);
        
        unset($_SESSION['success'], $_SESSION['error']);
    }

    public function create()
    {
        Session::requireAuth();

        $data = [
            'title' => $_POST['title'] ?? '',
            'description' => $_POST['description'] ?? '',
            'status' => $_POST['status'] ?? 'open',
            'priority' => $_POST['priority'] ?? 'medium'
        ];

        $validation = Storage::validateTicket($data);

        if (!$validation['isValid']) {
            $_SESSION['error'] = 'Please fix the errors in the form';
            header('Location: /tickets');
            exit;
        }

        Storage::createTicket($data);
        $_SESSION['success'] = 'Ticket created successfully!';
        header('Location: /tickets');
        exit;
    }

    public function update()
    {
        Session::requireAuth();

        $id = $_POST['id'] ?? null;
        $data = [
            'title' => $_POST['title'] ?? '',
            'description' => $_POST['description'] ?? '',
            'status' => $_POST['status'] ?? 'open',
            'priority' => $_POST['priority'] ?? 'medium'
        ];

        $validation = Storage::validateTicket($data);

        if (!$validation['isValid']) {
            $_SESSION['error'] = 'Please fix the errors in the form';
            header('Location: /tickets');
            exit;
        }

        Storage::updateTicket($id, $data);
        $_SESSION['success'] = 'Ticket updated successfully!';
        header('Location: /tickets');
        exit;
    }

    public function delete()
    {
        Session::requireAuth();

        $id = $_POST['id'] ?? null;

        if ($id) {
            Storage::deleteTicket($id);
            $_SESSION['success'] = 'Ticket deleted successfully!';
        }

        header('Location: /tickets');
        exit;
    }
}