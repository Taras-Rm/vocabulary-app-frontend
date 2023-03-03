import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");

  config.headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };

  return config;
});

export default instance;
