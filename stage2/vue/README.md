# TicketApp - Vue.js Implementation

A comprehensive ticket management system built with Vue.js 3 for HNG Internship Stage 2.

## 🎯 Features

- **Landing Page** with animated wavy hero section and 3 floating decorative circles
- **Authentication System** with simulated login/signup
- **Protected Routes** with Vue Router navigation guards
- **Dashboard** with real-time ticket statistics
- **Full CRUD Operations** for ticket management
- **Form Validation** with inline error messages
- **Toast Notifications** for user feedback
- **Responsive Design** (mobile, tablet, desktop)
- **Accessibility** compliant with WCAG standards

## 🛠️ Tech Stack

- **Vue.js** 3.3.11 (Composition API with `<script setup>`)
- **Vue Router** 4.2.5 - Client-side routing with guards
- **Vue Toastification** 2.0.0 - Toast notifications
- **Vite** 5.0.8 - Build tool and dev server
- **LocalStorage** - Session and data persistence
- **CSS3** - Custom styling with CSS variables

## 📁 Project Structure

```
ticket-app-vue/
├── public/
├── src/
│   ├── assets/
│   │   └── main.css           # Global styles
│   ├── components/
│   │   ├── Navbar.vue         # Navigation with auth state
│   │   ├── Footer.vue         # Footer component
│   │   └── TicketCard.vue     # Reusable ticket card
│   ├── views/
│   │   ├── Landing.vue        # Landing page
│   │   ├── Login.vue          # Login page
│   │   ├── Signup.vue         # Signup page
│   │   ├── Dashboard.vue      # Dashboard with stats
│   │   └── TicketManagement.vue # CRUD operations
│   ├── utils/
│   │   ├── auth.js            # Authentication logic
│   │   └── storage.js         # Ticket storage & validation
│   ├── router/
│   │   └── index.js           # Vue Router configuration
│   ├── App.vue                # Main app component
│   └── main.js                # Entry point
├── vite.config.js
├── package.json
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Step 1: Create Vue Project

```bash
npm create vue@latest ticket-app-vue

# Select these options:
# ✔ Add TypeScript? No
# ✔ Add Vue Router? Yes
# ✔ Add Pinia? No
# ✔ Add ESLint? Yes

cd ticket-app-vue
```

### Step 2: Install Dependencies

```bash
npm install vue-toastification@next
```

### Step 3: Copy All Files

Copy all the component files I created into their respective locations in the `src/` directory.

### Step 4: Add CSS

Copy the entire CSS from the React `App.css` to `src/assets/main.css`.

### Step 5: Run Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Step 6: Build for Production

```bash
npm run build
```

## 🔐 Authentication

The app uses **simulated authentication** with localStorage:

### Demo Credentials

- **Email:** demo@ticket.app
- **Password:** password123

OR

- **Email:** admin@ticket.app
- **Password:** admin123

### Session Management

- Sessions are stored in `localStorage` with key: `ticketapp_session`
- Sessions expire after 24 hours
- Logout clears the session
- Protected routes redirect unauthorized users to login

## 🎫 Ticket Management

### Ticket Properties

- **title** (required) - max 100 characters
- **status** (required) - `open`, `in_progress`, or `closed`
- **description** (optional) - max 500 characters
- **priority** (optional) - `low`, `medium`, or `high`

### Validation Rules

1. **Title:** Required, 1-100 characters
2. **Status:** Required, must be one of: `open`, `in_progress`, `closed`
3. **Description:** Optional, max 500 characters
4. **Priority:** Optional, must be one of: `low`, `medium`, `high`

### CRUD Operations

- **Create:** Click "Create Ticket" button, fill form, submit
- **Read:** View all tickets in responsive grid layout
- **Update:** Click "Edit" on ticket card, modify, save
- **Delete:** Click "Delete" with confirmation dialog

### Filtering

Filter tickets by status using the dropdown:
- All Tickets
- Open
- In Progress
- Closed

## 🎨 Design System

### Layout

- **Max Width:** 1440px (centered on large screens)
- **Container Padding:** 1.5rem (24px)
- **Responsive Breakpoints:**
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

### Color Palette

```css
--primary-color: #4f46e5 (Indigo)
--secondary-color: #10b981 (Green)
--danger-color: #ef4444 (Red)
--warning-color: #f59e0b (Amber)
```

### Status Colors

- **Open:** Green (`#10b981`)
- **In Progress:** Amber (`#f59e0b`)
- **Closed:** Gray (`#6b7280`)

### Design Elements

- **Animated Wavy Hero:** SVG wave with 10s animation cycle
- **3 Decorative Circles:** Floating with animations and gradients
  - Circle 1: Top right (Golden gradient)
  - Circle 2: Left middle (Green gradient)
  - Circle 3: Bottom right (Red gradient)
  - Features Circle: Bottom of features section (Purple gradient)
- **Box-shaped Sections:** Rounded corners with shadows
- **Feature Cards:** Grid layout with hover effects

## ♿ Accessibility Features

- Semantic HTML5 elements
- ARIA labels and descriptions
- Keyboard navigation support
- Focus visible states
- Color contrast compliance (WCAG AA)
- Screen reader friendly
- Form validation with `aria-describedby`
- Toast notifications with appropriate roles
- Modal with Teleport to body

## 🔄 Vue-Specific Features

### Composition API

All components use `<script setup>` syntax for cleaner, more concise code:

```vue
<script setup>
import { ref, computed, onMounted } from 'vue'

const tickets = ref([])
const filteredTickets = computed(() => {
  // Computed logic
})

onMounted(() => {
  // Lifecycle logic
})
</script>
```

### Reactive State

Using `ref` and `reactive` for state management:

```javascript
const formData = reactive({
  title: '',
  status: 'open'
})

const loading = ref(false)
```

### Vue Router Guards

Protected routes using navigation guards:

```javascript
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/auth/login')
  } else {
    next()
  }
})
```

### Teleport for Modals

Modal overlays using Vue's Teleport feature:

```vue
<Teleport to="body">
  <div v-if="showModal" class="modal-overlay">
    <!-- Modal content -->
  </div>
</Teleport>
```

## 🧪 Testing Checklist

- [ ] Landing page loads correctly
- [ ] Animated wave is visible and animating
- [ ] 3 decorative circles are floating
- [ ] Login with valid credentials works
- [ ] Login with invalid credentials shows error
- [ ] Signup creates new account
- [ ] Dashboard shows correct stats
- [ ] Protected routes redirect unauthorized users
- [ ] Create ticket works with validation
- [ ] Edit ticket updates correctly
- [ ] Delete ticket with confirmation works
- [ ] Filter by status works
- [ ] Toast notifications appear
- [ ] Logout clears session
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Keyboard navigation works
- [ ] Form validation works

## 📱 Responsive Design

### Mobile (< 768px)
- Stacked layout
- Hamburger menu
- Full-width buttons
- Single column grids
- Smaller decorative circles

### Tablet (768px - 1024px)
- 2-column grids
- Compact navigation
- Optimized spacing

### Desktop (> 1024px)
- Multi-column grids
- Full navigation
- Max-width container (1440px)
- Larger decorative circles

## 🔄 Data Persistence

All data is stored in **localStorage**:

- **Session:** `ticketapp_session`
- **Tickets:** `ticketapp_tickets`

Data persists across page refreshes and browser sessions.

## 🚨 Error Handling

### Form Validation
- Inline error messages below fields
- Real-time validation on blur events
- Submit validation prevents invalid data

### Simulated API Errors
- Toast notifications for errors
- Network delay simulation (800ms)
- Proper error messages

### Authorization
- Navigation guard redirects to login
- Session expiry handling
- Clear error messages via toast

## 🎯 Key Differences from React Version

1. **Template Syntax:** Vue uses template-based syntax vs JSX
2. **Reactivity:** Vue's reactivity system with `ref` and `reactive`
3. **Component Communication:** Props and Emits vs Props and Callbacks
4. **Router:** Vue Router with navigation guards
5. **Directives:** `v-if`, `v-for`, `v-model`, `v-bind`, `@click`
6. **Teleport:** Built-in for modals vs React Portals
7. **Lifecycle:** `onMounted` vs `useEffect`
8. **Computed Properties:** Built-in computed vs manual useMemo

## 🔮 Future Enhancements

- Real backend API integration
- Pinia for global state management
- User-specific ticket isolation
- Advanced filtering and search
- Ticket assignment to users
- Comments and activity history
- File attachments
- Email notifications
- Export to CSV/PDF
- Ticket templates
- Custom fields
- Dark mode
- Internationalization (i18n)

## 📝 Development Commands

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🤝 Contributing

This is a personal project for HNG Internship Stage 2. Feel free to fork and modify for your own use.

## 📄 License

Created for HNG Internship Stage 2 - Educational purposes.


**Built with 💚 using Vue.js for HNG Internship**