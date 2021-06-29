const muteButton = document.getElementById("mute-spotify");
const key = "activate-extenstion"

chrome.storage.local.get([key], (res) => {
    const activate = res[key];
    muteButton.innerHTML = `${activate === "true" ? "Activate" : "Deactivate"} Extension`;
});

muteButton.addEventListener("click", () => {
    chrome.storage.local.get([key], (res) => {
        const activate = res[key];
        chrome.storage.local.set({ [key]: (activate === "true" ? "false" : "true") }, () => {
            console.log(`mute-spotify-extenstion ${activate === "true" ? "deactivated" : "activated"}`);
            muteButton.innerHTML = `${activate === "true" ? "Deactivate" : "Activate"} Extension`;
        });
    });
})