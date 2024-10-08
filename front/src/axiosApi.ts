import axios from 'axios';

export const axiosApi = axios.create({
  baseURL: 'http://192.168.8.185:8000',
});
