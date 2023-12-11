import axios from 'axios';

const axiosNew = axios.create({
  baseURL: `https://bd74-114-124-236-156.ngrok-free.app/dashboard-api`,
  headers: {
    'ngrok-skip-browser-warning': 'any',
  },
  timeout: 1000 * 10,
});

export default axiosNew;
