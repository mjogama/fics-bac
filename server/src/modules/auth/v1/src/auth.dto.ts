import type { SignupDTO } from "../../types/types";
import type { AuthPayload } from "@app/types/IAuthPayload";

export const SignupResponseDTO = (user: SignupDTO) => {
  return {
    name: user.name,
    email: user.email,
  };
};

export const LoginResponseDTO = (user: AuthPayload) => {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};
