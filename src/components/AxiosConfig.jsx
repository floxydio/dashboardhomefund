import axios from 'axios';

const axiosNew = axios.create({
  baseURL: `https://9ffb-116-206-8-32.ngrok-free.app/dashboard-api`,
  headers: {
    'ngrok-skip-browser-warning': 'any',
  },
  timeout: 1000 * 10,
});

export default axiosNew;
