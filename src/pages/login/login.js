import { ajaxMultipartForm } from "../../shared/api/ajax";
import { LoginForm } from "../../widgets/loginForm/loginForm";
import { EmptyContainer } from "../../shared/uikit/emptyContainer/emptyContainer";
import { validateLogin, validatePassword } from "../../shared/lib/validate/validate";

export class Login {
    /**
     * Constructor for Login page object
     * @param {any} parent - parent object
     * @param {string} name - name of the page
     */
    constructor(parent, name) {
        this.parentItem = parent;
        this.name = name;
        this.htmlElement = null;
        this.formObj = null;
        this.errorsElement = null;
    }

    /**
     * Renders login page
     * @returns {HTMLElement} html element of the page
     */
    render() {
        this.formObj = new LoginForm(this);
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
                loginField.classList.add('valid');
                this.formObj.form.getErrorFieldByInputName('password').textContent = '';
            }

            if (isValid) {
                ajaxMultipartForm('POST', '/api/auth/login', this.formEl, (status, msg, msgrus) => {
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
