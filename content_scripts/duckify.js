(() => {
    /**
     * Check and set a global guard variable.
     * If this content script is injected into the same page again,
     * it will do nothing next time.
     */
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    window.duckifyTerms = [
        {
            "name": "Kaczynski",
            "replacement": "🦆"
        },
        {
            "name": "Morawiecki",
            "replacement": "🤥"
        }
    ]

    /**
     * @param {ChildNode} element
     * @param {Array} terms
     */
    function replaceInText(element, terms) {
        for (let node of element.childNodes) {
            switch (node.nodeType) {
                case Node.ELEMENT_NODE:
                    replaceInText(node, terms);
                    break;
                case Node.TEXT_NODE:
                    for (let term of terms) {
                        node.textContent = node.textContent.replace(term.name, term.replacement);
                    }
                    break;
                case Node.DOCUMENT_NODE:
                    replaceInText(node, terms);
            }
        }
    }

    function insertDucks() {
        const body = document.querySelector("body")
        replaceInText(body, window.duckifyTerms)

        console.log("🦆: Quack!")
    }

    function removeExistingBeasts() {
        console.log("Reset triggered")
    }

    /**
     * Listen for messages from the background script.
     */
    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "duckify") {
            insertDucks();
        } else if (message.command === "reset") {
            removeExistingBeasts();
        }
    });
})();
