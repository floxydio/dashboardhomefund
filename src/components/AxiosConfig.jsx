import axios from 'axios';

const axiosNew = axios.create({
  baseURL: `https://c9aa-182-0-103-126.ngrok-free.app/dashboard-api`,
  headers: {
    'ngrok-skip-browser-warning': 'any',
  },
  timeout: 1000 * 10,
});

export default axiosNew;
