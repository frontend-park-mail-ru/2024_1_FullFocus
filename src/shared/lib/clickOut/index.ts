export function isClickOut(htmlElement: Element, e: MouseEvent) {
    const dimensions = htmlElement.getBoundingClientRect();
    return (
        e.clientX < dimensions.left ||
        e.clientX > dimensions.right ||
        e.clientY < dimensions.top ||
        e.clientY > dimensions.bottom
    );
}
