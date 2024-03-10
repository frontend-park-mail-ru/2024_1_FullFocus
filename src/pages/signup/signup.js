import { ajaxMultipartForm } from "../../shared/api/ajax";
import { SignUpForm } from "../../widgets/signupForm/signupForm";
import { EmptyContainer } from "../../shared/uikit/emptyContainer/emptyContainer";
import { validateLogin, validatePassword } from "../../shared/lib/validate/validate";

export class SignUp {
    /**
     * Constructor for SignUp page object
     * @param {any} parent - parent object
     * @param {string} name - name of the page
     */
    constructor(parent, name) {
        this.parentItem = parent;
        this.name = name;
        this.htmlElement = null;
        this.errorsElement = null;
    }

    /**
     * Renders signup page
     * @returns {HTMLElement} html element of the page
     */
    render() {
        this.formObj = new SignUpForm(this);
        this.htmlElement = this.formObj.render();
        this.errorsElement = new EmptyContainer('form-errors').render();
        this.htmlElement.appendChild(this.errorsElement);

        this.htmlElement.addEventListener('submit', (e) => {
            e.preventDefault();
            this.errorsElement.textContent = '';

            const loginField = this.formObj.form.getFieldByName('login');
            
            let error = validateLogin(loginField.value);
            let isValid = true;
            if (error != null) {
                isValid = false;
                loginField.classList.add('invalid');
                this.formObj.form.getErrorFieldByInputName('login').textContent = error;
            } else {
                loginField.classList.remove('invalid');
                loginField.classList.add('valid');
                this.formObj.form.getErrorFieldByInputName('login').textContent = '';
            }
            
            const passwordField = this.formObj.form.getFieldByName('password');
            error = validatePassword(passwordField.value);
            if (error != null) {
                isValid = false;
                passwordField.classList.add('invalid');
                this.formObj.form.getErrorFieldByInputName('password').textContent = error;
            } else {
                passwordField.classList.remove('invalid');
                passwordField.classList.add('valid');
                this.formObj.form.getErrorFieldByInputName('password').textContent = '';
            }

            if (isValid) {
                const formEl = document.getElementsByClassName('signup-form')[0];
                ajaxMultipartForm('POST', '/api/auth/signup', formEl, (status, msg, msgrus) => {
                    if (status === 200) {
                        this.parentItem.goToPage('main');
                        return;
                    }
                    this.errorsElement.textContent = msgrus;
                })
            }
        })

        return this.htmlElement;
    }
}