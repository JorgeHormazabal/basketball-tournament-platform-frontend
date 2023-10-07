import axios from "axios";
import { getEnvVariables } from "../helpers";

const { VITE_API_URL } = getEnvVariables();

const backendApi = axios.create({
  baseURL: VITE_API_URL,
});

// Todo: configurar interceptores
backendApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token"),
  };

  return config;
});

export default backendApi;
