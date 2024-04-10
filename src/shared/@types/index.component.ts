import { TmplFunc } from './index.templateFunction';

interface IProps {
    className: string;
}

export abstract class Component<
    Type extends Element,
    Props extends IProps = IProps,
> {
    htmlElement: Type;
    protected parent: Element;
    protected tmplFunc: TmplFunc;
    protected props: Props;

    constructor(parent: Element, tmplFunc: TmplFunc, props: Props) {
        this.parent = parent;
        this.tmplFunc = tmplFunc;
        this.props = props;
        this.htmlElement = null;
        this.render();
    }

    protected render() {
        this.renderTemplate();
    }

    protected renderTemplate() {
        this.parent.insertAdjacentHTML('beforeend', this.tmplFunc(this.props));
        this.htmlElement = this.parent.getElementsByClassName(
            this.props.className,
        )[0] as Type;
    }

    update() {
        this.destroy();
        this.render();
    }

    destroy() {
        this.htmlElement.remove();
    }
}
