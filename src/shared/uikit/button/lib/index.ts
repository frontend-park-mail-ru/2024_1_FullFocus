import { Button } from '../ui';
import { ButtonProps } from '../ui/index.types';
import crossTmlp from './svgTemplates/index.crosssvg.pug';
import editTmpl from './svgTemplates/index.editsvg.pug';
import tickTmpl from './svgTemplates/index.ticksvg.pug';
import menuSvg from './svgTemplates/index.menusvg.pug';
import eyeOpenTmlp from './svgTemplates/eye/index.eyeopen.pug';
import arrowRightTmpl from './svgTemplates/index.arrowright.pug';
import eyeCloseTmlp from './svgTemplates/eye/index.eyeclose.pug';

export function getExitBtn(parent: Element, props: ButtonProps) {
    props.btnIconFunc = crossTmlp;
    props.btnText = '';
    return new Button(parent, props);
}

export function getEditBtn(parent: Element, props: ButtonProps) {
    props.btnIconFunc = editTmpl;
    props.btnText = '';
    return new Button(parent, props);
}

export function getTickBtn(parent: Element, props: ButtonProps) {
    props.btnIconFunc = tickTmpl;
    props.btnText = '';
    return new Button(parent, props);
}

export function getMenuBtn(parent: Element, props: ButtonProps) {
    props.btnIconFunc = menuSvg;
    props.btnText = '';
    return new Button(parent, props);
}

export function getArrowRightBtn(parent: Element, props: ButtonProps) {
    props.btnIconFunc = arrowRightTmpl;
    props.btnText = '';
    return new Button(parent, props);
}

export function getEyeBtn(parent: Element, props: ButtonProps) {
    props.btnIconFunc = eyeOpenTmlp;
    props.btnText = '';
    props.toggle = {
        btnIconFunc: eyeCloseTmlp,
        btnText: '',
    };

    return new Button(parent, props);
}
