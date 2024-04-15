import { LoginFormCardProps } from './index.types';
import './index.style.scss';
import loginFormTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { LoginForm } from '@/features/login';

export class LoginFormCard extends Component<
    HTMLDivElement,
    LoginFormCardProps
> {
    form: LoginForm;
    protected errorElement: HTMLDivElement;

    /**
     * Constructor for Login form
     * @param {Element} parent - parent html element
     */
    constructor(parent: Element, props: LoginFormCardProps) {
        super(parent, loginFormTmpl, props);
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
    protected render() {
        this.renderTemplate();

        this.errorElement = this.htmlElement.getElementsByClassName(
            'login-form-card__error',
        )[0] as HTMLDivElement;

        this.form = new LoginForm(
            this.htmlElement.getElementsByClassName('login-form-card__main')[0],
        );
    }
}
