importScripts("settings.js");

function showBadge(enabled) {
  chrome.action.setBadgeText({ text: enabled ? "ON" : "OFF" });
  chrome.action.setBadgeBackgroundColor({ color: enabled ? "#2e7d32" : "#777" });
}

function refreshBadge() {
  chrome.storage.sync.get(DIM_DEFAULTS, (s) => showBadge(s.enabled));
}

chrome.commands.onCommand.addListener((command) => {
  if (command !== "toggle-hiding") return;
  chrome.storage.sync.get(DIM_DEFAULTS, (s) => chrome.storage.sync.set({ enabled: !s.enabled }));
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes.enabled) showBadge(changes.enabled.newValue);
});

chrome.runtime.onInstalled.addListener(refreshBadge);
chrome.runtime.onStartup.addListener(refreshBadge);
