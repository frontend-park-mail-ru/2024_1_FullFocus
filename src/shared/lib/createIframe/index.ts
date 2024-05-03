import iframeTmpl from './index.template.pug';
import './index.style.scss';

export function createIframe(
    parent: Element,
    classNameStyle: string,
    src: string,
    width: number,
    height: number,
) {
    const className = `iframe iframe-[${src}] ${classNameStyle}`;
    parent.insertAdjacentHTML(
        'beforeend',
        iframeTmpl({
            className: className,
            src: src,
            width: width,
            height: height,
        }),
    );
    const component = parent.getElementsByClassName(
        className,
    )[0] as HTMLIFrameElement;

    return {
        remove: () => {
            component.classList.add('iframe--remove');
            setTimeout(() => {
                component.remove();
            }, 1000);
        },
        component: component,
    };
}
