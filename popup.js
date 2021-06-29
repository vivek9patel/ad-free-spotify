import { googleAnalyticsCode } from './secrets.js';

// google analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', googleAnalyticsCode]);
_gaq.push(['_trackPageview']);

(function () {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

const muteButton = document.getElementById("mute-spotify");
const key = "activate-extenstion"

chrome.storage.local.get([key], (res) => {
    const activate = res[key];
    muteButton.innerHTML = `${activate === "true" ? "Activate" : "Deactivate"} Extension`;
});

muteButton.addEventListener("click", () => {
    _gaq.push(['_trackEvent', 'mute.popup.button', 'clicked']);
    chrome.storage.local.get([key], (res) => {
        const activate = res[key];
        chrome.storage.local.set({ [key]: (activate === "true" ? "false" : "true") }, () => {
            _gaq.push(['_trackEvent', `extension-toggled`, `${activate === "true" ? "deactivated" : "activated"}`]);
            console.log(`mute-spotify-extenstion ${activate === "true" ? "deactivated" : "activated"}`);
            muteButton.innerHTML = `${activate === "true" ? "Deactivate" : "Activate"} Extension`;
        });
    });
})