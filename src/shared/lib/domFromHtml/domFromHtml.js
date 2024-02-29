export function domFromHtml(html) {
    return new DOMParser().parseFromString(html, "text/html")
            .body.firstElementChild;
}
