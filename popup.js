document.getElementById("mute-spotify").addEventListener("click", () => {
    chrome.tabs.sendMessage({ msg: "muteSpotify" });
})