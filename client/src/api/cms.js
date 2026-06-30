import api from "./axios";
import { normalizeAbout, normalizeContact, normalizeEvents, normalizeLedger, normalizeMessages, normalizeTeam } from "./normalizers";

export const fetchEvents = () => api.get("/events/data").then((response) => normalizeEvents(response.data.data));

export const createEvent = (data) => api.post("/events/create", data).then((response) => normalizeEvents([response.data.data])[0]);

export const fetchAbout = () => api.get("/homepage/data").then((response) => normalizeAbout(response.data.data?.[0] ?? response.data.data));

export const fetchTeam = () => api.get("/ourTeam/data").then((response) => normalizeTeam(response.data.data));

export const fetchLedger = () => api.get("/membership/data").then((response) => normalizeLedger(response.data.data));

export const fetchMessages = () => api.get("/concern/data").then((response) => normalizeMessages(response.data.data));

export const fetchContact = () => api.get("/contact/data").then((response) => normalizeContact(response.data.data?.[0] ?? response.data.data));
