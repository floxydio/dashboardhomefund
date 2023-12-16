import axios from 'axios';

const axiosNew = axios.create({
  baseURL: `https://569a-2400-9800-342-10cc-5431-264f-b4e6-997.ngrok-free.app/dashboard-api`,
  headers: {
    'ngrok-skip-browser-warning': 'any',
    // RoleUser: 1,
  },
  timeout: 1000 * 10,
});

export default axiosNew;
