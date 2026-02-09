<template>
  <button 
    class="click-link" 
    @click="handleClick"
    :disabled="isLoading"
    :class="{ 'is-loading': isLoading }"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import clickService from '@/services/clickService';

const props = defineProps({
  serviceId: { 
    type: Number, 
    required: true 
  },
  redirectUrl: {
    type: String,
    default: null // Optional: pass URL directly if already known
  },
  openInNewTab: {
    type: Boolean,
    default: true // Control whether to open in new tab
  }
});

const emit = defineEmits(['click-tracked', 'click-error']);

const isLoading = ref(false);

async function handleClick() {
  if (isLoading.value) return; // Prevent double-clicks
  
  isLoading.value = true;

  try {
    // Ensure CSRF cookie is set (for Sanctum)
    await clickService.getCsrfCookie();

    // Track click via POST
    const { data } = await clickService.trackClick(props.serviceId);

    console.log('Click tracked successfully!', data);

    // Emit success event
    emit('click-tracked', data);

    // Determine redirect URL
    const targetUrl = props.redirectUrl || data.redirect_url;

    // Open service URL
    if (targetUrl && targetUrl !== '#') {
      if (props.openInNewTab) {
        window.open(targetUrl, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = targetUrl;
      }
    } else {
      console.warn('No redirect URL provided');
    }
  } catch (err) {
    console.error('Click tracking failed', err);
    
    // Emit error event
    emit('click-error', err);

    // Optional: Show user-friendly error message
    if (err.response?.status === 401) {
      alert('Please log in to access this service');
    } else {
      alert('Failed to track click. Please try again.');
    }
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.click-link {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #1976d2;
  text-decoration: underline;
  font: inherit;
  transition: opacity 0.2s ease;
}

.click-link:hover:not(:disabled) {
  color: #1565c0;
  text-decoration: none;
}

.click-link:disabled,
.click-link.is-loading {
  opacity: 0.6;
  cursor: not-allowed;
}

.click-link:focus-visible {
  outline: 2px solid #1976d2;
  outline-offset: 2px;
  border-radius: 2px;
}
</style>