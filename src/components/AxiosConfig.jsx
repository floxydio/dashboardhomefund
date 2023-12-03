import axios from 'axios';

const apiPrefix = localStorage.getItem("apiPrefix")

console.log(apiPrefix)

const axiosNew = axios.create({
  baseURL: `https://aa10-2400-9800-3d0-d74e-8c1a-465a-e7b1-95a8.ngrok-free.app/dashboard-api`,
  headers: {
    "ngrok-skip-browser-warning": "any"
  },
  timeout: 1000 * 10,
});

export default axiosNew;
