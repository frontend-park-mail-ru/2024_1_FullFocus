import inputTmpl from './input.pug';

export class Input {
    /**
     * Input constructo
     * @param {Element} parent - parent html element
     * @param {string} name - html name
     * @param {string} placeholder - html placeholder
     * @param {string} type - html type
     * @param {string} elClass - html class
     */
    constructor(parent, name, placeholder, type, elClass) {
        this.parent = parent;
        this.name = name;
        this.placeholder = placeholder;
        this.type = type;
        this.elClass = elClass;
    }

    /**
     * Renders Input
     * @returns {HTMLElement} rendered html element
     */
    render() {
        this.parent.insertAdjacentHTML(
            'beforeend',
            inputTmpl({
                name: this.name,
                placeholder: this.placeholder,
                type: this.type,
                elClass: this.elClass,
            }),
        );
    }
}
