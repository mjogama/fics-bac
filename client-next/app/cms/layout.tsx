import { CmsShell } from "@/components/cms/cms-shell";
import { ProtectedRoute } from "@/components/cms/protected-route";

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <CmsShell>{children}</CmsShell>
    </ProtectedRoute>
  );
}
