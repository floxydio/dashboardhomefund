import axios from 'axios';

const axiosNew = axios.create({
  baseURL: `https://f55f-114-124-239-130.ngrok-free.app/dashboard-api`,
  headers: {
    'ngrok-skip-browser-warning': 'any',
  },
  timeout: 1000 * 10,
});

export default axiosNew;
