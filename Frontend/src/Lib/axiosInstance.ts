import axios from "axios";
import { store } from "../Store/store";
import { clearToken } from "../Store/userTokenSlice";

const baseURL: string = import.meta.env.VITE_API_BASE;
const api = axios.create({ baseURL, timeout: 15000 });

api.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.userToken.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.status === 401) {
      store.dispatch(clearToken());
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
