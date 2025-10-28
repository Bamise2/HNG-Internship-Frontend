const TicketCard = ({ ticket, onEdit, onDelete }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'open':
        return 'status-open';
      case 'in_progress':
        return 'status-progress';
      case 'closed':
        return 'status-closed';
      default:
        return '';
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return '';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'open':
        return 'Open';
      case 'in_progress':
        return 'In Progress';
      case 'closed':
        return 'Closed';
      default:
        return status;
    }
  };

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <h3 className="ticket-title">{ticket.title}</h3>
        <div className="ticket-badges">
          <span className={`status-badge ${getStatusClass(ticket.status)}`}>
            {getStatusLabel(ticket.status)}
          </span>
          {ticket.priority && (
            <span className={`priority-badge ${getPriorityClass(ticket.priority)}`}>
              {ticket.priority}
            </span>
          )}
        </div>
      </div>

      {ticket.description && (
        <p className="ticket-description">{ticket.description}</p>
      )}

      <div className="ticket-meta">
        <span className="ticket-date">
          📅 Created: {formatDate(ticket.createdAt)}
        </span>
        {ticket.updatedAt !== ticket.createdAt && (
          <span className="ticket-date">
            🔄 Updated: {formatDate(ticket.updatedAt)}
          </span>
        )}
      </div>

      <div className="ticket-actions">
        <button 
          className="btn btn-secondary btn-sm"
          onClick={() => onEdit(ticket)}
        >
          ✏️ Edit
        </button>
        <button 
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(ticket)}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default TicketCard;