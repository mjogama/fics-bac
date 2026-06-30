import { Navigate, Route } from "react-router-dom";

import Team from "../pages/admin/Team";
import About from "../pages/admin/About";
import Events from "../pages/admin/Events";
import Contact from "../pages/admin/Contact";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Membership from "../pages/admin/Membership";

export const adminRoutes = (
  <Route element={<AdminLayout />}>
    <Route index element={<Navigate to="dashboard" replace />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="about" element={<About />} />
    <Route path="events" element={<Events />} />
    <Route path="team" element={<Team />} />
    <Route path="membership" element={<Membership />} />
    <Route path="contact" element={<Contact />} />
  </Route>
);
