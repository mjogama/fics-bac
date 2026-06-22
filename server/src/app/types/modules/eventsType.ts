type EventStatus = "upcoming" | "ongoing" | "completed" | "postponed" | "cancelled";

export type EventPayload = {
  image_urls: string[];
  public_ids: string[];
  start_date: string;
  end_date: string;
  title: string;
  status: EventStatus;
  location: string;
  time: string;
  description: string;
};
