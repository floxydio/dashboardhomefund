import axios from 'axios';


const axiosNew = axios.create({
  baseURL: `https://ae34-182-0-103-126.ngrok-free.app/dashboard-api`,
  headers: {
    'ngrok-skip-browser-warning': 'any',
  },
  timeout: 1000 * 10,
});

export default axiosNew;
