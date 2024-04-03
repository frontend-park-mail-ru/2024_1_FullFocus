import './style.scss';
import { LoginFormCard } from '@/widgets/loginFormCard';
import pageTmpl from './template.pug';
import { loginUser } from '@/features/auth';
import { parseForm } from '@/entities/form';
import { LoginPageProps } from './types';
import { Component } from '@/shared/@types/component';

export class Login extends Component<HTMLDivElement, LoginPageProps> {
    formObj: LoginFormCard;
    protected errorsElement: HTMLDivElement;
    private navigateToMain: () => void;
    private listener: (e: SubmitEvent) => void;

    /**
     * Constructor for Login page object
     * @param {Element} parent - parent object
     */
    constructor(parent: Element, navigateToMain: () => void) {
        super(parent, pageTmpl, {
            className: 'login-page',
            navigateToMain: navigateToMain,
        });

        this.navigateToMain = navigateToMain;
    }

    private componentDidMount() {
        this.listener = (e) => {
            e.preventDefault();
            this.formObj.clearError();

            const formData = parseForm(this.formObj.form);

            if (formData.isValid) {
                this.formObj.form.setReadonly();

                loginUser(this.formObj.form.htmlElement)
                    .then(({ status, msgRus }) => {
                        this.formObj.form.setNotReadonly();
                        if (status === 200) {
                            this.navigateToMain();
                            return;
                        }

                        this.formObj.form.setInvalid();
                        this.formObj.addError(msgRus);
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
     * Renders login page
     */
    protected render() {
        this.renderTemplate();

        this.formObj = new LoginFormCard(this.htmlElement, {
            className: 'login-form-card-main',
        });

        this.componentDidMount();
    }

    destroy(): void {
        super.destroy();
        this.componentWillUnmount();
    }
}
