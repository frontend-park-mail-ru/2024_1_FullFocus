import './style.scss';
import { ajaxMultipartForm } from '@/shared/api/ajax';
import { SignUpForm } from '@/widgets/signupForm/signupForm';
import { EmptyContainer } from '@/shared/uikit/emptyContainer/emptyContainer';
import { WithNavbar } from '@/widgets/layout/withNavbar/withNavbar';
import {
    validateLogin,
    validatePassword,
} from '@/shared/lib/validate/validate';

export class SignUp {
    parentItem: WithNavbar;
    name: string;
    htmlElement: HTMLDivElement;
    errorsElement: HTMLDivElement;
    formObj: SignUpForm;

    /**
     * Constructor for SignUp page object
     * @param {Element} parent - parent object
     * @param {string} name - name of the page
     */
    // TODO parent: Element
    constructor(parent: WithNavbar, name: string) {
        this.parentItem = parent;
        this.name = name;
        this.htmlElement = null;
        this.errorsElement = null;
    }

    /**
     * Renders signup page
     */
    // eslint-disable-next-line max-lines-per-function
    render() {
        // TODO parentItem.htmlElement -> parent
        this.formObj = new SignUpForm(this.parentItem.htmlElement);
        this.formObj.render();

        this.htmlElement = this.formObj.htmlElement;

        const errorsCont = new EmptyContainer(
            this.htmlElement,
            'signup-form-card__errors',
        );
        errorsCont.render();
        this.errorsElement = errorsCont.htmlElement;

        this.htmlElement.addEventListener('submit', (e) => {
            e.preventDefault();
            this.errorsElement.textContent = '';

            const loginField =
                this.formObj.form.htmlElement.getElementsByClassName(
                    'input-block__login',
                )[0] as HTMLInputElement;

            let error = validateLogin(loginField.value);
            let isValid = true;
            if (error != null) {
                isValid = false;
                loginField.classList.add('input-block__input_invalid');
                loginField.classList.remove('input-block__input_valid');
                const errorField =
                    this.formObj.form.htmlElement.getElementsByClassName(
                        'input-block__login-error',
                    )[0] as HTMLDivElement;
                errorField.hidden = false;
                errorField.textContent = error;
            } else {
                loginField.classList.remove('input-block__input_invalid');
                loginField.classList.add('input-block__input_valid');
                const errorField =
                    this.formObj.form.htmlElement.getElementsByClassName(
                        'input-block__login-error',
                    )[0] as HTMLDivElement;
                errorField.hidden = true;
            }

            const passwordField =
                this.formObj.form.htmlElement.getElementsByClassName(
                    'input-block__password',
                )[0] as HTMLInputElement;
            error = validatePassword(passwordField.value);
            if (error != null) {
                isValid = false;
                passwordField.classList.add('input-block__input_invalid');
                passwordField.classList.remove('input-block__input_valid');
                const errorField =
                    this.formObj.form.htmlElement.getElementsByClassName(
                        'input-block__password-error',
                    )[0] as HTMLDivElement;
                errorField.textContent = error;
                errorField.hidden = false;
            } else {
                passwordField.classList.remove('input-block__input_invalid');
                passwordField.classList.add('input-block__input_valid');
                const errorField =
                    this.formObj.form.htmlElement.getElementsByClassName(
                        'input-block__password-error',
                    )[0] as HTMLDivElement;
                errorField.hidden = true;
            }

            if (isValid) {
                const formEl = document.getElementsByClassName(
                    'signup-form',
                )[0] as HTMLFormElement;
                const submitBtn = formEl.getElementsByClassName(
                    'btn-submit',
                )[0] as HTMLButtonElement;
                submitBtn.disabled = true;
                submitBtn.classList.add('btn-submit--loading');
                const p = ajaxMultipartForm('POST', '/api/auth/signup', formEl);

                p.then(({ Status, MsgRus }) => {
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('btn-submit--loading');
                    if (Status === 200) {
                        this.parentItem.goToPage('main');
                        return;
                    }
                    loginField.classList.add('input-block__input_invalid');
                    passwordField.classList.add('input-block__input_invalid');
                    this.errorsElement.textContent = MsgRus;
                }).catch((error) => {
                    console.log(error);
                });
            }
        });
    }
}
