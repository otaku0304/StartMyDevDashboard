import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
  (config) => {
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

export const handleErrorResponse = (methodName, response) => {
  if (
    response.data.responseCode === 400 ||
    response.data.responseCode === 500 ||
    response.data.responseCode === 409 ||
    response.data.responseCode === 401 ||
    response.data.responseCode === 403 ||
    response.data.responseCode === 404 
  ) {
    toast.error(
      `${methodName} ${response.data.responseCode} ${response.data.responseMessage}`
    );
  }
};
