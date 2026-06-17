import type { IStatusCode } from "../types/IStatusCode.js";

export const STATUS_CODE: IStatusCode = {
  400: {
    title: "BAD REQUEST",
  },
  401: {
    title: "UNAUTHORIZED",
  },
  403: {
    title: "FORBIDDEN",
  },
  404: {
    title: "NOT FOUND",
  },
  500: {
    title: "SERVER ERROR",
  },
  503: {
    title: "UNAVAILABLE SERVICE",
  },
};
