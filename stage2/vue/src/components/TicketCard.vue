<template>
  <div class="ticket-card">
    <div class="ticket-header">
      <h3 class="ticket-title">{{ ticket.title }}</h3>
      <div class="ticket-badges">
        <span :class="['status-badge', getStatusClass(ticket.status)]">
          {{ getStatusLabel(ticket.status) }}
        </span>
        <span 
          v-if="ticket.priority" 
          :class="['priority-badge', getPriorityClass(ticket.priority)]"
        >
          {{ ticket.priority }}
        </span>
      </div>
    </div>

    <p v-if="ticket.description" class="ticket-description">
      {{ ticket.description }}
    </p>

    <div class="ticket-meta">
      <span class="ticket-date">
        📅 Created: {{ formatDate(ticket.createdAt) }}
      </span>
      <span v-if="ticket.updatedAt !== ticket.createdAt" class="ticket-date">
        🔄 Updated: {{ formatDate(ticket.updatedAt) }}
      </span>
    </div>

    <div class="ticket-actions">
      <button 
        class="btn btn-secondary btn-sm"
        @click="$emit('edit', ticket)"
      >
        ✏️ Edit
      </button>
      <button 
        class="btn btn-danger btn-sm"
        @click="$emit('delete', ticket)"
      >
        🗑️ Delete
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  ticket: {
    type: Object,
    required: true
  }
})

defineEmits(['edit', 'delete'])

const getStatusClass = (status) => {
  const classes = {
    open: 'status-open',
    in_progress: 'status-progress',
    closed: 'status-closed'
  }
  return classes[status] || ''
}

const getPriorityClass = (priority) => {
  const classes = {
    high: 'priority-high',
    medium: 'priority-medium',
    low: 'priority-low'
  }
  return classes[priority] || ''
}

const getStatusLabel = (status) => {
  const labels = {
    open: 'Open',
    in_progress: 'In Progress',
    closed: 'Closed'
  }
  return labels[status] || status
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>