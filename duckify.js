/**
 * @param {Element} element 
 * @param {string} pattern 
 * @param {string} replacement 
 */
function replaceInText(element, pattern, replacement) {
    for (let node of element.childNodes) {
        switch (node.nodeType) {
            case Node.ELEMENT_NODE:
                replaceInText(node, pattern, replacement);
                break;
            case Node.TEXT_NODE:
                node.textContent = node.textContent.replace(pattern, replacement);
                break;
            case Node.DOCUMENT_NODE:
                replaceInText(node, pattern, replacement);
        }
    }
}

const body = document.querySelector("body")
replaceInText(body, "Kaczynski", "🦆")

console.log("🦆: Quack!")