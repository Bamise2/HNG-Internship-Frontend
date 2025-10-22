# HNG Frontend Stage 1 - Multi-Page Application

A responsive, accessible multi-page application built with semantic HTML, CSS, and vanilla JavaScript.

## 🎯 Project Overview

This project extends the Stage 0 Profile Card by adding:
- **Contact Us Page**: Form with client-side validation
- **About Me Page**: Personal reflections and goals
- **Navigation**: Seamless navigation between pages

## 📁 Project Structure

```
hng-frontend-stage1/
├── index.html          # Profile Card (Home page)
├── contact.html        # Contact form with validation
├── about.html          # About me / reflections page
└── README.md           # Project documentation
```

## ✨ Features

### Home Page (index.html)
- Profile card with personal information
- Avatar display
- Social media links
- Hobbies and dislikes lists
- Real-time timestamp
- Fully responsive layout

### Contact Us Page (contact.html)
- Form with 4 required fields:
  - Full Name
  - Email (validated format)
  - Subject
  - Message (minimum 10 characters)
- Real-time validation
- Error messages with ARIA support
- Success confirmation
- Fully keyboard accessible

### About Me Page (about.html)
- Personal bio
- Program goals
- Areas of low confidence
- Note to future self
- Additional reflections
- Semantic HTML structure

## 🎨 Design Features

- Modern gradient background
- Glassmorphism effects
- Smooth animations and transitions
- Consistent design language across pages
- Mobile-first responsive design
- Accessible color contrast

## ♿ Accessibility Features

- Semantic HTML5 elements (`<main>`, `<section>`, `<nav>`, `<article>`)
- All form inputs have associated `<label>` elements
- Error messages linked via `aria-describedby`
- Keyboard navigation support
- Focus indicators on interactive elements
- Alt text for images
- ARIA roles where appropriate

## 📱 Responsive Design

Breakpoints:
- Mobile: < 768px (stacked layout)
- Tablet/Desktop: ≥ 768px (enhanced layout)

All pages adapt seamlessly to different screen sizes.

## 🧪 Testing

All required data-testid attributes are implemented:

### Profile Card (Home)
- `test-profile-card` - Main container
- `test-user-name` - User's name
- `test-user-bio` - Biography
- `test-user-time` - Current timestamp
- `test-user-avatar` - Profile image
- `test-user-social-links` - Social links container
- `test-user-hobbies` - Hobbies list
- `test-user-dislikes` - Dislikes list

### Contact Page
- `test-contact-name` - Name input
- `test-contact-email` - Email input
- `test-contact-subject` - Subject input
- `test-contact-message` - Message textarea
- `test-contact-submit` - Submit button
- `test-contact-error-name` - Name error message
- `test-contact-error-email` - Email error message
- `test-contact-error-subject` - Subject error message
- `test-contact-error-message` - Message error message
- `test-contact-success` - Success message

### About Page
- `test-about-page` - Main container
- `test-about-bio` - Biography section
- `test-about-goals` - Goals section
- `test-about-confidence` - Low confidence areas
- `test-about-future-note` - Future self note
- `test-about-extra` - Additional thoughts

## 🚀 How to Run Locally

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd hng-frontend-stage