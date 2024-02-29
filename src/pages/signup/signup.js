import { ajax } from "../../shared/api/ajax";
import { SignUpForm } from '../../widgets/components/signupForm/signupForm'
import { EmptyContainer } from "../../shared/uikit/emptyContainer/emptyContainer";

export class SignUp {
    constructor(parent, name) {
        this.parentItem = parent;
        this.name = name;
        this.htmlElement = null;
        this.errorsElement = null;
    }

    render() {
        this.formObj = new SignUpForm(this);
        this.htmlElement = this.formObj.render();
        this.errorsElement = new EmptyContainer('form-errors').render();
        this.htmlElement.appendChild(this.errorsElement);

        this.htmlElement.addEventListener('submit', (e) => {
            e.preventDefault();
            this.errorsElement.textContent = '';

            const errorFields = this.formObj.validate();
            if (errorFields != null) {
                this.errorsElement.textContent = `Ошибки в полях: ${errorFields.join(', ')}`;
                return;
            }

            const emailInput = this.formObj.emailElement();
            const email = emailInput.value.trim();
            const passwordInput = this.formObj.passwordElement();
            const password = passwordInput.value;

            ajax('POST', '/signup', {email: email, password: password}, (status) => {
                if (status === 200) {
                    this.parentItem.goToPage('profile');
                    return;
                }

                alert('error');
            })
        })

        return this.htmlElement;
    }
}