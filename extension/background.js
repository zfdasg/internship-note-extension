chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({ text: '记' });
  chrome.action.setBadgeBackgroundColor({ color: '#2563eb' });
});
