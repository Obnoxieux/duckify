/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
    document.addEventListener("click", (e) => {

        function duckify(tabs) {
            browser.tabs.sendMessage(tabs[0].id, {
                command: "duckify",
            });
        }

        function reset(tabs) {
            browser.tabs.sendMessage(tabs[0].id, {
                command: "reset",
            });
        }

        /**
         * Just log the error to the console.
         */
        function reportError(error) {
            console.error(`Could not duckify: ${error}`);
        }

        if (e.target.tagName !== "BUTTON" || !e.target.closest("#popup-content")) {
            // Ignore when click is not on a button within <div id="popup-content">.
            return;
        }
        if (e.target.type === "reset") {
            browser.tabs
                .query({ active: true, currentWindow: true })
                .then(reset)
                .catch(reportError);
        } else {
            browser.tabs
                .query({ active: true, currentWindow: true })
                .then(duckify)
                .catch(reportError);
        }
    });
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to execute duckify content script: ${error.message}`);
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs
    .executeScript({ file: "/content_scripts/duckify.js" })
    .then(listenForClicks)
    .catch(reportExecuteScriptError);
