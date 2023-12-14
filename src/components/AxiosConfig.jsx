import axios from 'axios';

const axiosNew = axios.create({
  baseURL: `http://192.168.249.110:2500/dashboard-api`,
  headers: {
    'ngrok-skip-browser-warning': 'any',
    // RoleUser: 1,
  },
  timeout: 1000 * 10,
});

export default axiosNew;
