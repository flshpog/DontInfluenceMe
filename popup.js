const cats = document.getElementById("cats");
const toggle = document.getElementById("toggle");
let enabled = true;

for (const { key, label } of DIM_CATEGORIES) {
  const row = document.createElement("label");
  const box = document.createElement("input");
  box.type = "checkbox";
  box.dataset.key = key;
  row.append(box, label);
  cats.append(row);
}

function render() {
  toggle.classList.toggle("showing", !enabled);
  toggle.innerHTML = enabled
    ? "Show scores<small>Scores are hidden</small>"
    : "Hide scores<small>Scores are visible</small>";
  cats.classList.toggle("off", !enabled);
}

chrome.storage.sync.get(DIM_DEFAULTS, (s) => {
  enabled = s.enabled;
  cats.querySelectorAll("input").forEach((i) => (i.checked = s[i.dataset.key]));
  render();
});

// Keep the button in sync if the keyboard shortcut is used while the popup is open.
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes.enabled) {
    enabled = changes.enabled.newValue;
    render();
  }
});

toggle.addEventListener("click", () => {
  enabled = !enabled;
  render();
  chrome.storage.sync.set({ enabled });
});
cats.addEventListener("change", (e) => {
  chrome.storage.sync.set({ [e.target.dataset.key]: e.target.checked });
});
