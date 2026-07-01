import type { UserPayload } from "@/lib/types/modules/userType";
import type { UserData } from "@/lib/constants/placeholders/userPlaceholder";

export const normalizeUser = (user: Partial<UserPayload> = {}): UserData => {
  return {
    id: String(user.id ?? user._id ?? ""),
    name: user.name ?? "",
    email: user.email ?? "",
    role: user.role ?? "",
  };
};
