import buttonTmpl from './button.pug';

export class Button {
    /**
     * Button constructor
     * @param {HTMLElement} parent - parent element
     * @param {string} type - html type
     * @param {string} elClass - html class
     * @param {string} btnText - text for button
     */
    constructor(parent, type, elClass, btnText) {
        this.parent = parent;
        this.type = type;
        this.elClass = elClass;
        this.btnText = btnText;
        this.htmlElement = null;
    }

    /**
     * Renders Button
     */
    render() {
        this.parent.insertAdjacentHTML(
            'beforeend',
            buttonTmpl({
                btnText: this.btnText,
                type: this.type,
                elClass: this.elClass,
            }),
        );

        this.htmlElement = this.parent.getElementsByClassName(this.elClass)[0];
    }
}
