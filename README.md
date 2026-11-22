# My Time at Sandrock — Gift Preference Finder

Static page. Open `index.html` directly or serve the folder (e.g. `python3 -m http.server`).

- `index.html` — page markup and UI logic (item search, character picker).
- `data.js` — parsed gift-preference data plus the `SOURCE` record. Loaded by both the browser (`<script src="data.js">`) and Node (`require("./data.js")`).
- `test.js` — run with `node test.js`.

## Data

Parsed from thenerdstash.com, "My Time at Sandrock – All Gift Preferences"
(https://thenerdstash.com/my-time-at-sandrock-all-gift-preferences/).
Page metadata reports it was last modified 2024-08-08; it was re-fetched live
on 2026-11-21 and found byte-identical to the locally saved copy this page was
built from. The source itself says it is not exhaustive, and in-game values
may have drifted since 2024-08-08.

Each of the 29 characters with a gift table has five tiers: Love, Like,
Dislike, Hate, Refuse. Two characters (Fang, Sandy) don't use the tier system
and get a short note instead, taken verbatim from the source.

If an item or tier shows no entries, that means the source lists none —
it is never backfilled or guessed.
