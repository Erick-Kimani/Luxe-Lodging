import axios from "axios";

const API_URL = "http://localhost:8000/api"; // adjust if needed
axios.defaults.withCredentials = true;       // send cookies for Sanctum

export default {
  // Get CSRF cookie before POST requests
  getCsrfCookie() {
    return axios.get("http://localhost:8000/sanctum/csrf-cookie");
  },

  // Track a click
  trackClick(serviceId) {
    return axios.post(`${API_URL}/track-click`, { service_id: serviceId });
  },

  // Fetch analytics
  getAnalytics() {
    return axios.get(`${API_URL}/click-analytics`);
  }
};
