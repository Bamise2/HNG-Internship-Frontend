<?php

namespace App\Utils;

class Storage
{
    private const TICKETS_FILE = __DIR__ . '/../../data/tickets.json';

    private static function getInitialTickets()
    {
        return [
            [
                'id' => 1,
                'title' => 'Fix login bug',
                'description' => 'Users are unable to login with valid credentials',
                'status' => 'open',
                'priority' => 'high',
                'createdAt' => date('c', strtotime('2025-10-15')),
                'updatedAt' => date('c', strtotime('2025-10-15'))
            ],
            [
                'id' => 2,
                'title' => 'Update dashboard UI',
                'description' => 'Redesign dashboard with new color scheme',
                'status' => 'in_progress',
                'priority' => 'medium',
                'createdAt' => date('c', strtotime('2025-10-18')),
                'updatedAt' => date('c', strtotime('2025-10-19'))
            ],
            [
                'id' => 3,
                'title' => 'Add export feature',
                'description' => 'Allow users to export tickets to CSV',
                'status' => 'closed',
                'priority' => 'low',
                'createdAt' => date('c', strtotime('2025-10-10')),
                'updatedAt' => date('c', strtotime('2025-10-16'))
            ]
        ];
    }

    public static function getTickets()
    {
        if (!file_exists(self::TICKETS_FILE)) {
            $dir = dirname(self::TICKETS_FILE);
            if (!is_dir($dir)) {
                mkdir($dir, 0777, true);
            }
            
            $initialTickets = self::getInitialTickets();
            file_put_contents(self::TICKETS_FILE, json_encode($initialTickets));
            return $initialTickets;
        }
        
        return json_decode(file_get_contents(self::TICKETS_FILE), true);
    }

    public static function getTicket($id)
    {
        $tickets = self::getTickets();
        
        foreach ($tickets as $ticket) {
            if ($ticket['id'] == $id) {
                return $ticket;
            }
        }
        
        return null;
    }

    public static function createTicket($data)
    {
        $tickets = self::getTickets();
        
        $newTicket = [
            'id' => time(),
            'title' => $data['title'],
            'description' => $data['description'] ?? '',
            'status' => $data['status'],
            'priority' => $data['priority'] ?? 'medium',
            'createdAt' => date('c'),
            'updatedAt' => date('c')
        ];
        
        $tickets[] = $newTicket;
        file_put_contents(self::TICKETS_FILE, json_encode($tickets));
        
        return $newTicket;
    }

    public static function updateTicket($id, $data)
    {
        $tickets = self::getTickets();
        
        foreach ($tickets as $key => $ticket) {
            if ($ticket['id'] == $id) {
                $tickets[$key] = array_merge($ticket, $data, [
                    'updatedAt' => date('c')
                ]);
                
                file_put_contents(self::TICKETS_FILE, json_encode($tickets));
                return $tickets[$key];
            }
        }
        
        return null;
    }

    public static function deleteTicket($id)
    {
        $tickets = self::getTickets();
        $filtered = array_filter($tickets, fn($t) => $t['id'] != $id);
        
        file_put_contents(self::TICKETS_FILE, json_encode(array_values($filtered)));
        return true;
    }

    public static function getStats()
    {
        $tickets = self::getTickets();
        
        return [
            'total' => count($tickets),
            'open' => count(array_filter($tickets, fn($t) => $t['status'] === 'open')),
            'in_progress' => count(array_filter($tickets, fn($t) => $t['status'] === 'in_progress')),
            'closed' => count(array_filter($tickets, fn($t) => $t['status'] === 'closed'))
        ];
    }

    public static function validateTicket($data)
    {
        $errors = [];
        
        // Title validation
        if (empty($data['title'])) {
            $errors['title'] = 'Title is required';
        } elseif (strlen($data['title']) > 100) {
            $errors['title'] = 'Title must be less than 100 characters';
        }
        
        // Status validation
        $validStatuses = ['open', 'in_progress', 'closed'];
        if (empty($data['status'])) {
            $errors['status'] = 'Status is required';
        } elseif (!in_array($data['status'], $validStatuses)) {
            $errors['status'] = 'Status must be one of: open, in_progress, closed';
        }
        
        // Description validation
        if (!empty($data['description']) && strlen($data['description']) > 500) {
            $errors['description'] = 'Description must be less than 500 characters';
        }
        
        // Priority validation
        if (!empty($data['priority'])) {
            $validPriorities = ['low', 'medium', 'high'];
            if (!in_array($data['priority'], $validPriorities)) {
                $errors['priority'] = 'Priority must be one of: low, medium, high';
            }
        }
        
        return [
            'isValid' => empty($errors),
            'errors' => $errors
        ];
    }
}