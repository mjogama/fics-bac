import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopBar from "../components/admin/AdminTopBar";

function AdminLayoutContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!sidebarOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setSidebarOpen(false);
    };

    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const onDesktop = () => {
      if (mediaQuery.matches) setSidebarOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    mediaQuery.addEventListener("change", onDesktop);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      mediaQuery.removeEventListener("change", onDesktop);
    };
  }, [sidebarOpen]);

  return (
    <div className="flex min-h-screen bg-cms-bg">
      <button
        type="button"
        aria-label="Close navigation menu"
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 z-40 bg-cms-ink/50 transition-opacity duration-300 lg:hidden ${sidebarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      />

      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopBar onMenuClick={() => setSidebarOpen(true)} />
        <main className="px-4 pt-5 pb-12 sm:px-6 sm:pt-6 lg:px-8 lg:pt-7 lg:pb-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  const { pathname } = useLocation();

  return <AdminLayoutContent key={pathname} />;
}
