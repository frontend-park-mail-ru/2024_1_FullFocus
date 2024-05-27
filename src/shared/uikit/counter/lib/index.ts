export function isCounterClicked(target: HTMLElement) {
    return (
        target.classList.contains('counter__minus') ||
        target.classList.contains('counter__plus') ||
        target.classList.contains('counter__icon') ||
        target.classList.contains('counter__icon-path')
    );
}
