# TicketApp - Twig/PHP Implementation

A comprehensive ticket management system built with Twig templating engine and PHP for HNG Internship Stage 2.

## 🎯 Features

- **Landing Page** with animated wavy hero section and 3 floating decorative circles
- **Authentication System** with secure password hashing
- **Protected Routes** with PHP session management
- **Dashboard** with real-time ticket statistics
- **Full CRUD Operations** for ticket management
- **Form Validation** with server-side checks
- **Flash Messages** for user feedback
- **Responsive Design** (mobile, tablet, desktop)
- **Accessibility** compliant with WCAG standards

## 🛠️ Tech Stack

- **PHP** 8.0+
- **Twig** 3.0 - Templating engine
- **Composer** - Dependency management
- **JSON** - File-based data storage
- **Apache** - Web server with mod_rewrite

## 📁 Project Structure

```
ticket-app-twig/
├── public/
│   ├── index.php           # Entry point & router
│   ├── .htaccess           # URL rewriting
│   ├── css/
│   │   └── style.css       # Styles
│   └── js/
│       ├── app.js          # Main JS
│       └── tickets.js      # Ticket management JS
├── src/
│   ├── Controller/
│   │   ├── HomeController.php
│   │   ├── AuthController.php
│   │   ├── DashboardController.php
│   │   └── TicketController.php
│   ├── Utils/
│   │   ├── Session.php     # Authentication
│   │   └── Storage.php     # Ticket storage
│   └── views/
│       ├── layout/
│       │   ├── base.twig
│       │   ├── navbar.twig
│       │   └── footer.twig
│       ├── landing.twig
│       ├── auth/
│       │   ├── login.twig
│       │   └── signup.twig
│       ├── dashboard.twig
│       └── tickets/
│           └── index.twig
├── data/                   # Created automatically
│   ├── tickets.json
│   └── users.json
├── vendor/                 # Composer dependencies
├── composer.json
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites

- PHP 8.0 or higher
- Composer
- Apache with mod_rewrite enabled
- Git

### Step 1: Clone the Repository

```bash
git clone <your-repo-url>
cd ticket-app-twig
```

### Step 2: Install Dependencies

```bash
composer install
```

This will install:
- Twig 3.0
- PHP dotenv (if needed)

### Step 3: Configure Apache

Point your Apache document root to the `public/` directory.

**Option A: Using XAMPP/WAMP/MAMP**
1. Copy the project to `htdocs` or `www` folder
2. Access via `http://localhost/ticket-app-twig/public`

**Option B: Using PHP Built-in Server** (Development only)
```bash
cd public
php -S localhost:8000
```

Access at `http://localhost:8000`

### Step 4: Set Permissions

```bash
chmod 755 data/
chmod 644 data/*.json
```

### Step 5: Access the Application

Visit `http://localhost:8000` (or your configured URL)

## 🔐 Authentication

### Demo Credentials

- **Email:** demo@ticket.app
- **Password:** password123

OR

- **Email:** admin@ticket.app
- **Password:** admin123

### Session Management

- Sessions use PHP's native `$_SESSION`
- Session key: `ticketapp_session`
- Sessions expire after 24 hours
- Passwords are hashed using `password_hash()`

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

- **Create:** Click "Create Ticket" button, fill modal form, submit
- **Read:** View all tickets in grid layout with filters
- **Update:** Click "Edit", modify in modal, submit
- **Delete:** Click "Delete" with browser confirmation

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

- **Animated Wavy Hero:** SVG wave with 10s animation
- **3 Decorative Circles:** Floating with CSS animations
  - Circle 1: Top right (Golden gradient)
  - Circle 2: Left middle (Green gradient)
  - Circle 3: Bottom right (Red gradient)
  - Features Circle: Bottom of features (Purple gradient)
- **Box-shaped Sections:** Rounded corners with shadows
- **Feature Cards:** Grid layout with hover effects

## ♿ Accessibility Features

- Semantic HTML5 elements
- Proper form labels
- ARIA attributes where needed
- Keyboard navigation support
- Focus visible states
- Color contrast compliance (WCAG AA)
- Alt text for images
- Screen reader friendly

## 🔄 Twig-Specific Features

### Template Inheritance

```twig
{% extends 'layout/base.twig' %}

{% block content %}
  <!-- Page content -->
{% endblock %}
```

### Template Includes

```twig
{% include 'layout/navbar.twig' %}
```

### Filters

```twig
{{ ticket.createdAt|date('M d, Y') }}
{{ ticket.title|escape('js') }}
{{ tickets|json_encode }}
```

### Conditionals

```twig
{% if isAuthenticated %}
  <!-- Show user menu -->
{% else %}
  <!-- Show login button -->
{% endif %}
```

### Loops

```twig
{% for ticket in tickets %}
  <!-- Render ticket -->
{% endfor %}
```

## 🧪 Testing Checklist

- [ ] Landing page loads correctly
- [ ] Animated wave is visible
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
- [ ] Flash messages appear
- [ ] Logout clears session
- [ ] Responsive on mobile
- [ ] Responsive on tablet
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

Data is stored in JSON files in the `data/` directory:

- **Users:** `data/users.json`
- **Tickets:** `data/tickets.json`

Data persists across server restarts.

## 🚨 Error Handling

### Form Validation
- Server-side validation
- Flash messages for errors
- Redirect back to form

### Authentication
- Session-based authentication
- Protected routes redirect to login
- Flash messages for expired sessions

### File Operations
- Automatic directory creation
- Error handling for file read/write
- Graceful fallbacks

## 🎯 Key Differences from React/Vue Versions

1. **Server-Side Rendering:** All HTML rendered on server
2. **No Client State:** State managed in PHP sessions
3. **Full Page Reloads:** Traditional web app pattern
4. **Template Engine:** Twig vs JSX/Vue templates
5. **File-Based Storage:** JSON files vs localStorage
6. **PHP Sessions:** vs JWT tokens
7. **Flash Messages:** vs Toast notifications
8. **Form Submissions:** Traditional POST vs AJAX

## 🔮 Future Enhancements

- Database integration (MySQL/PostgreSQL)
- AJAX for form submissions
- Real-time updates with WebSockets
- User-specific ticket isolation
- Advanced filtering and search
- File attachments
- Email notifications
- Export to CSV/PDF
- API endpoints (REST/GraphQL)
- Docker containerization

## 📝 Development Commands

```bash
# Install dependencies
composer install

# Update dependencies
composer update

# Run development server
cd public && php -S localhost:8000

# Check PHP syntax
php -l src/Controller/HomeController.php

# Format code (if using PHP-CS-Fixer)
php-cs-fixer fix src/
```

## 🔧 Troubleshooting

### Issue: 404 Errors

**Solution:** Ensure `.htaccess` is working and mod_rewrite is enabled:
```bash
# Check if mod_rewrite is enabled
apache2ctl -M | grep rewrite
```

### Issue: Permission Denied

**Solution:** Set proper permissions:
```bash
chmod -R 755 data/
chown -R www-data:www-data data/
```

### Issue: Composer Not Found

**Solution:** Install Composer:
```bash
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

## 🤝 Contributing

This is a personal project for HNG Internship Stage 2. Feel free to fork and modify.

## 📄 License

Created for HNG Internship Stage 2 - Educational purposes.
