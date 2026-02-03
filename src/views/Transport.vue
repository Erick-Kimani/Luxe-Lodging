<script setup> 
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTransportsStore } from '@/Store/Transports'

const router = useRouter()
const store = useTransportsStore()

const Transports = ref([])
const searchQuery = ref('')

onMounted(() => {
  Transports.value = store.Transports
})

const filteredTransports = computed(() => {
  if (!searchQuery.value) return Transports.value
  const query = searchQuery.value.toLowerCase()
  return Transports.value.filter(
    Transport =>
      Transport.name.toLowerCase().includes(query) ||
      Transport.description.toLowerCase().includes(query)
  )
})

function viewDetails(Transport) {
  store.selectTransport(Transport)
  router.push('/transportdetails')
}
</script>

<template>
  <div class="page-container">
    <div class="hero-header">
      <div class="hero-image-container">
        <img src="/images/Picture 25 .jpg" alt="Header Image" class="hero-image" />
        <div class="hero-overlay">
          <h1 class="text-center text-3xl font-bold text-primary title-glow">
            Our Transport Lodges
          </h1>
        </div>
      </div>
    </div>

    <v-container class="py-10 content-body" fluid>
      <div class="search-wrapper mb-10 px-4">
        <v-text-field
          v-model="searchQuery"
          label="Search for a Transport..."
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          clearable
          class="search-field"
        />
      </div>

      <v-row class="px-4">
        <v-col
          v-for="(Transport, index) in filteredTransports"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          class="pb-10"
        >
          <div class="card-border-wrapper">
            <v-card class="Transport-card" elevation="0" @click="viewDetails(Transport)">
              <div class="image-wrapper">
                <v-img :src="Transport.image" height="200" cover />
              </div>

              <v-card-text class="pt-4">
                <h3 class="card-title">{{ Transport.name }}</h3>
                <p class="price">Price: {{ Transport.price }}</p>
                <p class="description">{{ Transport.description }}</p>
              </v-card-text>

              <v-card-actions class="px-4 pb-4 mt-auto">
                <!-- BUTTON: FULL WIDTH, REDUCED HEIGHT -->
                <v-btn
                  block
                  size="small"
                  color="orange"
                  variant="elevated"
                  class="details-btn"
                >
                  View Details
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-col>
      </v-row>

      <v-row v-if="filteredTransports.length === 0">
        <v-col cols="12" class="text-center">
          <p class="text-grey-lighten-1 mt-6">
            No Transports found matching "<strong>{{ searchQuery }}</strong>"
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.page-container {
  min-height: 100vh;
  background-color: #000;
  color: #fff;
}

/* --- HERO SECTION --- */
.hero-header {
  position: relative;
  width: 100%;
  height: 300px;
  background-color: #000;
}

.hero-image-container {
  position: relative;
  width: 100%;
  height: 100%;
  clip-path: ellipse(160% 112% at 60% 0%);
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8));
  display: flex;
  align-items: center;
  justify-content: center;
}

/* --- CONTENT BODY --- */
.content-body {
  position: relative;
  z-index: 2;
  background-color: #000; 
}

.search-field {
  max-width: 350px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

/* --- CARD BORDER --- */
.card-border-wrapper {
  position: relative;
  padding: 8px;
  border-radius: 68px;
  overflow: hidden;
  height: 100%;
  display: flex;
  transition: transform 0.3s ease;
}

.card-border-wrapper::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url('/images/Picture 5 .jpg'); 
  background-size: cover;
  background-position: center;
  border-radius: 68px;
  z-index: 0;
}

.Transport-card {
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 60px !important;
  background: rgba(30, 30, 30, 0.95) !important;
  backdrop-filter: blur(20px);
  cursor: pointer;
}

.card-border-wrapper:hover {
  transform: translateY(-10px);
}

.image-wrapper {
  overflow: hidden;
  border-top-left-radius: 60px;
  border-top-right-radius: 60px;
}

/* --- BUTTON HEIGHT CONTROL --- */
.details-btn {
  min-height: 36px !important;      /* reduces height */
  padding: 6px 0 !important;        /* keeps width full */
  font-weight: 600;
  letter-spacing: 0.5px;
  border-radius: 69px;
}

/* --- TEXT --- */
.title-glow {
  text-shadow: 0 0 15px rgba(255, 215, 0, 0.4);
}
.card-title { font-size: 1.4rem; font-weight: 700; color: #fff; }
.price { font-weight: bold; color: #ff9800; font-size: 1.1rem; }
.description { font-size: 0.95rem; color: #e0e0e0; }
.text-primary { color: #ffd700 !important; font-size: 3.5rem !important; }
</style>
