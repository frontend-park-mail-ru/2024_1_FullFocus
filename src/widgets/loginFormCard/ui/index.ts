import { LoginFormCardProps } from './index.types';
import './index.style.scss';
import loginFormTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { LoginForm } from '@/features/login';
import { Link } from '@/shared/uikit/link';

export class LoginFormCard extends Component<
    HTMLDivElement,
    LoginFormCardProps
> {
    form: LoginForm;
    protected errorElement: HTMLDivElement;
    protected signupLink: Link;

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

    protected componentDidMount() {
        this.signupLink.htmlElement.addEventListener('click', (e: Event) => {
            e.preventDefault();
            this.props.navigateSignup();
        });
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

        this.signupLink = new Link(
            this.htmlElement.getElementsByClassName(
                'login-form-card__signup-link',
            )[0],
            {
                className: 'signup-link',
                style: 'primary',
                text: 'Регистрация',
                href: '',
            },
        );

        this.componentDidMount();
    }
}
