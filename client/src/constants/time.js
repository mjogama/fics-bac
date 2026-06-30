export const MILITARY_TIMES = Array.from({ length: 24 }, (_, index) => {
  const hour = String(index + 1).padStart(2, "0");
  return `${hour}:00`;
});
