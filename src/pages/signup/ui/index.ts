import './index.style.scss';
import { SignUpFormCard } from '@/widgets/signupFormCard';
import pageTmpl from './index.template.pug';
import { useSignupUser } from '@/features/signup';
import { parseForm } from '@/entities/form';
import { SignUpPageProps } from './index.types';
import { Component } from '@/shared/@types/index.component';

export class SignUp extends Component<HTMLDivElement, SignUpPageProps> {
    formObj: SignUpFormCard;
    private listener: (e: SubmitEvent) => void;

    /**
     * Constructor for SignUp page object
     * @param {Element} parent - parent object
     * @param {string} name - name of the page
     */
    constructor(parent: Element, navigateToMain: () => void) {
        super(parent, pageTmpl, {
            className: 'signup-page',
            navigateToMain: navigateToMain,
        });
    }

    private componentDidMount() {
        this.listener = (e: SubmitEvent) => {
            e.preventDefault();
            this.formObj.clearError();

            const formData = parseForm(this.formObj.form);
            formData.inputs['login'].value;

            if (formData.isValid) {
                this.formObj.form.setReadonly();

                useSignupUser(
                    formData.inputs['login'].value,
                    formData.inputs['password'].value,
                )
                    .then(({ status, msgRus }) => {
                        this.formObj.form.setNotReadonly();
                        if (status === 200) {
                            this.props.navigateToMain();
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
     * Renders signup page
     */
    protected render() {
        this.renderTemplate();

        this.formObj = new SignUpFormCard(this.htmlElement, {
            className: 'signup-form-card-main',
        });

        this.componentDidMount();
    }

    destroy(): void {
        super.destroy();
        this.componentWillUnmount();
    }
}
