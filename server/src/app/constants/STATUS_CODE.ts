import type { IStatusCode } from "../types/IStatusCode";

export const STATUS_CODE: IStatusCode = {
  400: {
    title: "Bad request",
  },
  401: {
    title: "Unauthorized",
  },
  403: {
    title: "Forbidden",
  },
  404: {
    title: "Not found",
  },
  500: {
    title: "Server error",
  },
  503: {
    title: "Unavailable service",
  },
};
