import { LoginFormCardProps } from './types';
import './style.scss';
import loginFormTmpl from './template.pug';
import { Component } from '@/shared/@types/component';
import { LoginForm } from '@/features/auth/ui';

export class LoginFormCard extends Component<
    HTMLDivElement,
    LoginFormCardProps
> {
    form: LoginForm;
    errorElement: HTMLDivElement;

    /**
     * Constructor for Login form
     * @param {Element} parent - parent html element
     */
    constructor(parent: Element, props: LoginFormCardProps) {
        super(parent, loginFormTmpl, props);
        this.form = null;
    }

    addError(error: string): void {
        this.errorElement.textContent = error;
    }

    clearError(): void {
        this.errorElement.textContent = '';
    }

    /**
     * Renders Login form
     */
    render() {
        super.render();

        this.errorElement = this.htmlElement.getElementsByClassName(
            'login-form-card__error',
        )[0] as HTMLDivElement;

        this.form = new LoginForm(
            this.htmlElement.getElementsByClassName('login-form-card__main')[0],
        );

        this.form.render();
    }
}
