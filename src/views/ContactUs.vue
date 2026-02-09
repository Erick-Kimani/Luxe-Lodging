<template>
  <div class="contact-page">
    <v-container fluid fill-height class="pa-0 d-flex align-center">
      <v-row justify="start" align="center" class="ma-0">
        <v-col cols="11" sm="7" md="5" lg="4" xl="3" class="ml-md-10 ml-lg-16">

          <!-- CONTACT FORM -->
          <v-card class="formal-glass-card" elevation="0">
            <div class="pa-8">
              <div class="mb-8">
                <h2 class="formal-title">Contact Us</h2>
                <div class="gold-divider"></div>
                <p class="subtitle mt-2">Inquiries & Private Bookings</p>
              </div>

              <v-form @submit.prevent="submitForm">
                <label class="input-label">Full Name</label>
                <v-text-field
                  v-model="contactForm.name"
                  placeholder="Enter your name"
                  variant="outlined"
                  density="compact"
                  color="amber-lighten-2"
                  class="custom-input mb-4"
                  hide-details
                />

                <label class="input-label">Email Address</label>
                <v-text-field
                  v-model="contactForm.email"
                  placeholder="email@address.com"
                  variant="outlined"
                  density="compact"
                  color="amber-lighten-2"
                  class="custom-input mb-4"
                  hide-details
                />

                <label class="input-label">Inquiry Message</label>
                <v-textarea
                  v-model="contactForm.message"
                  placeholder="How may we assist you?"
                  variant="outlined"
                  density="compact"
                  color="amber-lighten-2"
                  rows="3"
                  no-resize
                  class="custom-input mb-8"
                  hide-details
                />

                <v-btn
                  block
                  height="50"
                  class="submit-btn"
                  :loading="loading"
                  type="submit"
                >
                  Send Inquiry
                </v-btn>
              </v-form>

              <div class="mt-10 pt-6 contact-footer">
                <div class="footer-item">
                  <v-icon size="14" color="amber-lighten-2">mdi-phone</v-icon>
                  <span>+254 700 000 000</span>
                </div>
                <div class="footer-item mt-1">
                  <v-icon size="14" color="amber-lighten-2">mdi-email</v-icon>
                  <span>concierge@luxelodging.com</span>
                </div>
              </div>
            </div>
          </v-card>

          <!-- ADMIN REPLY CARD -->
          <v-card
            v-if="adminReply"
            class="formal-glass-card mt-6"
            elevation="0"
          >
            <div class="pa-6">
              <h3 class="formal-reply-title">Reply from Concierge</h3>
              <div class="gold-divider mb-4"></div>

              <p class="reply-message">
                {{ adminReply }}
              </p>

              <p class="reply-date" v-if="replyDate">
                Replied on {{ replyDate }}
              </p>
            </div>
          </v-card>

        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import api from '@/services/api'

const contactForm = ref({
  name: '',
  email: '',
  message: ''
})

const loading = ref(false)
const error = ref(null)

const adminReply = ref(null)
const replyDate = ref(null)

/* Submit contact form */
const submitForm = async () => {
  loading.value = true
  error.value = null

  try {
    await api.post('/contactuses', contactForm.value)
    alert('Message sent successfully!')
    await fetchReply()
    contactForm.value.message = ''
  } catch (err) {
    console.error('Contact form error:', err)
    error.value = 'Failed to send message.'
  } finally {
    loading.value = false
  }
}

/* Fetch admin reply by email */
const fetchReply = async () => {
  if (!contactForm.value.email) return

  try {
    const res = await api.get('/contactuses/reply', {
      params: { email: contactForm.value.email }
    })

    adminReply.value = res.data.reply || null
    replyDate.value = res.data.replied_at || null
  } catch {
    adminReply.value = null
    replyDate.value = null
  }
}

/* Auto-check reply when email changes */
watch(
  () => contactForm.value.email,
  () => {
    adminReply.value = null
    replyDate.value = null
    fetchReply()
  }
)
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  width: 100%;
  background-image: url('/images/Picture 21 .jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
}

.formal-glass-card {
  background: rgba(0, 0, 0, 0.45) !important;
  backdrop-filter: blur(12px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 19px !important;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5) !important;
}

.formal-title {
  font-size: 1.6rem;
  font-weight: 300;
  letter-spacing: 4px;
  text-transform: uppercase;
}

.formal-reply-title {
  font-size: 0.9rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  font-weight: 400;
  color: #FFC107;
}

.gold-divider {
  width: 30px;
  height: 1.5px;
  background-color: #FFC107;
  margin-top: 6px;
}

.subtitle {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 1px;
}

.reply-message {
  font-size: 0.8rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
}

.reply-date {
  margin-top: 12px;
  font-size: 0.65rem;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.4);
}

.input-label {
  display: block;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.7);
}

.custom-input :deep(.v-field) {
  background: rgba(255, 255, 255, 0.05) !important;
}

.submit-btn {
  background: transparent !important;
  border: 1px solid #FFC107 !important;
  color: #FFC107 !important;
  border-radius: 0 !important;
  letter-spacing: 3px;
}
</style>
