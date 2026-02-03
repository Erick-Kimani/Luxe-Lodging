<template>
  <div class="service-card">
    <h3>{{ service.name }}</h3>
    <p>{{ service.description }}</p>

    <!-- Click is tracked by backend -->
    <a
      :href="trackingUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="visit-btn"
    >
      Visit Official Website
    </a>
  </div>
</template>

<script>
export default {
  name: "ServiceCard",
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  computed: {
    trackingUrl() {
      return `${import.meta.env.VITE_API_BASE_URL}/track-click/${this.service.id}`;
    }
  }
};
</script>
