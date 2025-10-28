// Ticket Management JavaScript

function openModal(ticket = null) {
    const modal = document.getElementById('ticket-modal');
    const form = document.getElementById('ticket-form');
    const modalTitle = document.getElementById('modal-title');
    const submitText = document.getElementById('submit-text');

    if (ticket) {
        // Edit mode
        modalTitle.textContent = 'Edit Ticket';
        submitText.textContent = 'Update Ticket';
        form.action = '/tickets/update';
        
        document.getElementById('ticket-id').value = ticket.id;
        document.getElementById('title').value = ticket.title;
        document.getElementById('description').value = ticket.description || '';
        document.getElementById('status').value = ticket.status;
        document.getElementById('priority').value = ticket.priority || 'medium';
    } else {
        // Create mode
        modalTitle.textContent = 'Create New Ticket';
        submitText.textContent = 'Create Ticket';
        form.action = '/tickets/create';
        form.reset();
        document.getElementById('ticket-id').value = '';
    }

    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('ticket-modal');
    modal.style.display = 'none';
}

function editTicket(ticket) {
    openModal(ticket);
}

function deleteTicket(id, title) {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
        document.getElementById('delete-id').value = id;
        document.getElementById('delete-form').submit();
    }
}

function filterTickets(status) {
    window.location.href = '/tickets?filter=' + status;
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});