let isExtensionActivated = false;

chrome.storage.local.get(["activate-extenstion"], (res) => {
  isExtensionActivated = (res["activate-extenstion"] === "false")
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  try {
    const value = changes["activate-extenstion"].newValue;
    isExtensionActivated = (value === "false")
  }
  catch { }
});

const toggleMuteState = async (tab, muted) => {
  console.log(`Tab ${tab.title} requested to ${muted ? 'mute' : 'unmute'}`);
  if (!isExtensionActivated) {
    console.log(`Extension is Deactivated!`);
    return;
  }
  else if (muted === tab.mutedInfo.muted) {
    console.log(`Tab ${tab.title} already ${muted ? 'mute' : 'unmute'}`);
    return;
  }
  await chrome.tabs.update(tab.id, { muted });
  console.log(`Tab ${tab.title} is ${muted ? 'muted' : 'unmuted'}`);
}

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.msg == "muteSpotify") {
      chrome.tabs.query({
        url: "https://open.spotify.com/*"
      }, function (tabs) {
        try {
          tabs.forEach(tab => {
            toggleMuteState(tab, true);
          });
        }
        catch { }
      });
    }
    else if (request.msg == "unmuteSpotify") {
      chrome.tabs.query({
        url: "https://open.spotify.com/*"
      }, function (tabs) {
        try {
          tabs.forEach(tab => {
            toggleMuteState(tab, false);
          });
        }
        catch { }
      });
    }
  }
);