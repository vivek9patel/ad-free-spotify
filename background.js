const toggleMuteState = async (tab, muted) => {
  console.log(`Tab ${tab.title} requested to ${muted ? 'mute' : 'unmute'}`);
  if (muted === tab.mutedInfo.muted) {
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