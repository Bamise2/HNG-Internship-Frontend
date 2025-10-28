# TicketApp - React Implementation

A comprehensive ticket management system built with React for HNG Internship Stage 2.

## 🎯 Features

- **Landing Page** with wavy hero section and decorative elements
- **Authentication System** with simulated login/signup
- **Protected Routes** with session management
- **Dashboard** with real-time ticket statistics
- **Full CRUD Operations** for ticket management
- **Form Validation** with inline error messages
- **Toast Notifications** for user feedback
- **Responsive Design** (mobile, tablet, desktop)
- **Accessibility** compliant with WCAG standards

## 🛠️ Tech Stack

- **React** 18.2.0
- **React Router DOM** 6.20.0 - Client-side routing
- **React Hot Toast** 2.4.1 - Toast notifications
- **LocalStorage** - Session and data persistence
- **CSS3** - Custom styling with CSS variables




##  Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Step 1: Clone the Repository

```bash
git clone <your-repo-url>
cd ticket-app-react
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Run the Development Server

```bash
npm run dev

```


### Step 4: Build for Production

```bash
npm run build
# or
yarn build
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

- **Create:** Click "Create Ticket" button
- **Read:** View all tickets in grid layout
- **Update:** Click "Edit" on any ticket card
- **Delete:** Click "Delete" with confirmation

### Filtering

Filter tickets by status:
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

- **Wavy Hero Section:** SVG wave at bottom of hero
- **Decorative Circles:** 2 floating circles (CSS)
- **Box-shaped Sections:** Rounded corners with shadows
- **Feature Cards:** Grid layout with hover effects

## ♿ Accessibility Features

- Semantic HTML5 elements
- ARIA labels and descriptions
- Keyboard navigation support
- Focus visible states
- Color contrast compliance (WCAG AA)
- Screen reader friendly
- Form validation with aria-describedby
- Toast notifications with appropriate roles

## 🧪 Testing Checklist

- [ ] Landing page loads correctly
- [ ] Hero wave is visible
- [ ] Decorative circles are displayed
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

### Tablet (768px - 1024px)
- 2-column grids
- Compact navigation
- Optimized spacing

### Desktop (> 1024px)
- Multi-column grids
- Full navigation
- Max-width container (1440px)

## 🔄 Data Persistence

All data is stored in **localStorage**:

- **Session:** `ticketapp_session`
- **Tickets:** `ticketapp_tickets`

Data persists across page refreshes and browser sessions.

## 🚨 Error Handling

### Form Validation
- Inline error messages
- Real-time validation on blur
- Submit validation

### API Errors (Simulated)
- Toast notifications for errors
- Network delay simulation (800ms)
- Proper error messages

### Authorization
- Redirect to login for unauthorized access
- Session expiry handling
- Clear error messages

## 🎯 Known Issues & Limitations

1. **Mock Authentication:** Uses localStorage, not real backend
2. **No Real API:** All data stored locally
3. **No User Separation:** All users see same tickets
4. **Session Storage:** Cleared on browser cache clear
5. **No Image Upload:** Tickets don't support attachments

## 🔮 Future Enhancements

- Real backend API integration
- User-specific ticket isolation
- Advanced filtering and search
- Ticket assignment to users
- Comments and activity history
- File attachments
- Email notifications
- Export to CSV/PDF
- Ticket templates
- Custom fields

## 📝 Development Notes

### State Management
- Local component state with `useState`
- No global state management library
- Simple and straightforward

### Routing
- React Router DOM v6
- Protected routes with wrapper component
- Automatic redirect for auth state

### Styling Approach
- Pure CSS with CSS variables
- No CSS framework dependencies
- Mobile-first responsive design
- BEM-inspired naming convention

## 🤝 Contributing

This is a personal project for HNG Internship Stage 2. Feel free to fork and modify for your own use.

## 📄 License

Created for HNG Internship Stage 2 - Educational purposes.



**Built with ❤️ for HNG Internship**