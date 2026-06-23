import { Router, type Request, type Response } from "express";

import { responseHandler } from "@modules/utils";
import { authV1Routes } from "@modules/auth/v1/index";
import { eventsV1Routes } from "@modules/events/v1/index";
import { ourTeamV1Routes } from "@modules/ourTeam/v1/index";
import { homepageV1Routes } from "@modules/homepage/v1/index";
import { userV1Routes } from "@modules/userManagement/v1/index";
import { membershipV1Routes } from "@modules/membership/v1/index";
import { concernV1Routes, contactV1Routes } from "@modules/contactUs/v1/index";

const v1Router = Router();

v1Router.get("/status", (_req: Request, res: Response) => {
  responseHandler(res, 200, "API v1 is running", null);
});

v1Router.use("/auth", authV1Routes);
v1Router.use("/user", userV1Routes);
v1Router.use("/homepage", homepageV1Routes);
v1Router.use("/our-team", ourTeamV1Routes);
v1Router.use("/events", eventsV1Routes);
v1Router.use("/membership", membershipV1Routes);
v1Router.use("/concern", concernV1Routes);
v1Router.use("/contact", contactV1Routes);

export default v1Router;
