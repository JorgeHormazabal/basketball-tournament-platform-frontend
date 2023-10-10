import axios from "axios";
import { getEnvVariables } from "helpers/getEnvVariables";
const { VITE_API_URL } = getEnvVariables();

const backendApi = axios.create({
  baseURL: VITE_API_URL,
});

// Todo: configurar interceptores
backendApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default backendApi;
