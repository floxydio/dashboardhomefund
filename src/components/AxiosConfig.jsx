import axios from 'axios';

const apiPrefix = localStorage.getItem('apiPrefix');

console.log(apiPrefix);

const axiosNew = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/dashboard-api`,
  headers: {
    'ngrok-skip-browser-warning': 'any',
  },
  timeout: 1000 * 10,
});

export default axiosNew;
