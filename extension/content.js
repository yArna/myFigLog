
document.addEventListener(
    "DOMContentLoaded",
    function () {
        injectScript(chrome.runtime.getURL("app.js"), "body")
    },
    false
)
