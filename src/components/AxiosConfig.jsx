import axios from 'axios';

const axiosNew = axios.create({
  baseURL: 'https://ad5d-2400-9800-4d0-bdb4-6420-6962-ee2a-cb6d.ngrok-free.app/dashboard-api',
  headers: {
    "ngrok-skip-browser-warning": "any"
  }
});

export default axiosNew;
