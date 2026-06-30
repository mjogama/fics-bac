import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import { paths } from "./constants/paths";
import { adminRoutes } from "./routes/AdminRoutes";
import ProtectedRoutes from "./components/ProtectedRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths.home} element={<Home />} />
        <Route path={paths.login} element={<Login />} />
        <Route path={`${paths.admin}/*`} element={<ProtectedRoutes requiredRole={["Admin", "Editor"]} />}>
          {adminRoutes}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
