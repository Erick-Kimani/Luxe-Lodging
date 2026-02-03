<script setup>
</script>

<template>
  <section class="about-hero">
    <!-- Background Overlay -->
    <div class="overlay"></div>

    <!-- Glass Card -->
    <div class="about-card glass-card">
      <h1>About Luxe-Lodging</h1>
      <p>
        At Luxe-Lodging, we redefine luxury travel by offering premium hotels,
        resorts, and lodges tailored for comfort, elegance, and unforgettable
        experiences. Our mission is to ensure every stay is exceptional.
      </p>

      <div class="about-actions">
        <!-- <router-link to="/hotels" class="btn-primary">Explore Hotels</router-link> -->
        <router-link to="/contact" class="btn-secondary">Contact Us</router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Hero Section */
.about-hero {
  height: calc(100vh - 80px); /* Navbar height deducted */
  background-image: url("/images/Picture 2 .jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end; /* Align card to right */
  padding-right: 60px;
}

/* Dark Overlay */
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3); /* slightly lighter so glass card is visible */
}

/* Glass Card */
.about-card {
  position: relative;
  padding: 40px;
  max-width: 400px;
  border-radius: 20px;
  color: #ffffff;
  font-family: 'Poppins', sans-serif;
  z-index: 2;
  box-shadow: 0 10px 30px rgba(0,0,0,0.4);
  
  /* Glass Effect */
  background: rgba(255, 255, 255, 0.1); /* semi-transparent */
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.25);
}

/* Heading */
.about-card h1 {
  font-family: 'Playfair Display', serif;
  font-size: 2.2rem;
  margin-bottom: 16px;
  line-height: 1.2;
}

/* Paragraph */
.about-card p {
  font-size: 1rem;
  margin-bottom: 24px;
  line-height: 1.5;
  color: #e5e7eb;
}

/* Buttons */
.about-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn-primary {
  background-color: #d4af37;
  color: #1a3a34;
  padding: 12px 28px;
  border-radius: 999px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  background-color: #e6c75a;
}

.btn-secondary {
  border: 2px solid #ffffff;
  color: #ffffff;
  padding: 12px 28px;
  border-radius: 999px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background-color: #ffffff;
  color: #1a3a34;
}

/* Responsive */
@media (max-width: 1024px) {
  .about-hero {
    justify-content: center;
    padding-right: 20px;
    padding-left: 20px;
  }

  .about-card {
    max-width: 90%;
    padding: 30px;
  }
}

@media (max-width: 600px) {
  .about-card h1 {
    font-size: 1.8rem;
  }

  .about-card p {
    font-size: 0.95rem;
  }

  .about-actions {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
