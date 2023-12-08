import axios from 'axios';

const apiPrefix = localStorage.getItem('apiPrefix');

console.log(apiPrefix);

const axiosNew = axios.create({
<<<<<<< HEAD
  baseURL: `https://ed4a-114-124-239-45.ngrok-free.app/dashboard-api`,
=======
  baseURL: `${import.meta.env.VITE_API_URL}/dashboard-api`,
>>>>>>> dddfd7d (.)
  headers: {
    'ngrok-skip-browser-warning': 'any',
  },
  timeout: 1000 * 10,
});

export default axiosNew;
