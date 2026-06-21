import bcrypt from "bcrypt";

import User from "../models/User";
import type { SignupDTO, LoginDTO } from "../../../app/types/authTypes/authType";
import { errorHandler } from "../../utils";

export const signupUser = async (userData: SignupDTO) => {
  const isEmailExists = await User.findOne({ email: userData.email });

  if (isEmailExists) {
    return errorHandler("Email already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  try {
    return await User.create({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return errorHandler("Email already exists", 409); // throws AppError
    }

    throw error; // only unknown errors reach here
  }
};

export const loginUser = async (userData: LoginDTO) => {
  const user = await User.findOne({ email: userData.email });

  if (!user) {
    return errorHandler("Invalid email or password", 401);
  }

  const validatePassword = await bcrypt.compare(userData.password, user.password);

  if (!validatePassword) {
    return errorHandler("Invalid email or password", 401);
  }

  return user;
};

export const updateUserName = async (id: string, name: string) => {
  return User.updateOne({ _id: id }, { $set: { name } });
};

export const updateUserPassword = async (id: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return User.updateOne({ _id: id }, { $set: { password: hashedPassword } });
};

export const deleteUserAccount = async (id: string) => {
  return await User.deleteOne({ _id: id });
};
