let interval = window.setInterval(() => {
    const footer = document.querySelector('footer')
    if (footer) {
        const anchors = footer.querySelectorAll('a');
        let isAd = false;
        anchors.forEach((a) => {
            try {
                if (a.innerText.includes("Advertisement") || a.href.includes('adclick')) {
                    isAd = true;
                }
            }
            catch {
                console.warn("No Adclick found!")
            }
        })
        try {
            if (isAd) {
                chrome.runtime.sendMessage({ msg: "muteSpotify" });
            }
            else {
                chrome.runtime.sendMessage({ msg: "unmuteSpotify" });
            }
        }
        catch (e) {
            console.log(e)
        }
    }
}, 2000);