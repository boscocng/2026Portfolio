// Every live number on the page is a function of the clock alone, so each visitor sees
// the same values at the same moment and a refresh never resets them.

const MINUTE_MS = 60_000;
const DAY_MS = 24 * 60 * MINUTE_MS;
const WEEK_MS = 7 * DAY_MS;

// murmur3's 32-bit finalizer. It scrambles an integer into a well-mixed one, which
// stands in for randomness that every visitor computes identically.
function hash(n: number) {
  n = Math.imul(n ^ (n >>> 16), 0x85ebca6b);
  n = Math.imul(n ^ (n >>> 13), 0xc2b2ae35);
  return (n ^ (n >>> 16)) >>> 0;
}

// One pseudo-random value per counter, period and slot. Mixing in the counter's seed
// keeps each counter's schedule independent of the others.
const random = (seed: number, period: number, slot: number) =>
  hash(hash(seed) ^ (8 * period + slot));

// The project counters open at their real totals and start growing at LIVE_START.
const LIVE_START = Date.parse("2026-09-28T00:00:00Z");
const POBI_SEED = 1;
const MERCH_SEED = 2;

// Sums the events (signups, orders) that have happened by `time`. Each period (a day or
// a week) from LIVE_START on gets one or two events, each at a pseudo-random minute of
// that period, and `valueOf` maps an event's random roll to what it adds to the count.
function sumEvents(
  time: number,
  periodMs: number,
  seed: number,
  valueOf: (roll: number) => number,
) {
  if (time < LIVE_START) return 0;
  const elapsed = time - LIVE_START;
  const current = Math.floor(elapsed / periodMs);
  const minuteOfCurrent = Math.floor((elapsed % periodMs) / MINUTE_MS);

  let total = 0;
  for (let period = 0; period <= current; period++) {
    const events = 1 + (random(seed, period, 0) % 2);
    for (let event = 0; event < events; event++) {
      const minute = random(seed, period, 1 + event) % (periodMs / MINUTE_MS);
      if (period === current && minute > minuteOfCurrent) continue;
      total += valueOf(random(seed, period, 3 + event));
    }
  }
  return total;
}

// Pobi: 103 users, then one or two signups a day.
const POBI_START_USERS = 103;
export const pobiUsersAt = (time: number) =>
  POBI_START_USERS + sumEvents(time, DAY_MS, POBI_SEED, () => 1);

// Merch Store: $4,278 in sales, then one or two orders a week of $25 to $60 each.
const MERCH_START_SALES = 4278;
export const merchSalesAt = (time: number) =>
  MERCH_START_SALES +
  sumEvents(time, WEEK_MS, MERCH_SEED, (roll) => 25 + (roll % 36));

// The hero total: 8,400 users at HERO_START, one more every 30 minutes (48 a day), plus
// every new Pobi user, so a Pobi signup lands in both numbers in the same minute.
const HERO_START_USERS = 8400;
const HERO_START = Date.parse("2026-09-24T00:00:00Z");
const HERO_GROWTH_INTERVAL_MS = 30 * MINUTE_MS;

export const heroUsersAt = (time: number) =>
  HERO_START_USERS +
  Math.max(0, Math.floor((time - HERO_START) / HERO_GROWTH_INTERVAL_MS)) +
  (pobiUsersAt(time) - POBI_START_USERS);
