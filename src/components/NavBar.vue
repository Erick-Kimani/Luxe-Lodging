<template>
  <nav class="navbar">
    <div class="nav-container">

      <!-- Brand -->
      <router-link to="/" class="nav-brand">
        <span class="logo-text luxury-title">Luxe Lodging</span>
      </router-link>

      <!-- Navigation -->
      <ul class="nav-links">

        <li>
          <router-link to="/" class="nav-link" active-class="active">Home</router-link>
        </li>

        <li>
          <router-link to="/choice" class="nav-link" active-class="active">
            Explore Hotels
          </router-link>
        </li>

        <li>
          <router-link to="/aboutus" class="nav-link" active-class="active">
            About Us
          </router-link>
        </li>

        <li>
          <router-link to="/contactus" class="nav-link" active-class="active">
            Contact Us
          </router-link>
        </li>

        <li>
          <router-link to="/blog" class="nav-link" active-class="active">
            Blog
          </router-link>
        </li>

        <!-- 🔐 Admin only -->
        <li v-if="isLoggedIn && isAdmin">
          <router-link to="/administrator" class="nav-link" active-class="active">
            Administrator
          </router-link>
        </li>

      </ul>

      <!-- CTA -->
      <div class="nav-actions" v-if="!isLoggedIn && !isAuthPage">
        <router-link to="/login" class="btn-outline">
          Get Started
        </router-link>
      </div>

    </div>
  </nav>
</template>
>








<script setup>
import { ref, watch } from "vue"
import { useRoute } from "vue-router"
import AuthService from "@/services/authService"
import TokenService from "@/services/TokenService"

const route = useRoute()

// 🔥 Reactive auth state
const isLoggedIn = ref(AuthService.isLoggedIn())
const isAdmin = ref(AuthService.hasAbility("admin"))

// 🔄 Re-check auth on every navigation
watch(
  () => route.fullPath,
  () => {
    isLoggedIn.value = AuthService.isLoggedIn()
    isAdmin.value = AuthService.hasAbility("admin")
  },
  { immediate: true }
)

// Hide CTA on auth pages
const isAuthPage = ref(false)

watch(
  () => route.path,
  (path) => {
    isAuthPage.value = ["/login", "/signup"].includes(path.toLowerCase())
  },
  { immediate: true }
)
</script>






<style scoped>
/* Navbar */
.navbar {
  background-color: #102c27;
  height: 80px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
  font-family: 'Poppins', sans-serif;
}

.nav-container {
  width: 90%;
  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Brand */
.nav-brand {
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
}

/* Luxury Title */
.luxury-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.76rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;

  background: linear-gradient(
    135deg,
   
    #d4af37,
    #f5e6b0,
    #b8962e
    
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  text-shadow:
    0 1px 2px rgba(0, 0, 0, 0.4),
    0 0 10px rgba(212, 175, 55, 0.25);

  transition: all 0.35s ease;
}

/* Brand Hover */
.nav-brand:hover .luxury-title {
  letter-spacing: 2.5px;
  transform: scale(1.03);
  text-shadow:
    0 2px 6px rgba(0, 0, 0, 0.5),
    0 0 14px rgba(212, 175, 55, 0.45);
}

/* Navigation Links */
.nav-links {
  display: flex;
  list-style: none;
  gap: 16px;
}

/* Rounded Nav Items */
.nav-link {
  text-decoration: none;
  color: #e5e7eb;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 8px 18px;
  border-radius: 999px;
  transition: all 0.3s ease;
}

/* Hover Effect */
.nav-link:hover {
  background-color: rgba(74, 222, 128, 0.15);
  color: #4ade80;
}

/* Active */
.nav-link.active {
  background-color: #4ade80;
  color: #1a3a34;
  font-weight: 600;
}

/* CTA Button */
.btn-outline {
  font-family: 'Poppins', sans-serif;
  color: #ffffff;
  border: 2px solid #d4af37;
  padding: 10px 24px;
  border-radius: 999px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-outline:hover {
  background-color: #d4af37;
  color: #1a3a34;
  transform: translateY(-2px);
}

/* Mobile */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
}
</style>
