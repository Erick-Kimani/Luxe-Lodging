<template>
  <v-container fluid class="blog-background py-12">

    <!-- HERO -->
    <v-row class="mb-16 align-center">
      <v-col cols="12" md="6">
        <h1 class="text-h3 font-weight-bold mb-4 text-white">
          Discover Luxe Lodging: Your Gateway to Premium Experiences
        </h1>
        <p class="text-body-1 mb-6 text-white">
          Luxe Lodging connects you with luxury hotels, dining, transport,
          and curated travel experiences across Kenya.
        </p>
        <v-btn color="deep-orange-darken-2" size="large" @click="goToLogin">
          Login to Explore More
        </v-btn>
      </v-col>

      <v-col cols="12" md="6">
        <v-img
          src="public/images/Picture 1 .jpg"
          height="420"
          cover
          class="rounded-xl hero-image"
        />
      </v-col>
    </v-row>

    <!-- ALTERNATING BLOG SECTIONS (RETAINED) -->
    <v-row
      v-for="(section, index) in blogSections"
      :key="index"
      class="my-20 align-center"
    >
      <v-col cols="12" md="6" :order-md="index % 2 === 0 ? 1 : 2">
        <v-img
          :src="section.image"
          height="360"
          cover
          class="rounded-xl blog-image"
        />
      </v-col>

      <v-col cols="12" md="6" :order-md="index % 2 === 0 ? 2 : 1">
        <h2 class="text-h4 font-weight-bold mb-4 text-white">
          {{ section.title }}
        </h2>
        <p class="text-body-1 text-white">
          {{ section.description }}
        </p>
      </v-col>
    </v-row>

    <!-- GLASS CARD CAROUSEL -->
    <v-carousel
      cycle
      interval="3200"
      height="440"
      hide-delimiter-background
      show-arrows-on-hover
      class="mt-10"
    >
      <v-carousel-item v-for="(chunk, i) in carouselChunks" :key="i">
        <v-row class="fill-height pa-6" justify="center" align="center">
          <v-col
            v-for="(item, index) in chunk"
            :key="index"
            cols="12"
            sm="4"
          >
            <v-card class="glass-card">
              <v-img :src="item.image" height="220" cover class="rounded-t-xl" />
              <v-card-title class="font-weight-bold">
                {{ item.title }}
              </v-card-title>
              <v-card-text>{{ item.text }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- FAN STACKED CARDS (ENHANCED) -->
    <v-row class="mt-20 justify-center">
      <v-col cols="12" md="10">
        <h2 class="text-h4 font-weight-bold text-center mb-12 text-white">
          Our Premium Services
        </h2>

        <div class="fan-container">
          <v-card
            v-for="(service, index) in services"
            :key="service.title"
            class="fan-card glass-card"
            :style="fanStyle(index)"
          >
            <v-img
              :src="service.image"
              height="220"
              cover
              class="rounded-t-xl"
            />
            <v-card-title class="font-weight-bold">
              {{ service.title }}
            </v-card-title>
            <v-card-text>
              {{ service.description }}
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>

    <!-- CTA -->
    <v-row class="mt-24 justify-center">
      <v-col cols="12" md="8" class="text-center">
        <h2 class="text-h4 font-weight-bold mb-4 text-white">
          Ready to Unlock Your Luxe Experience?
        </h2>
        <p class="text-white mb-6">
          Sign in and start planning your perfect stay today.
        </p>
        <v-btn color="deep-orange-darken-2" size="large" @click="goToSignup">
          Proceed
        </v-btn>
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const goToLogin = () => router.push('/login')
const goToSignup = () => router.push('/signup')

const blogSections = [
  {
    title: 'Luxury Hotels & Resorts',
    description:
      'Handpicked hotels offering world-class amenities and breathtaking views.',
    image: 'public/images/Picture 10 .jpg'
  },
  {
    title: 'Fine Dining Experiences',
    description:
      'Discover gourmet restaurants serving authentic local and global cuisine.',
    image: 'public/images/Picture 15 .jpg'
  },
  {
    title: 'Reliable Transport Services',
    description:
      'Travel safely and comfortably with trusted transport providers.',
    image: 'public/images/Picture 20 .jpg'
  },
  {
    title: 'Professional Tour Guides',
    description:
      'Explore hidden gems with knowledgeable local experts.',
    image: 'public/images/Picture 25 .jpg'
  }
]

const carouselItems = [
  { title: 'Luxury Hotels', text: 'Elite accommodation.', image: 'public/images/Picture 1 .jpg' },
  { title: 'Fine Dining', text: 'Premium cuisine.', image: 'public/images/Picture 2 .jpg' },
  { title: 'Transport', text: 'Comfort & safety.', image: 'public/images/Picture 3 .jpg' },
  { title: 'Safari', text: 'Wildlife luxury.', image: 'public/images/Picture 4 .jpg' },
  { title: 'Beach', text: 'Ocean retreats.', image: 'public/images/Picture 5 .jpg' },
  { title: 'Guides', text: 'Local expertise.', image: 'public/images/Picture 6 .jpg' }
]

const carouselChunks = computed(() => {
  const chunks = []
  for (let i = 0; i < carouselItems.length; i += 3) {
    chunks.push(carouselItems.slice(i, i + 3))
  }
  return chunks
})

const services = [
  { title: 'Luxury Hotels', description: 'Five-star accommodation.', image: 'public/images/Picture 30 .jpg' },
  { title: 'Restaurants', description: 'Elite dining experiences.', image: 'public/images/Picture 22 .jpg' },
  { title: 'Transport', description: 'Executive travel.', image: 'public/images/Picture 18 .jpg' },
  { title: 'Safari Tours', description: 'Premium safari packages.', image: 'public/images/Picture 4 .jpg' },
  { title: 'Beach Getaways', description: 'Luxury coastal escapes.', image: 'public/images/Picture 23 .jpg' }
]

const fanStyle = (index) => {
  const center = Math.floor(services.length / 2)
  const offset = (index - center) * 130
  const rotation = (index - center) * 8

  return {
    transform: `translateX(${offset}px) rotate(${rotation}deg)`,
    zIndex: index
  }
}
</script>

<style scoped>
.blog-background {
  min-height: 100vh;
  background-image: url('public/images/Nairobi National Park .jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
}

.blog-background::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
}

.blog-background > * {
  position: relative;
  z-index: 1;
}

.glass-card {
  backdrop-filter: blur(16px);
  background: rgba(255, 255, 255, 0.75);
  border-radius: 34px;
  border: 7px solid rgba(255, 255, 255, 0.35);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.3);
  transition: transform 0.45s ease, box-shadow 0.45s ease;
}

/* FAN STACK */
.fan-container {
  position: relative;
  height: 520px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fan-card {
  position: absolute;
  width: 320px;
  cursor: pointer;
}

.fan-card:hover {
  transform: translateX(0) rotate(0deg) scale(1.1) !important;
  z-index: 999;
  box-shadow: 0 50px 100px rgba(0, 0, 0, 0.55);
}

.hero-image,
.blog-image {
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.4);
}

.rounded-xl {
  border-radius: 22px;
}

.rounded-t-xl {
  border-top-left-radius: 22px;
  border-top-right-radius: 22px;
}
</style>
