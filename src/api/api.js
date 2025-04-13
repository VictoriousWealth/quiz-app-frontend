import axios from 'axios';

const API = axios.create({
  baseURL: 'https://quiz-backend-nick-4b3aa7c613b0.herokuapp.com/', // your FastAPI base URL
});

export default API;
