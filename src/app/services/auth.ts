import axios from "axios";

type SignupPayload = {
  name: string;
  email: string;
  password: string;
  skills?: string[];
  interests?: string[];
};

type LoginPayload = {
  email: string;
  password: string;
};

const apiClient = axios.create({
  baseURL: (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/+$/, ""),
  headers: {
    "Content-Type": "application/json",
  },
});

const TOKEN_KEY = "opportech_jwt";

export const signup = async (payload: SignupPayload) => {
  const response = await apiClient.post("/api/auth/signup", payload);
  return response.data;
};

export const login = async (payload: LoginPayload) => {
  const response = await apiClient.post("/api/auth/login", payload);
  return response.data;
};

export const saveToken = (token: string) => {
  window.localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return window.localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  window.localStorage.removeItem(TOKEN_KEY);
};
