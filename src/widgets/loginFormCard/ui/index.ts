import { LoginFormCardProps } from './types';
import { parseForm } from '@/entities/form';
import './style.scss';
import loginFormTmpl from './template.pug';
import { WithNavbar } from '@/widgets/layout';
import { loginUser } from '@/features/auth';
import { Component } from '@/shared/@types/component';
import { LoginForm } from '@/features/auth/ui';

export class LoginFormCard extends Component<
    HTMLDivElement,
    LoginFormCardProps
> {
    form: LoginForm;
    errorElement: HTMLDivElement;
    private listener: (e: SubmitEvent) => void;
    private layoutItem: WithNavbar;

    /**
     * Constructor for Login form
     * @param {Element} parent - parent html element
     */
    constructor(
        parent: Element,
        layoutItem: WithNavbar,
        props: LoginFormCardProps,
    ) {
        super(parent, loginFormTmpl, props);
        this.form = null;
        this.layoutItem = layoutItem;
    }

    addError(error: string): void {
        this.errorElement.textContent = error;
    }

    clearError(): void {
        this.errorElement.textContent = '';
    }

    private componentDidMount() {
        this.listener = (e) => {
            e.preventDefault();
            this.clearError();

            const formData = parseForm(this.form);

            if (formData.isValid) {
                this.form.setReadonly();

                loginUser(this.form.htmlElement)
                    .then(({ status, msgRus }) => {
                        this.form.setNotReadonly();
                        if (status === 200) {
                            this.layoutItem.goToPage('main');
                            return;
                        }

                        this.form.setInvalid();
                        this.addError(msgRus);
                    })
                    .catch(() => {});
            }
        };

        this.htmlElement.addEventListener('submit', this.listener);
    }

    private componentWillUnmount() {
        this.htmlElement.removeEventListener('submit', this.listener);
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

        this.componentDidMount();
    }

    destroy(): void {
        super.destroy();
        this.componentWillUnmount();
    }
}
