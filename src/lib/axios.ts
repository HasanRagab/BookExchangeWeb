import toast from "react-hot-toast";
import axios, { AxiosInstance } from "axios";
import useAuthStore from "@/store/authStore";

import { APIEndpoints } from "@/types/api";

const API_BASE_URL = `${
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"
}/api`;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    toast.error("Request failed.");
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error("Unauthorized. Please log in again.");
      useAuthStore.getState().clearToken();
    } else {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
    return Promise.reject(error);
  }
);

const api = async <T extends keyof APIEndpoints>(
  method: "get" | "post" | "put" | "delete",
  url: T,
  options?: {
    data?: APIEndpoints[T] extends { request: infer R } ? R : undefined;
    params?: APIEndpoints[T] extends { params: infer P } ? P : undefined;
    query?: APIEndpoints[T] extends { query: infer Q } ? Q : undefined;
    headers?: Record<string, string>;
  }
): Promise<APIEndpoints[T]["response"]> => {
  const { data, params, query, headers } = options || {};
  const response = await axiosInstance.request<APIEndpoints[T]["response"]>({
    method,
    url: buildUrl(url, params || {}),
    data,
    params: query,
    headers,
  });

  return response.data;
};

function buildUrl<T extends keyof APIEndpoints>(
  route: T,
  params: Record<string, string | number>
): string {
  return Object.entries(params).reduce<string>(
    (acc, [key, val]) => acc.replace(`:${key}`, String(val)),
    route
  );
}

export { axiosInstance, api, buildUrl };
export default api;
