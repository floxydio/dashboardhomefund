import axios from 'axios';

const axiosNew = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/dashboard-api`,
  headers: {
    'ngrok-skip-browser-warning': 'any',
    // RoleUser: 1,
  },
  timeout: 1000 * 10,
});

export default axiosNew;
