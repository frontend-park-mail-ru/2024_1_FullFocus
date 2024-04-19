import { Button } from '../ui';
import { ButtonProps } from '../ui/index.types';
import crossTmlp from './svgTemplates/index.crosssvg.pug';
import editTmpl from './svgTemplates/index.editsvg.pug';
import eyeOpenTmlp from './svgTemplates/eye/index.eyeopen.pug';
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

export function getEyeBtn(parent: Element, props: ButtonProps) {
    props.btnIconFunc = eyeOpenTmlp;
    props.btnText = '';
    props.toggle = {
        btnIconFunc: eyeCloseTmlp,
        btnText: '',
    };

    return new Button(parent, props);
}