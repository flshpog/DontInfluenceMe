(() => {
  const root = document.documentElement;

  // [selector, category]; category may be a function of the element.
  const RULES = [
    [".albumCriticScore", "critic"],
    [".albumUserScore", "user"],
    [".trackRating", "tracks"],
    [".albumReviewRating, .albumReviewRatingBar", "reviews"],
    [".ratingBlock", ratingBlockCategory],
    [".albumCriticScoreBox .text.gray, .albumUserScoreBox .text.gray, #moreStats, #moreStatsLink", "ranks"],
    [".mustHearButton, .mustHear:not(.image)", "musthear"],
    [".albumReviewText, .reviewText", "reviewtext"],
  ];
  const ALL_SELECTORS = RULES.map(([s]) => s).join(", ");

  // A .ratingBlock in a list row is labelled by the "critic score" / "user score" text next to it;
  // anywhere else it is the score on someone's review.
  function ratingBlockCategory(el) {
    const row = el.closest(".ratingRow");
    if (!row) return "reviews";
    return row.textContent.toLowerCase().includes("user") ? "user" : "critic";
  }

  function tag(el) {
    if (el.hasAttribute("data-dim")) return;
    for (const [selector, cat] of RULES) {
      if (el.matches(selector)) {
        el.setAttribute("data-dim", typeof cat === "function" ? cat(el) : cat);
        return;
      }
    }
  }

  function tagWithin(node) {
    if (node.nodeType !== 1) return;
    if (node.matches(ALL_SELECTORS)) tag(node);
    node.querySelectorAll(ALL_SELECTORS).forEach(tag);
  }

  function apply(settings) {
    root.classList.toggle("dim-disabled", !settings.enabled);
    for (const c of DIM_CATEGORIES) root.classList.toggle(`dim-off-${c.key}`, !settings[c.key]);
  }

  chrome.storage.sync.get(DIM_DEFAULTS, apply);
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "sync") chrome.storage.sync.get(DIM_DEFAULTS, apply);
  });

  new MutationObserver((mutations) => {
    for (const m of mutations) m.addedNodes.forEach(tagWithin);
  }).observe(root, { childList: true, subtree: true });

  document.addEventListener("DOMContentLoaded", () => {
    tagWithin(document.body);
    root.classList.add("dim-ready");
  });
})();
