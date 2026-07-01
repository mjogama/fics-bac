import type { SignupDTO, LoginDTO } from "@/lib/types/modules/authType";
import type { AuthSignupData, AuthLoginData } from "@/lib/constants/placeholders/authPlaceholder";

export const normalizeAuthSignup = (authSignup: Partial<SignupDTO> = {}): AuthSignupData => {
  return {
    name: authSignup.name ?? "",
    email: authSignup.email ?? "",
    password: authSignup.password ?? "",
  };
};
export const normalizeAuthLogin = (authLogin: Partial<LoginDTO> = {}): AuthLoginData => {
  return {
    email: authLogin.email ?? "",
    password: authLogin.password ?? "",
  };
};
