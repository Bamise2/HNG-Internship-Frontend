// Ticket storage utility
const TICKETS_KEY = 'ticketapp_tickets';

// Initialize with some mock tickets
const INITIAL_TICKETS = [
  {
    id: 1,
    title: 'Fix login bug',
    description: 'Users are unable to login with valid credentials',
    status: 'open',
    priority: 'high',
    createdAt: new Date('2025-10-15').toISOString(),
    updatedAt: new Date('2025-10-15').toISOString()
  },
  {
    id: 2,
    title: 'Update dashboard UI',
    description: 'Redesign dashboard with new color scheme',
    status: 'in_progress',
    priority: 'medium',
    createdAt: new Date('2025-10-18').toISOString(),
    updatedAt: new Date('2025-10-19').toISOString()
  },
  {
    id: 3,
    title: 'Add export feature',
    description: 'Allow users to export tickets to CSV',
    status: 'closed',
    priority: 'low',
    createdAt: new Date('2025-10-10').toISOString(),
    updatedAt: new Date('2025-10-16').toISOString()
  }
];

/**
 * Get all tickets
 */
export const getTickets = () => {
  const ticketsStr = localStorage.getItem(TICKETS_KEY);
  
  if (!ticketsStr) {
    // Initialize with mock data
    localStorage.setItem(TICKETS_KEY, JSON.stringify(INITIAL_TICKETS));
    return INITIAL_TICKETS;
  }
  
  try {
    return JSON.parse(ticketsStr);
  } catch (error) {
    console.error('Error parsing tickets:', error);
    return [];
  }
};

/**
 * Get single ticket by ID
 */
export const getTicket = (id) => {
  const tickets = getTickets();
  return tickets.find(ticket => ticket.id === parseInt(id));
};

/**
 * Create new ticket
 */
export const createTicket = (ticketData) => {
  const tickets = getTickets();
  
  const newTicket = {
    id: Date.now(), // Simple ID generation
    ...ticketData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  tickets.push(newTicket);
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
  
  return newTicket;
};

/**
 * Update existing ticket
 */
export const updateTicket = (id, updates) => {
  const tickets = getTickets();
  const index = tickets.findIndex(ticket => ticket.id === parseInt(id));
  
  if (index === -1) {
    throw new Error('Ticket not found');
  }
  
  tickets[index] = {
    ...tickets[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
  
  return tickets[index];
};

/**
 * Delete ticket
 */
export const deleteTicket = (id) => {
  const tickets = getTickets();
  const filteredTickets = tickets.filter(ticket => ticket.id !== parseInt(id));
  
  localStorage.setItem(TICKETS_KEY, JSON.stringify(filteredTickets));
  
  return true;
};

/**
 * Get ticket statistics
 */
export const getTicketStats = () => {
  const tickets = getTickets();
  
  return {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    in_progress: tickets.filter(t => t.status === 'in_progress').length,
    closed: tickets.filter(t => t.status === 'closed').length
  };
};

/**
 * Validate ticket data
 */
export const validateTicket = (data) => {
  const errors = {};
  
  // Title validation
  if (!data.title || data.title.trim().length === 0) {
    errors.title = 'Title is required';
  } else if (data.title.length > 100) {
    errors.title = 'Title must be less than 100 characters';
  }
  
  // Status validation
  const validStatuses = ['open', 'in_progress', 'closed'];
  if (!data.status) {
    errors.status = 'Status is required';
  } else if (!validStatuses.includes(data.status)) {
    errors.status = 'Status must be one of: open, in_progress, closed';
  }
  
  // Description validation (optional but has constraints)
  if (data.description && data.description.length > 500) {
    errors.description = 'Description must be less than 500 characters';
  }
  
  // Priority validation (optional)
  if (data.priority) {
    const validPriorities = ['low', 'medium', 'high'];
    if (!validPriorities.includes(data.priority)) {
      errors.priority = 'Priority must be one of: low, medium, high';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};