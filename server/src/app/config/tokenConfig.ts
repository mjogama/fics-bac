import { getRequiredEnv } from "@modules/utils";

export const tokenConfig = {
  accessTokenSecret: getRequiredEnv("ACCESS_TOKEN"),
  refreshTokenSecret: getRequiredEnv("REFRESH_TOKEN"),
};
