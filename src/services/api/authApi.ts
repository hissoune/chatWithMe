import apiClient from "./client";


export const login = async (email: string, password: string) => {
  const response = await apiClient.post("/auth/login", {
    email,
    password,
  });
    return response.data;
    };

export const register = async (name: string, email: string, password: string) => {
  const response = await apiClient.post("/user", {
    name,
    email,
    password,
  });
  return response.data;
}