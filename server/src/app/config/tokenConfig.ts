import dotenv from "dotenv";
import getRequiredEnv from "@modules/utils/src/getRequiredEnv";

dotenv.config();

export const tokenConfig = {
  accessTokenSecret: getRequiredEnv("ACCESS_TOKEN"),
  refreshTokenSecret: getRequiredEnv("REFRESH_TOKEN"),
};
