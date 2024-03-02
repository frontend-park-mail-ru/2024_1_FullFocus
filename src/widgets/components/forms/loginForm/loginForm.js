import loginTmpl from './loginForm.pug'

export class LoginForm {
    constructor(parent) {
        this.parentItem = parent;
    }

    render() {
        const component = loginTmpl();
        this.parentItem.htmlElement.insertAdjacentHTML('beforeend', component);
    }
}
