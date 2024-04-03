import './style.scss';
import signupFormTmpl from './template.pug';
import { SignUpFormCardProps } from './types';
import { SignUpForm } from '@/features/auth';
import { Component } from '@/shared/@types/component';

export class SignUpFormCard extends Component<
    HTMLDivElement,
    SignUpFormCardProps
> {
    form: SignUpForm;
    protected errorElement: HTMLDivElement;

    /**
     * Constructor for SignUpFormCard
     */
    constructor(parent: Element, props: SignUpFormCardProps) {
        super(parent, signupFormTmpl, props);
    }

    addError(error: string): void {
        this.errorElement.textContent = error;
    }

    clearError(): void {
        this.errorElement.textContent = '';
    }

    /**
     * Renders signup form
     */
    protected render() {
        this.renderTemplate();

        this.errorElement = this.htmlElement.getElementsByClassName(
            'signup-form-card__error',
        )[0] as HTMLDivElement;

        this.form = new SignUpForm(
            this.htmlElement.getElementsByClassName(
                'signup-form-card__main',
            )[0],
        );
    }
}
