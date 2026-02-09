<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api.js'  // ✅ Changed from axios to api
import { useMeetingsStore } from '@/Store/Meetings'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const store = useMeetingsStore()
const authStore = useAuthStore()

const Meeting = computed(() => store.selectedMeeting)
const currentUser = computed(() => authStore.user)

function goBack() {
  router.push('/meetings')
}

const numericPrice = computed(() => {
  if (!Meeting.value?.price) return 0
  const priceStr = String(Meeting.value.price)
  const num = parseFloat(priceStr.replace(/[^0-9.]/g, ''))
  return isNaN(num) ? 0 : num
})

// 🔵 Track click automatically + open website
async function handleVisit() {
  if (!Meeting.value?.website) return

  try {
    await api.post('/track-click', {  // ✅ Changed from axios to api, removed base URL
      service_id: Meeting.value.service_id ?? Meeting.value.id,
      service_name: Meeting.value.name,
      name: currentUser.value?.name ?? 'Guest',
    })
  } catch (error) {
    console.error('Meeting click tracking failed:', error)
  } finally {
    // ✅ Navigation must ALWAYS happen
    window.open(Meeting.value.website, '_blank')
  }
}
</script>


<template>
  <v-main class="pa-0 ma-0 bg-white min-h-screen">
    <v-row no-gutters class="fill-height min-h-screen">

      <!-- IMAGE SECTION -->
      <v-col cols="12" md="6" lg="5" class="relative overflow-hidden">
        <div class="full-page-inset">
          <v-img 
            :src="Meeting?.image" 
            cover
            height="100vh"
            class="main-image"
          >
            <v-btn
              icon="mdi-arrow-left"
              class="ma-6 floating-back-btn"
              elevation="4"
              @click="goBack"
            />
          </v-img>
        </div>
      </v-col>

      <!-- CONTENT SECTION -->
      <v-col cols="12" md="6" lg="7" class="d-flex align-center bg-white">
        <v-container class="pa-10 pa-md-16">
          <div v-if="Meeting" class="content-wrapper">

            <span class="text-overline text-blue font-weight-bold mb-2 d-block">
              Premium Stay
            </span>

            <h1 class="text-h2 font-weight-black text-grey-darken-4 mb-6 leading-tight">
              {{ Meeting.name }}
            </h1>

            <p class="text-h6 text-grey-darken-1 mb-8 leading-relaxed">
              {{ Meeting.description }}
            </p>

            <v-divider class="mb-8" />

            <!-- PRICE -->
            <div class="mb-10">
              <div class="text-subtitle-1 text-grey-lighten-1 mb-1">
                Nightly Rate
              </div>
              <div class="text-h4 font-weight-bold text-blue-darken-3">
                Ksh {{ numericPrice }}
              </div>
            </div>

            <v-divider class="mb-8" />

            <!-- OFFICIAL WEBSITE -->
            <div class="pt-6">
              <div class="text-caption text-grey-lighten-1 mb-2">
                OFFICIAL WEBSITE
              </div>

              <button
                v-if="Meeting.website"
                @click="handleVisit"
                class="Meeting-link"
                type="button"
              >
                Visit Official Website
                <v-icon size="18" class="ml-2">mdi-open-in-new</v-icon>
              </button>

              <div v-else class="text-grey-lighten-1">
                Website not available
              </div>
            </div>

          </div>

          <v-alert v-else type="error" icon="mdi-alert-circle">
            Meeting data missing. Please return to the gallery.
          </v-alert>
        </v-container>
      </v-col>
    </v-row>
  </v-main>
</template>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}

/* CURVED IMAGE EDGE */
.full-page-inset {
  height: 100vh;
  width: 100%;
  clip-path: ellipse(95% 100% at 0% 50%);
  background: #f0f0f0;
}

.floating-back-btn {
  background: rgba(255, 255, 255, 0.8) !important;
  backdrop-filter: blur(5px);
}

.leading-tight {
  line-height: 1.1 !important;
}

.leading-relaxed {
  line-height: 1.8;
}

/* WEBSITE BUTTON */
.Meeting-link {
  display: inline-flex;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1976d2;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.Meeting-link:hover {
  color: #0d47a1;
  text-decoration: underline;
}

/* MOBILE */
@media (max-width: 960px) {
  .full-page-inset {
    height: 40vh;
    clip-path: ellipse(100% 100% at 50% 0%);
  }

  .min-h-screen {
    min-height: auto;
  }
}
</style>
