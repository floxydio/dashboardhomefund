import axios from 'axios';

const axiosNew = axios.create({
  baseURL: 'https://dev.homefund-id.tech/dashboard-api',
});

export default axiosNew;
