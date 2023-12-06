import axios from 'axios';

const apiPrefix = localStorage.getItem("apiPrefix")

console.log(apiPrefix)

const axiosNew = axios.create({
  baseURL: `https://7a2a-114-124-214-20.ngrok-free.app/dashboard-api`,
  headers: {
    "ngrok-skip-browser-warning": "any"
  },
  timeout: 1000 * 10,
});

export default axiosNew;
