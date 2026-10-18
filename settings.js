// Shared by content.js and popup.js.
const DIM_CATEGORIES = [
  { key: "critic", label: "Critic scores", default: true },
  { key: "user", label: "User scores", default: true },
  { key: "tracks", label: "Track ratings", default: true },
  { key: "reviews", label: "Scores on individual reviews", default: true },
  { key: "ranks", label: "Year / all-time rankings", default: true },
  { key: "musthear", label: "\"Must Hear\" badges", default: true },
  { key: "reviewtext", label: "Review text", default: false },
];

const DIM_DEFAULTS = { enabled: true };
for (const c of DIM_CATEGORIES) DIM_DEFAULTS[c.key] = c.default;
