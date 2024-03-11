/**
 * Creates html element from html text
 * @param {string} html - html element
 * @returns {HTMLElement} html element from html text
 */
export function domFromHtml(html) {
    return new DOMParser().parseFromString(html, "text/html")
            .body.firstElementChild;
}
