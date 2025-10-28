<template>
  <div class="auth-page">
    <div class="wrapper">
      <div class="auth-container">
        <div class="auth-box">
          <h1 class="auth-title">Create Account</h1>
          <p class="auth-subtitle">Start managing your tickets today</p>

          <div v-if="errors.general" class="error-banner">
            {{ errors.general }}
          </div>

          <form @submit.prevent="handleSubmit" class="auth-form" novalidate>
            <div class="form-group">
              <label for="name">
                Full Name <span class="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                v-model="formData.name"
                :class="{ error: errors.name }"
                placeholder="John Doe"
                :aria-describedby="errors.name ? 'name-error' : undefined"
                @blur="validateField('name')"
              />
              <span 
                v-if="errors.name" 
                class="error-message" 
                id="name-error" 
                role="alert"
              >
                {{ errors.name }}
              </span>
            </div>

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
                placeholder="Minimum 6 characters"
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

            <div class="form-group">
              <label for="confirmPassword">
                Confirm Password <span class="required">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                v-model="formData.confirmPassword"
                :class="{ error: errors.confirmPassword }"
                placeholder="Re-enter your password"
                :aria-describedby="errors.confirmPassword ? 'confirmPassword-error' : undefined"
                @blur="validateField('confirmPassword')"
              />
              <span 
                v-if="errors.confirmPassword" 
                class="error-message" 
                id="confirmPassword-error" 
                role="alert"
              >
                {{ errors.confirmPassword }}
              </span>
            </div>

            <button
              type="submit"
              class="btn btn-primary btn-block"
              :disabled="loading"
            >
              {{ loading ? 'Creating Account...' : 'Sign Up' }}
            </button>
          </form>

          <div class="auth-footer">
            <p>
              Already have an account?
              <router-link to="/auth/login" class="auth-link">
                Login here
              </router-link>
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
import { signup } from '../utils/auth'

const router = useRouter()
const toast = useToast()

const formData = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const errors = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  general: ''
})

const loading = ref(false)

const validateField = (field) => {
  if (field === 'name') {
    if (!formData.name) {
      errors.name = 'Name is required'
    } else if (formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters'
    } else {
      errors.name = ''
    }
  }

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

  if (field === 'confirmPassword') {
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    } else {
      errors.confirmPassword = ''
    }
  }
}

const validateForm = () => {
  validateField('name')
  validateField('email')
  validateField('password')
  validateField('confirmPassword')
  
  return !errors.name && !errors.email && !errors.password && !errors.confirmPassword
}

const handleSubmit = async () => {
  if (!validateForm()) {
    toast.error('Please fix the errors in the form')
    return
  }

  loading.value = true
  errors.general = ''

  try {
    await signup(formData.name, formData.email, formData.password)
    toast.success('Account created successfully! Welcome aboard.')
    router.push('/dashboard')
  } catch (error) {
    toast.error(error.message || 'Signup failed. Please try again.')
    errors.general = error.message
  } finally {
    loading.value = false
  }
}
</script>