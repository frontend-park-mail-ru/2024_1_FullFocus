import { domFromHtml } from '../../lib/domFromHtml/domFromHtml';
import { Button } from '../button/button';
import inputTmpl from './input.pug';

export class Input {
    /**
     * Input constructor
     * @param {string} name html name
     * @param {string} placeholder html placeholder
     * @param {string} type html type
     * @param {string} elClass html class
     */
    constructor(name, placeholder, type, elClass) {
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
        const element = domFromHtml(
            inputTmpl({
                name: this.name,
                placeholder: this.placeholder,
                type: this.type,
                elClass: this.elClass,
            }),
        );

        if (this.type === 'password') {
            const btn = new Button(
                'button',
                'hide-show-password-btn',
                'show',
            ).render();
            element
                .getElementsByClassName('input-block__input')[0]
                .appendChild(btn);
            btn.addEventListener('click', (e) => {
                const input = element.getElementsByClassName(this.elClass)[0];
                const target = e.target;
                if (input.type === 'password') {
                    input.type = 'text';
                    target.textContent = 'hide';
                } else {
                    input.type = 'password';
                    target.textContent = 'show';
                }
            });
        }

        return element;
    }
}
