import { useState, useEffect } from 'react';
import { getTickets, createTicket, updateTicket, deleteTicket, validateTicket } from '../utils/storage';
import TicketCard from '../components/TicketCard';
import toast from 'react-hot-toast';

const TicketManagement = () => {
  const [tickets, setTickets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'open',
    priority: 'medium'
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = () => {
    const allTickets = getTickets();
    setTickets(allTickets);
  };

  const handleOpenModal = (ticket = null) => {
    if (ticket) {
      setEditingTicket(ticket);
      setFormData({
        title: ticket.title,
        description: ticket.description || '',
        status: ticket.status,
        priority: ticket.priority || 'medium'
      });
    } else {
      setEditingTicket(null);
      setFormData({
        title: '',
        description: '',
        status: 'open',
        priority: 'medium'
      });
    }
    setErrors({});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTicket(null);
    setFormData({
      title: '',
      description: '',
      status: 'open',
      priority: 'medium'
    });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    const validation = validateTicket(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      toast.error('Please fix the errors in the form');
      return;
    }

    try {
      if (editingTicket) {
        // Update existing ticket
        updateTicket(editingTicket.id, formData);
        toast.success('Ticket updated successfully!');
      } else {
        // Create new ticket
        createTicket(formData);
        toast.success('Ticket created successfully!');
      }
      
      loadTickets();
      handleCloseModal();
    } catch (error) {
      toast.error(error.message || 'Failed to save ticket. Please try again.');
    }
  };

  const handleDelete = (ticket) => {
    if (window.confirm(`Are you sure you want to delete "${ticket.title}"?`)) {
      try {
        deleteTicket(ticket.id);
        toast.success('Ticket deleted successfully!');
        loadTickets();
      } catch (error) {
        toast.error('Failed to delete ticket. Please try again.');
      }
    }
  };

  const filteredTickets = filterStatus === 'all' 
    ? tickets 
    : tickets.filter(t => t.status === filterStatus);

  return (
    <div className="tickets-page">
      <div className="container">
        <div className="tickets-header">
          <div>
            <h1>Ticket Management</h1>
            <p>Create, view, edit, and delete your tickets</p>
          </div>
          <button className="btn btn-primary" onClick={() => handleOpenModal()}>
            ➕ Create Ticket
          </button>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          <div className="filter-group">
            <label htmlFor="status-filter">Filter by Status:</label>
            <select
              id="status-filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Tickets ({tickets.length})</option>
              <option value="open">Open ({tickets.filter(t => t.status === 'open').length})</option>
              <option value="in_progress">In Progress ({tickets.filter(t => t.status === 'in_progress').length})</option>
              <option value="closed">Closed ({tickets.filter(t => t.status === 'closed').length})</option>
            </select>
          </div>
        </div>

        {/* Tickets Grid */}
        {filteredTickets.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h2>No tickets found</h2>
            <p>
              {filterStatus === 'all'
                ? "Get started by creating your first ticket"
                : `No tickets with status "${filterStatus}"`}
            </p>
            {filterStatus === 'all' && (
              <button className="btn btn-primary" onClick={() => handleOpenModal()}>
                Create First Ticket
              </button>
            )}
          </div>
        ) : (
          <div className="tickets-grid">
            {filteredTickets.map(ticket => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onEdit={handleOpenModal}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingTicket ? 'Edit Ticket' : 'Create New Ticket'}</h2>
              <button className="modal-close" onClick={handleCloseModal}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="ticket-form">
              <div className="form-group">
                <label htmlFor="title">
                  Title <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={errors.title ? 'error' : ''}
                  placeholder="Brief description of the issue"
                  aria-describedby={errors.title ? 'title-error' : undefined}
                />
                {errors.title && (
                  <span className="error-message" id="title-error" role="alert">
                    {errors.title}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="status">
                  Status <span className="required">*</span>
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={errors.status ? 'error' : ''}
                  aria-describedby={errors.status ? 'status-error' : undefined}
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
                {errors.status && (
                  <span className="error-message" id="status-error" role="alert">
                    {errors.status}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className={errors.priority ? 'error' : ''}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                {errors.priority && (
                  <span className="error-message" id="priority-error" role="alert">
                    {errors.priority}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={errors.description ? 'error' : ''}
                  placeholder="Detailed description of the issue (optional)"
                  rows="4"
                  aria-describedby={errors.description ? 'description-error' : undefined}
                />
                {errors.description && (
                  <span className="error-message" id="description-error" role="alert">
                    {errors.description}
                  </span>
                )}
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingTicket ? 'Update Ticket' : 'Create Ticket'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketManagement;