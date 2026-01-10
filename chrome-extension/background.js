// Background service worker for mGBA Chrome Extension

// Open side panel when extension icon is clicked
chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel.open({ windowId: tab.windowId });
});

// Listen for messages from the side panel
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'loadROM') {
    console.log('Loading ROM:', request.romName);
    sendResponse({ success: true });
  }
  return true;
});

console.log('mGBA Extension background service worker loaded');
