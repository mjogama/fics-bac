import { Router } from "express";
import { authV1Routes } from "@modules/auth/v1/index";
import { userV1Routes } from "@modules/userManagement/v1/index";
import { homepageV1Routes } from "@modules/homepage/v1/index";
import { ourTeamV1Routes } from "@modules/ourTeam/v1/index";
import { eventsV1Routes } from "@modules/events/v1/index";

const v1Router = Router();

v1Router.get("/status", (_req, res) => {
  res.status(200).json({ status: "OK", statusCode: 200, details: { message: "API v1 is running" } });
});

v1Router.use("/auth", authV1Routes);
v1Router.use("/user", userV1Routes);
v1Router.use("/homepage", homepageV1Routes);
v1Router.use("/our-team", ourTeamV1Routes);
v1Router.use("/events", eventsV1Routes);

export default v1Router;
