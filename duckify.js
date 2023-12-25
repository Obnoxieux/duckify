/**
 * @param {Element} element 
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

const body = document.querySelector("body")
replaceInText(body, window.duckifyTerms)

console.log("🦆: Quack!")