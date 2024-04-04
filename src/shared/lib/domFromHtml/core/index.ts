/**
 * Creates html element from html text
 * @param {string} html - html element
 * @returns {Element} html element from html text
 */
export function domFromHtml(html: string): Element {
    return new DOMParser().parseFromString(html, 'text/html').body
        .firstElementChild;
}
