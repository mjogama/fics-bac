import api from "@/lib/api/api";
import type { AuthSignupData, AuthLoginData } from "@/lib/constants/placeholders/authPlaceholder";

export const signup = async (signupData: AuthSignupData) => {
  await api.post("/auth/signup", signupData);
};

export const login = async (loginData: AuthLoginData) => {
  await api.post("/auth/login", loginData);
};

export const logout = async () => {
  await api.post("/auth/logout", null);
};
