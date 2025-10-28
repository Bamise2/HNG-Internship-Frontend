<template>
  <div class="tickets-page">
    <div class="container">
      <div class="tickets-header">
        <div>
          <h1>Ticket Management</h1>
          <p>Create, view, edit, and delete your tickets</p>
        </div>
        <button class="btn btn-primary" @click="openModal()">
          ➕ Create Ticket
        </button>
      </div>

      <!-- Filter Bar -->
      <div class="filter-bar">
        <div class="filter-group">
          <label for="status-filter">Filter by Status:</label>
          <select
            id="status-filter"
            v-model="filterStatus"
            class="filter-select"
          >
            <option value="all">All Tickets ({{ tickets.length }})</option>
            <option value="open">Open ({{ tickets.filter(t => t.status === 'open').length }})</option>
            <option value="in_progress">In Progress ({{ tickets.filter(t => t.status === 'in_progress').length }})</option>
            <option value="closed">Closed ({{ tickets.filter(t => t.status === 'closed').length }})</option>
          </select>
        </div>
      </div>

      <!-- Tickets Grid -->
      <div v-if="filteredTickets.length === 0" class="empty-state">
        <div class="empty-icon">📭</div>
        <h2>No tickets found</h2>
        <p>
          {{ filterStatus === 'all'
            ? "Get started by creating your first ticket"
            : `No tickets with status "${filterStatus}"` }}
        </p>
        <button v-if="filterStatus === 'all'" class="btn btn-primary" @click="openModal()">
          Create First Ticket
        </button>
      </div>

      <div v-else class="tickets-grid">
        <TicketCard
          v-for="ticket in filteredTickets"
          :key="ticket.id"
          :ticket="ticket"
          @edit="openModal"
          @delete="handleDelete"
        />
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h2>{{ editingTicket ? 'Edit Ticket' : 'Create New Ticket' }}</h2>
            <button class="modal-close" @click="closeModal">✕</button>
          </div>

          <form @submit.prevent="handleSubmit" class="ticket-form">
            <div class="form-group">
              <label for="title">
                Title <span class="required">*</span>
              </label>
              <input
                type="text"
                id="title"
                v-model="formData.title"
                :class="{ error: errors.title }"
                placeholder="Brief description of the issue"
                :aria-describedby="errors.title ? 'title-error' : undefined"
              />
              <span 
                v-if="errors.title" 
                class="error-message" 
                id="title-error" 
                role="alert"
              >
                {{ errors.title }}
              </span>
            </div>

            <div class="form-group">
              <label for="status">
                Status <span class="required">*</span>
              </label>
              <select
                id="status"
                v-model="formData.status"
                :class="{ error: errors.status }"
                :aria-describedby="errors.status ? 'status-error' : undefined"
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
              <span 
                v-if="errors.status" 
                class="error-message" 
                id="status-error" 
                role="alert"
              >
                {{ errors.status }}
              </span>
            </div>

            <div class="form-group">
              <label for="priority">Priority</label>
              <select
                id="priority"
                v-model="formData.priority"
                :class="{ error: errors.priority }"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <span 
                v-if="errors.priority" 
                class="error-message" 
                id="priority-error" 
                role="alert"
              >
                {{ errors.priority }}
              </span>
            </div>

            <div class="form-group">
              <label for="description">Description</label>
              <textarea
                id="description"
                v-model="formData.description"
                :class="{ error: errors.description }"
                placeholder="Detailed description of the issue (optional)"
                rows="4"
                :aria-describedby="errors.description ? 'description-error' : undefined"
              />
              <span 
                v-if="errors.description" 
                class="error-message" 
                id="description-error" 
                role="alert"
              >
                {{ errors.description }}
              </span>
            </div>

            <div class="modal-actions">
              <button type="button" class="btn btn-secondary" @click="closeModal">
                Cancel
              </button>
              <button type="submit" class="btn btn-primary">
                {{ editingTicket ? 'Update Ticket' : 'Create Ticket' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { getTickets, createTicket, updateTicket, deleteTicket, validateTicket } from '../utils/storage'
import TicketCard from '../components/TicketCard.vue'

const toast = useToast()

const tickets = ref([])
const showModal = ref(false)
const editingTicket = ref(null)
const filterStatus = ref('all')

const formData = reactive({
  title: '',
  description: '',
  status: 'open',
  priority: 'medium'
})

const errors = reactive({
  title: '',
  status: '',
  description: '',
  priority: ''
})

const filteredTickets = computed(() => {
  if (filterStatus.value === 'all') {
    return tickets.value
  }
  return tickets.value.filter(t => t.status === filterStatus.value)
})

const loadTickets = () => {
  tickets.value = getTickets()
}

const openModal = (ticket = null) => {
  if (ticket) {
    editingTicket.value = ticket
    formData.title = ticket.title
    formData.description = ticket.description || ''
    formData.status = ticket.status
    formData.priority = ticket.priority || 'medium'
  } else {
    editingTicket.value = null
    formData.title = ''
    formData.description = ''
    formData.status = 'open'
    formData.priority = 'medium'
  }
  
  // Clear errors
  Object.keys(errors).forEach(key => errors[key] = '')
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingTicket.value = null
  formData.title = ''
  formData.description = ''
  formData.status = 'open'
  formData.priority = 'medium'
  Object.keys(errors).forEach(key => errors[key] = '')
}

const handleSubmit = () => {
  // Validate form
  const validation = validateTicket(formData)
  if (!validation.isValid) {
    Object.assign(errors, validation.errors)
    toast.error('Please fix the errors in the form')
    return
  }

  try {
    if (editingTicket.value) {
      updateTicket(editingTicket.value.id, formData)
      toast.success('Ticket updated successfully!')
    } else {
      createTicket(formData)
      toast.success('Ticket created successfully!')
    }
    
    loadTickets()
    closeModal()
  } catch (error) {
    toast.error(error.message || 'Failed to save ticket. Please try again.')
  }
}

const handleDelete = (ticket) => {
  if (confirm(`Are you sure you want to delete "${ticket.title}"?`)) {
    try {
      deleteTicket(ticket.id)
      toast.success('Ticket deleted successfully!')
      loadTickets()
    } catch (error) {
      toast.error('Failed to delete ticket. Please try again.')
    }
  }
}

onMounted(() => {
  loadTickets()
})
</script>