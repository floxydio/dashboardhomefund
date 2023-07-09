import axios from 'axios';

const axiosNew = axios.create({
  baseURL: 'http://103.250.11.249:3000/dashboard-api',
});

export default axiosNew;
  