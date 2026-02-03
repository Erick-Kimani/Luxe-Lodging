<script setup>
import { ref } from 'vue'

const contactForm = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const loading = ref(false)

const submitForm = () => {
  loading.value = true
  setTimeout(() => {
    alert('Message sent successfully!')
    loading.value = false
    contactForm.value = { name: '', email: '', subject: '', message: '' }
  }, 1500)
}
</script>

<template>
  <div class="contact-page">
    <v-container fluid fill-height class="pa-0 d-flex align-center">
      <v-row justify="start" align="center" class="ma-0">
        
        <v-col cols="11" sm="7" md="5" lg="4" xl="3" class="ml-md-10 ml-lg-16">
          
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
                ></v-text-field>

                <label class="input-label">Email Address</label>
                <v-text-field
                  v-model="contactForm.email"
                  placeholder="email@address.com"
                  variant="outlined"
                  density="compact"
                  color="amber-lighten-2"
                  class="custom-input mb-4"
                  hide-details
                ></v-text-field>

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
                ></v-textarea>

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

        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
/* --- THE BACKGROUND FIX --- */
.contact-page {
  min-height: 100vh;
  width: 100%;
  /* Use /images/ path as fixed in previous step */
  background-image: url('/images/Picture 21 .jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: scroll;
  
  display: flex;
  align-items: center;
}

/* --- FORMAL GLASS DESIGN --- */
.formal-glass-card {
  /* Using a lower alpha (0.45) so the background is more visible */
  background: rgba(0, 0, 0, 0.45) !important; 
  backdrop-filter: blur(12px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 19px !important;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5) !important;
}

/* --- TYPOGRAPHY --- */
.formal-title {
  font-size: 1.6rem;
  font-weight: 300;
  letter-spacing: 4px;
  text-transform: uppercase;
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

.input-label {
  display: block;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.7);
}

/* --- INPUT STYLING --- */
.custom-input :deep(.v-field) {
  background: rgba(255, 255, 255, 0.05) !important;
  border-radius: 0 !important;
  transition: all 0.3s ease;
}

.custom-input :deep(.v-field__outline) {
  --v-field-border-opacity: 0.2 !important;
}

.custom-input :deep(input::placeholder),
.custom-input :deep(textarea::placeholder) {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.3) !important;
}

/* --- BUTTON STYLING --- */
.submit-btn {
  background: transparent !important;
  border: 1px solid #FFC107 !important;
  color: #FFC107 !important;
  border-radius: 0 !important;
  letter-spacing: 3px;
  font-size: 0.8rem;
  transition: all 0.4s ease;
}

.submit-btn:hover {
  background: #FFC107 !important;
  color: #000 !important;
  box-shadow: 0 0 20px rgba(255, 193, 7, 0.3);
}

/* --- FOOTER --- */
.contact-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 1px;
}
</style>