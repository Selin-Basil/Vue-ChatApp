import type { User } from "@/utils/types";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const login = async (credentials:User) => {
  const response = await axios.post(`${baseURL}/api/login`, credentials);
  return response.data;
};