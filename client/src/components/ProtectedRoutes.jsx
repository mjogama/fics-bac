import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import api from "../api/axios";
import { baseURL, paths } from "../constants/paths";

export default function ProtectedRoutes({ requiredRole }) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const validateRole = async () => {
      try {
        const res = await api.get(`${baseURL}/user/meData`);

        const { role } = res.data.data;

        if (requiredRole.includes(role)) {
          setStatus("authorized");
          return;
        }

        setStatus("unauthorized");
      } catch (err) {
        console.error(err.message);
        setStatus("unauthorized");
      }
    };

    validateRole();
  }, [requiredRole]);

  if (status === "loading") return null;
  if (status !== "authorized") return <Navigate to={paths.login} replace />;

  return <Outlet />;
}
