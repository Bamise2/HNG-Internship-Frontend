<template>
  <div class="auth-page">
    <div class="wrapper">
      <div class="auth-container">
        <div class="auth-box">
          <h1 class="auth-title">Welcome Back</h1>
          <p class="auth-subtitle">Login to manage your tickets</p>

          <div v-if="errors.general" class="error-banner">
            {{ errors.general }}
          </div>

          <form @submit.prevent="handleSubmit" class="auth-form" novalidate>
            <div class="form-group">
              <label for="email">
                Email Address <span class="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                v-model="formData.email"
                :class="{ error: errors.email }"
                placeholder="you@example.com"
                :aria-describedby="errors.email ? 'email-error' : undefined"
                @blur="validateField('email')"
              />
              <span 
                v-if="errors.email" 
                class="error-message" 
                id="email-error" 
                role="alert"
              >
                {{ errors.email }}
              </span>
            </div>

            <div class="form-group">
              <label for="password">
                Password <span class="required">*</span>
              </label>
              <input
                type="password"
                id="password"
                v-model="formData.password"
                :class="{ error: errors.password }"
                placeholder="Enter your password"
                :aria-describedby="errors.password ? 'password-error' : undefined"
                @blur="validateField('password')"
              />
              <span 
                v-if="errors.password" 
                class="error-message" 
                id="password-error" 
                role="alert"
              >
                {{ errors.password }}
              </span>
            </div>

            <button
              type="submit"
              class="btn btn-primary btn-block"
              :disabled="loading"
            >
              {{ loading ? 'Logging in...' : 'Login' }}
            </button>
          </form>

          <div class="auth-footer">
            <p>
              Don't have an account?
              <router-link to="/auth/signup" class="auth-link">
                Sign up here
              </router-link>
            </p>
          </div>

          <div class="auth-demo">
            <p class="demo-title">Demo Credentials:</p>
            <p class="demo-creds">
              Email: <code>demo@ticket.app</code><br />
              Password: <code>password123</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { login } from '../utils/auth'

const router = useRouter()
const toast = useToast()

const formData = reactive({
  email: '',
  password: ''
})

const errors = reactive({
  email: '',
  password: '',
  general: ''
})

const loading = ref(false)

const validateField = (field) => {
  if (field === 'email') {
    if (!formData.email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    } else {
      errors.email = ''
    }
  }

  if (field === 'password') {
    if (!formData.password) {
      errors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    } else {
      errors.password = ''
    }
  }
}

const validateForm = () => {
  validateField('email')
  validateField('password')
  return !errors.email && !errors.password
}

const handleSubmit = async () => {
  if (!validateForm()) {
    toast.error('Please fix the errors in the form')
    return
  }

  loading.value = true
  errors.general = ''

  try {
    await login(formData.email, formData.password)
    toast.success('Login successful! Welcome back.')
    router.push('/dashboard')
  } catch (error) {
    toast.error(error.message || 'Login failed. Please try again.')
    errors.general = error.message
  } finally {
    loading.value = false
  }
}
</script>