import './index.style.scss';
import overlayTml from './index.template.pug';

export function insertDarkOverlay(parent: Element) {
    parent.insertAdjacentHTML('afterbegin', overlayTml());
    const overlayEl = parent.getElementsByClassName(
        'dark-overlay',
    )[0] as HTMLDivElement;

    return overlayEl;
}
