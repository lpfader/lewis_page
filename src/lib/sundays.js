/**
 * Date helpers for Sunday activity voting.
 *
 * Kept free of React so they can be unit tested directly with node.
 */

const pad = (n) => String(n).padStart(2, "0");

/**
 * Local Y-M-D key, deliberately NOT toISOString().
 *
 * toISOString() converts to UTC, so local midnight shifts to the previous day
 * for anyone east of UTC. Votes would then be filed under the wrong Sunday.
 * Date keys must be built from local calendar parts.
 */
export function toDateKey(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Every Sunday in a calendar year, in order. */
export function sundaysInYear(year) {
  const sundays = [];
  const d = new Date(year, 0, 1);

  while (d.getDay() !== 0) {
    d.setDate(d.getDate() + 1);
  }

  while (d.getFullYear() === year) {
    sundays.push(new Date(d));
    d.setDate(d.getDate() + 7);
  }

  return sundays;
}

/**
 * Sundays in `year` that have not passed yet, compared as Y-M-D strings so that
 * today's Sunday stays visible all day instead of vanishing at midnight.
 */
export function upcomingSundays(year, from = new Date()) {
  const cutoff = toDateKey(from);
  return sundaysInYear(year).filter((date) => toDateKey(date) >= cutoff);
}

/**
 * Years offered in the picker: this year and next. Computed on every call so
 * the site rolls forward on its own - no annual edit required.
 */
export function availableYears(now = new Date()) {
  const current = now.getFullYear();
  return [current, current + 1];
}
