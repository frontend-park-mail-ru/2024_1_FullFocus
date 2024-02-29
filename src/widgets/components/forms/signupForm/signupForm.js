import signupTmpl from './signupForm.pug'

export class SignUpForm {
    constructor(parent) {
        this.parentItem = parent;
    }

    render() {
        const component = signupTmpl();
        this.parentItem.htmlElement.insertAdjacentHTML('beforeend', component);
    }
}

