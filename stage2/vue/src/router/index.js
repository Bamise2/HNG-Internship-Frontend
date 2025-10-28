import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '../utils/auth'
import { useToast } from 'vue-toastification'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('../views/Landing.vue')
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next('/dashboard')
        } else {
          next()
        }
      }
    },
    {
      path: '/auth/signup',
      name: 'signup',
      component: () => import('../views/Signup.vue'),
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next('/dashboard')
        } else {
          next()
        }
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/tickets',
      name: 'tickets',
      component: () => import('../views/TicketManagement.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

// Global navigation guard for protected routes
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    const toast = useToast()
    toast.error('Your session has expired — please log in again.')
    next('/auth/login')
  } else {
    next()
  }
})

export default router