import { ajax } from "../../shared/api/ajax";
import { LoginForm } from "../../widgets/components/loginForm/loginForm";
import { EmptyContainer } from "../../shared/uikit/emptyContainer/emptyContainer";

export class Login {
    constructor(parent, name) {
        this.parentItem = parent;
        this.name = name;
        this.htmlElement = null;
        this.formObj = null;
        this.errorsElement = null;
    }

    render() {
        this.formObj = new LoginForm(this);
        this.htmlElement = this.formObj.render();
        this.errorsElement = new EmptyContainer('form-errors').render();
        this.htmlElement.appendChild(this.errorsElement);

        this.htmlElement.addEventListener('submit', (e) => {
            e.preventDefault();
            this.errorsElement.textContent = '';
            const emailInput = this.formObj.emailElement();
            const email = emailInput.value.trim();
            const passwordInput = this.formObj.passwordElement();
            const password = passwordInput.value;

            ajax('POST', '/login', {password: password, email: email}, (status) => {
                if (status === 200) {
                    this.parentItem.goToPage('profile');
                    return;
                }

                this.errorsElement.textContent = 'Введены неверные почта или пароль'
            })
        })

        return this.htmlElement;
    }
}
