
import axios from "axios";


const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

apiClient.interceptors.request.use((config) => {

  return config;
});

export default apiClient;