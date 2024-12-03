import axios from "axios";

// Example of setting up Axios instance with token
const token = localStorage.getItem('token'); // Get your token from localStorage or context

const AxiosInstance = axios.create({
    baseURL: 'https://sclcm-backend.onrender.com/api',
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        accept: "application/json",
    }
});

AxiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  });
  

export default AxiosInstance;