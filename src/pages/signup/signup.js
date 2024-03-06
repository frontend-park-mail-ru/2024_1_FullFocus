import { ajaxMultipartForm } from "../../shared/api/ajax";
import { SignUpForm } from "../../widgets/signupForm/signupForm";
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

            const formEl = document.getElementsByClassName('signup-form')[0];

            ajaxMultipartForm('POST', '/api/auth/signup', formEl, (status, msg, msgrus) => {
                if (status === 200) {
                    this.parentItem.goToPage('main');
                    return;
                }
                this.errorsElement.textContent = msgrus;

            })
        })

        return this.htmlElement;
    }
}