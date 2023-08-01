import axios from 'axios';

const axiosNew = axios.create({
  baseURL: 'https://homefund-beta.xyz/dashboard-api',
});

export default axiosNew;
