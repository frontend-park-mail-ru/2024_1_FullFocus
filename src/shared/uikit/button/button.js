import { domFromHtml } from '../../lib/domFromHtml/domFromHtml';
import buttonTmpl from './button.pug';

export class Button {
    /**
     * Button constructor
     * @param {string} type - html type
     * @param {string} elClass - html class
     * @param {string} btnText - text for button
     */
    constructor(type, elClass, btnText) {
        this.type = type;
        this.elClass = elClass;
        this.btnText = btnText;
    }

    /**
     * Renders Button
     * @returns {HTMLElement} rendered html element
     */
    render() {
        return domFromHtml(
            buttonTmpl({
                btnText: this.btnText,
                type: this.type,
                elClass: this.elClass,
            }),
        );
    }
}
