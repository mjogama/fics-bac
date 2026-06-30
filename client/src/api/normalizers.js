import { MILITARY_TIMES } from "../constants/time";
import { toIsoDate } from "../utils/date";

export function normalizeEvents(events = []) {
  return events.map((event) => ({
    id: event.id ?? event._id,
    title: event.title ?? "",
    start_date: toIsoDate(event.start_date ?? event.date ?? ""),
    end_date: toIsoDate(event.end_date ?? event.date ?? ""),
    time: MILITARY_TIMES.includes(event.time) ? event.time : (event.time ?? ""),
    location: event.location ?? "",
    description: event.description ?? "",
    status: event.status === "past" ? "completed" : (event.status ?? "upcoming"),
    image_urls: event.image_urls ?? [],
  }));
}

export function normalizeAbout(homepage = {}) {
  return {
    title: homepage.title ?? "",
    description: homepage.description ?? "",
    mission: homepage.mission ?? "",
    vision: homepage.vision ?? "",
    hero_image_id: homepage.public_id ?? homepage.bg_image_url ?? "",
    stats: homepage.stats ?? { members: "0", eventsPerYear: "0", yearsOnCampus: "0" },
  };
}

export function normalizeTeam(members = []) {
  return members.map((member) => ({
    id: member.id ?? member._id,
    name: member.fullName ?? member.name ?? "",
    role: member.position ?? member.role ?? "",
    branch: member.branch === "Faculty" ? "Faculty Advisers" : (member.branch ?? ""),
    term: member.term ?? "",
  }));
}

export function normalizeLedger(entries = []) {
  return entries.map((entry) => ({
    id: entry.id ?? entry._id,
    date: entry.date ?? "",
    name: entry.name ?? "",
    purpose: entry.purpose ?? "",
    amount: String(entry.amount ?? "0"),
  }));
}

export function normalizeMessages(concerns = []) {
  return concerns.map((concern) => ({
    id: concern.id ?? concern._id,
    name: concern.name ?? "",
    email: concern.email ?? "",
    concern: concern.concern ?? "",
    date: concern.date ?? "",
    time: concern.time ?? "",
    body: concern.body ?? concern.message ?? "",
    read: Boolean(concern.read),
  }));
}

export function normalizeContact(contact = {}) {
  return {
    email: contact.email ?? "",
    location: contact.location ?? "",
    hours: contact.hours ?? "",
    social: contact.social ?? "",
  };
}
