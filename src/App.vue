<script setup lang="ts">
import { RouterView, useRoute } from "vue-router"
import { computed } from "vue"

import Navbar from "./components/NavBar.vue"
import Footer from "./components/Footer.vue"

const route = useRoute()

// 👇 Control layout visibility per route
const showLayout = computed(() => !route.meta.hideLayout)
</script>

<template>
  <v-app>
    <!-- Navbar -->
    <Navbar v-if="showLayout" />

    <v-main>
      <RouterView />
    </v-main>

    <!-- Footer -->
    <Footer v-if="showLayout" />
  </v-app>
</template>

<style scoped>
/* Ensure full-height layout */
.v-application {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

v-main {
  flex: 1;
  padding: 24px;
}
</style>
