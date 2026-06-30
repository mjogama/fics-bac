const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

export function formatEventDate(isoDate) {
  const [, m, d] = isoDate.split("-").map(Number);
  return `${MONTHS[m - 1]} ${String(d).padStart(2, "0")}`;
}
