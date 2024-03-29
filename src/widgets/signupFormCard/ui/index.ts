import { parseForm } from '@/entities/form';
import './style.scss';
import signupFormTmpl from './template.pug';
import { WithNavbar } from '@/widgets/layout';
import { signupUser } from '@/features/auth';
import { SignUpFormCardProps } from './types';
import { SignUpForm } from '@/features/auth';
import { Component } from '@/shared/@types/component';

export class SignUpFormCard extends Component<
    HTMLDivElement,
    SignUpFormCardProps
> {
    errorElement: HTMLDivElement;
    form: SignUpForm;
    private listener: (e: SubmitEvent) => void;
    private layoutItem: WithNavbar;

    /**
     * Constructor for SignUpFormCard
     */
    constructor(
        parent: Element,
        layoutItem: WithNavbar,
        props: SignUpFormCardProps,
    ) {
        super(parent, signupFormTmpl, props);
        this.layoutItem = layoutItem;
    }

    addError(error: string): void {
        this.errorElement.textContent = error;
    }

    clearError(): void {
        this.errorElement.textContent = '';
    }

    private componentDidMount() {
        this.listener = (e: SubmitEvent) => {
            e.preventDefault();
            this.clearError();

            const formData = parseForm(this.form);

            if (formData.isValid) {
                this.form.setReadonly();

                signupUser(this.form.htmlElement)
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
     * Renders signup form
     */
    render() {
        super.render();

        this.errorElement = this.htmlElement.getElementsByClassName(
            'signup-form-card__error',
        )[0] as HTMLDivElement;

        this.form = new SignUpForm(
            this.htmlElement.getElementsByClassName(
                'signup-form-card__main',
            )[0],
        );

        this.form.render();

        this.componentDidMount();
    }

    destroy(): void {
        super.destroy();
        this.componentWillUnmount();
    }
}
