import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  timeout: 50000,
  headers: {'Content-Type': 'application/json'},
});

export default instance;