"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { cmsMeData } from "@/lib/api/user/user";
import { CMS_ROLES } from "@/lib/constants/cmsRoles";

type Status = "loading" | "authorized" | "unauthorized";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole?: string[];
};

export function ProtectedRoute({ children, requiredRole = CMS_ROLES }: ProtectedRouteProps) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let cancelled = false;

    const validateRole = async () => {
      try {
        const { role } = await cmsMeData();

        if (cancelled) return;

        if (requiredRole.includes(role)) {
          setStatus("authorized");
        } else {
          router.replace("/auth/login");
        }
      } catch (err) {
        console.error(err instanceof Error ? err.message : err);
        if (!cancelled) router.replace("/auth/login");
      }
    };

    validateRole();

    return () => {
      cancelled = true;
    };
  }, [requiredRole, router]);

  if (status !== "authorized") return null;

  return <>{children}</>;
}
