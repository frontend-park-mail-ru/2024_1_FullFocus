import './style.css';
import { ajaxMultipartForm } from '../../shared/api/ajax';
import { LoginForm } from '../../widgets/loginForm/loginForm';
import { EmptyContainer } from '../../shared/uikit/emptyContainer/emptyContainer';
import {
    validateLogin,
    validatePassword,
} from '../../shared/lib/validate/validate';

export class Login {
    /**
     * Constructor for Login page object
     * @param {any} parent - parent object
     * @param {string} name - name of the page
     */
    // TODO parent: HTMLElement
    constructor(parent, name) {
        this.parentItem = parent;
        this.name = name;
        this.htmlElement = null;
        this.formObj = null;
        this.errorsElement = null;
    }

    /**
     * Renders login page
     */
    render() {
        this.formObj = new LoginForm(this.parentItem.htmlElement);
        this.formObj.render();

        this.htmlElement = this.formObj.htmlElement;

        const errorsCont = new EmptyContainer(
            this.htmlElement,
            'login-form-card__errors',
        );
        errorsCont.render();
        this.errorsElement = errorsCont.htmlElement;

        this.htmlElement.addEventListener('submit', (e) => {
            e.preventDefault();
            this.errorsElement.textContent = '';

            const loginField =
                this.formObj.form.htmlElement.getElementsByClassName(
                    'input-block__login',
                )[0];

            let error = validateLogin(loginField.value);
            let isValid = true;
            if (error != null) {
                isValid = false;
                loginField.classList.add('input-block__input_invalid');
                const errorField =
                    this.formObj.form.htmlElement.getElementsByClassName(
                        'input-block__login-error',
                    )[0];
                errorField.hidden = false;
                errorField.textContent = error;
            } else {
                loginField.classList.remove('input-block__input_invalid');
                loginField.classList.add('input-block__input_valid');
                this.formObj.form.htmlElement.getElementsByClassName(
                    'input-block__login-error',
                )[0].hidden = true;
            }

            const passwordField =
                this.formObj.form.htmlElement.getElementsByClassName(
                    'input-block__password',
                )[0];
            error = validatePassword(passwordField.value);
            if (error != null) {
                isValid = false;
                passwordField.classList.add('input-block__input_invalid');
                const errorField =
                    this.formObj.form.htmlElement.getElementsByClassName(
                        'input-block__password-error',
                    )[0];
                errorField.textContent = error;
                errorField.hidden = false;
            } else {
                passwordField.classList.remove('input-block__input_invalid');
                passwordField.classList.add('input-block__input_valid');
                this.formObj.form.htmlElement.getElementsByClassName(
                    'input-block__password-error',
                )[0].hidden = '';
            }

            if (isValid) {
                const formEl = document.getElementsByClassName('login-form')[0];
                const submitBtn =
                    formEl.getElementsByClassName('btn-submit')[0];
                submitBtn.disabled = true;
                submitBtn.classList.add('btn-submit--loading');
                ajaxMultipartForm(
                    'POST',
                    '/api/auth/login',
                    formEl,
                    (status, msg, msgrus) => {
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('btn-submit--loading');
                        if (status === 200) {
                            this.parentItem.goToPage('main');
                            return;
                        }
                        loginField.classList.add('input-block__input_invalid');
                        passwordField.classList.add(
                            'input-block__input_invalid',
                        );
                        this.errorsElement.textContent = msgrus;
                    },
                );
            }
        });
    }
}
