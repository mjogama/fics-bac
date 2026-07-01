import type { AboutPayload } from "@/lib/types/modules/aboutType";
import type { HomepagePayload } from "@/lib/types/modules/homepageType";
import type { AboutData } from "@/lib/constants/placeholders/aboutPlaceholder";
import type { HomepageData } from "@/lib/constants/placeholders/homepagePlaceholder";

export const normalizeHomepage = (homepage: Partial<HomepagePayload> = {}): HomepageData => {
  return {
    id: homepage._id ?? "",
    bg_image_url: homepage.bg_image_url ?? "",
    public_id: homepage.public_id ?? "",
    title: homepage.title ?? "",
    sub_title: homepage.sub_title ?? "",
    description: homepage.description ?? "",
  };
};

export const normalizeAbout = (about: Partial<AboutPayload> = {}): AboutData => {
  return {
    org_about: about.org_about ?? "",
    mission: about.mission ?? "",
    vision: about.vision ?? "",
    active_members: about.active_members ?? 0,
    yearly_event: about.yearly_event ?? 0,
  };
};
