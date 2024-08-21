import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,  // Configura la base URL desde la variable de entorno
});

export default apiClient;