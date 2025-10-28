<template>
  <div class="landing-page">
    <!-- Hero Section with Animated Wave -->
    <section class="hero-section">
      <div class="decorative-circle circle-1"></div>
      <div class="decorative-circle circle-2"></div>
      <div class="decorative-circle circle-3"></div>
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">
            Manage Your Tickets <span class="highlight">Effortlessly</span>
          </h1>
          <p class="hero-subtitle">
            Streamline your workflow with our powerful ticket management system. 
            Track, organize, and resolve issues faster than ever.
          </p>
          <div class="hero-buttons">
            <router-link to="/auth/signup" class="btn btn-primary btn-lg">
              Get Started
            </router-link>
            <router-link to="/auth/login" class="btn btn-secondary btn-lg">
              Login
            </router-link>
          </div>
        </div>
      </div>
      <!-- Animated Wave SVG -->
      <svg class="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path 
          fill="#ffffff" 
          fill-opacity="1" 
          d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,117.3C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        >
          <animate
            attributeName="d"
            dur="10s"
            repeatCount="indefinite"
            values="
              M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,117.3C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
              
              M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
              
              M0,160L48,154.7C96,149,192,139,288,138.7C384,139,480,149,576,165.3C672,181,768,203,864,202.7C960,203,1056,181,1152,154.7C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
              
              M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,117.3C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z
            "
          />
        </path>
      </svg>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="decorative-circle features-circle"></div>
      <div class="container">
        <div class="section-header">
          <h2>Why Choose TicketApp?</h2>
          <p>Everything you need to manage tickets efficiently</p>
        </div>

        <div class="features-grid">
          <div class="feature-box">
            <div class="feature-icon">🎯</div>
            <h3>Easy to Use</h3>
            <p>Intuitive interface designed for seamless ticket management</p>
          </div>

          <div class="feature-box">
            <div class="feature-icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>Create, update, and resolve tickets in seconds</p>
          </div>

          <div class="feature-box">
            <div class="feature-icon">📊</div>
            <h3>Real-time Stats</h3>
            <p>Track your ticket metrics with live dashboard updates</p>
          </div>

          <div class="feature-box">
            <div class="feature-icon">🔒</div>
            <h3>Secure</h3>
            <p>Your data is protected with industry-standard security</p>
          </div>

          <div class="feature-box">
            <div class="feature-icon">🎨</div>
            <h3>Beautiful Design</h3>
            <p>Modern, responsive interface that works on all devices</p>
          </div>

          <div class="feature-box">
            <div class="feature-icon">🚀</div>
            <h3>Always Improving</h3>
            <p>Regular updates with new features and enhancements</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-box">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of teams managing their tickets efficiently</p>
          <router-link to="/auth/signup" class="btn btn-primary btn-lg">
            Create Free Account
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// No logic needed for landing page
</script>