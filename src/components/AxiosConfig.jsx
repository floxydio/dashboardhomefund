import axios from 'axios';

const apiPrefix = localStorage.getItem("")

const axiosNew = axios.create({
  baseURL: `${apiPrefix}/dashboard-api`,
  headers: {
    "ngrok-skip-browser-warning": "any"
  },
  timeout: 1000 * 10,
});

export default axiosNew;
