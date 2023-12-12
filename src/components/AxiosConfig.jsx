import axios from 'axios';

const axiosNew = axios.create({
  baseURL: `https://279e-2400-9800-4e0-d302-dbdd-caa4-eee2-741f.ngrok-free.app/dashboard-api`,
  headers: {
    'ngrok-skip-browser-warning': 'any',
  },
  timeout: 1000 * 10,
});

export default axiosNew;
