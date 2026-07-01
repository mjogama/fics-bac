import api from "@/lib/api/api";
import { normalizeUser } from "@/lib/api/user/normalizers";

export const cmsMeData = async () => {
  const response = await api.get("/user/meData");
  return normalizeUser(response.data.data);
};
