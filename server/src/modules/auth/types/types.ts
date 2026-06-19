export type SignupDTO = {
  name: string;
  email: string;
  password: string;
};

export type LoginDTO = Pick<SignupDTO, "email" | "password">;
