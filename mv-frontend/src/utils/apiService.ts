import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Base URL for the API
const BASE_URL = "http://localhost:4000/";

// Create an Axios instance with the base URL and default configuration
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to make an HTTP GET request
export async function getRequest<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  // return axiosInstance.get(url, config);
  const response = await axiosInstance.get<T>(url, config);
  return response.data;
}

// Function to make an HTTP POST request
export async function post<T>(
  url: string,
  data: any,
  config?: AxiosRequestConfig
): Promise<T> {
  return axiosInstance.post(url, data, config);
}

// Function to make an HTTP DELETE request
export async function deleteRequest<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const response: AxiosResponse<T> = await axiosInstance.delete<T>(url, config);
  return response.data;
}

// Function to make an HTTP PUT request
export async function updateRequest<T>(
  url: string,
  data: any,
  config?: AxiosRequestConfig
): Promise<T> {
  const response: AxiosResponse<T> = await axiosInstance.put<T>(
    url,
    data,
    config
  );
  return response.data;
}
