import api from "@/lib/api/api";
import type { HomepageData } from "@/lib/constants/placeholders/homepagePlaceholder";
import { normalizeHomepage, normalizeAbout } from "@/lib/api/cmsAPI/about/normalizers";

export const cmsAbout = async () => {
  return await Promise.all([
    api.get("/homepage/data").then((response) => normalizeHomepage(response.data.data?.[0] ?? response.data.data)),
    api.get("/about/data").then((response) => normalizeAbout(response.data.data?.[0] ?? response.data.data)),
  ]);
};

export const updateHomepage = async (id: string, data: Pick<HomepageData, "title" | "sub_title" | "description">, imageFile?: File | null) => {
  if (imageFile) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("sub_title", data.sub_title);
    formData.append("description", data.description);
    formData.append("bg_image_url", imageFile);

    const response = await api.patch(`/homepage/update/${id}`, formData);
    return normalizeHomepage(response.data.data);
  }

  const response = await api.patch(`/homepage/update/${id}`, data);
  return normalizeHomepage(response.data.data);
};
