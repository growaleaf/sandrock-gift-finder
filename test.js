const assert = require("assert");
const { CHARACTERS, SOURCE } = require("./data.js");

function findCharacter(name) {
  return CHARACTERS.find((c) => c.name === name);
}

function findTier(name, tierName) {
  const c = findCharacter(name);
  if (!c || !c.tiers) return null;
  return c.tiers.find((t) => t.tier === tierName);
}

let passed = 0;
let failed = 0;

function test(label, fn) {
  try {
    fn();
    passed++;
    console.log("PASS - " + label);
  } catch (err) {
    failed++;
    console.log("FAIL - " + label + " :: " + err.message);
  }
}

test("CHARACTERS has 31 entries (29 with tier tables, Fang and Sandy with notes)", () => {
  assert.strictEqual(CHARACTERS.length, 31);
});

test("Amirah Love tier includes Big Flowered Rhino Horn Potted Plant", () => {
  const t = findTier("Amirah", "Love");
  assert.ok(t.items.includes("Big Flowered Rhino Horn Potted Plant"));
});

test("Amirah Refuse tier is Manure at value -8", () => {
  const t = findTier("Amirah", "Refuse");
  assert.deepStrictEqual(t.items, ["Manure"]);
  assert.strictEqual(t.value, "-8");
});

test("Grace Love tier has exactly 15 items", () => {
  const t = findTier("Grace", "Love");
  assert.strictEqual(t.items.length, 15);
});

test("Unsuur Love tier is exactly Diamond, Gold, Opal, Rosestone", () => {
  const t = findTier("Unsuur", "Love");
  assert.deepStrictEqual(t.items, ["Diamond", "Gold", "Opal", "Rosestone"]);
});

test("Unsuur Hate tier has no listed items (source lists none, must not be invented)", () => {
  const t = findTier("Unsuur", "Hate");
  assert.deepStrictEqual(t.items, []);
});

test("Fang has a note instead of a tier table and does not accept gifts", () => {
  const c = findCharacter("Fang");
  assert.ok(!c.tiers);
  assert.ok(c.note.includes("doesn’t accept gifts"));
});

test("Sandy has a note instead of a tier table, +1 for every gift", () => {
  const c = findCharacter("Sandy");
  assert.ok(!c.tiers);
  assert.ok(c.note.includes("+1 for every gift"));
});

test("Mort Like tier includes Gold", () => {
  const t = findTier("Mort", "Like");
  assert.ok(t.items.includes("Gold"));
});

test("No stray zero-width-no-break-space characters remain in parsed item names", () => {
  const zw = "⁠";
  for (const c of CHARACTERS) {
    if (!c.tiers) continue;
    for (const t of c.tiers) {
      for (const item of t.items) {
        assert.ok(!item.includes(zw), `${c.name}/${t.tier} item "${item}" contains U+2060`);
      }
    }
  }
});

test("An item absent from a character's lists is absent, not defaulted to a tier", () => {
  const t = findTier("Amirah", "Love");
  assert.ok(!t.items.includes("Manure"));
});

test("SOURCE records the live re-fetch date and the site's own last-modified date", () => {
  assert.strictEqual(SOURCE.url, "https://thenerdstash.com/my-time-at-sandrock-all-gift-preferences/");
  assert.strictEqual(SOURCE.fetchedDate, "2026-11-21");
  assert.strictEqual(SOURCE.siteLastModified, "2024-08-08");
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
