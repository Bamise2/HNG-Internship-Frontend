<template>
  <nav class="navbar">
    <div class="container">
      <div class="nav-content">
        <router-link to="/" class="logo" @click="closeMobileMenu">
          🎫 TicketApp
        </router-link>

        <button 
          class="mobile-menu-btn" 
          @click="toggleMobileMenu"
          aria-label="Toggle menu"
        >
          {{ mobileMenuOpen ? '✕' : '☰' }}
        </button>

        <div :class="['nav-links', { 'mobile-open': mobileMenuOpen }]">
          <template v-if="authenticated">
            <router-link 
              to="/dashboard" 
              class="nav-link"
              @click="closeMobileMenu"
            >
              Dashboard
            </router-link>
            <router-link 
              to="/tickets" 
              class="nav-link"
              @click="closeMobileMenu"
            >
              Tickets
            </router-link>
            <span class="nav-user">👤 {{ user?.name }}</span>
            <button @click="handleLogout" class="btn btn-secondary">
              Logout
            </button>
          </template>
          <template v-else>
            <router-link 
              to="/auth/login" 
              class="btn btn-secondary"
              @click="closeMobileMenu"
            >
              Login
            </router-link>
            <router-link 
              to="/auth/signup" 
              class="btn btn-primary"
              @click="closeMobileMenu"
            >
              Get Started
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { isAuthenticated, logout, getCurrentUser } from '../utils/auth'

const router = useRouter()
const toast = useToast()
const mobileMenuOpen = ref(false)

const authenticated = computed(() => isAuthenticated())
const user = computed(() => getCurrentUser())

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const handleLogout = () => {
  logout()
  toast.success('Logged out successfully')
  router.push('/')
  closeMobileMenu()
}
</script>