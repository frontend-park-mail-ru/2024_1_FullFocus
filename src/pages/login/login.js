import { ajaxMultipartForm } from "../../shared/api/ajax";
import { LoginForm } from "../../widgets/loginForm/loginForm";
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
            this.formEl = document.getElementsByClassName('login-form')[0];

            ajaxMultipartForm('POST', '/api/auth/login', this.formEl, (status, msg, msgrus) => {
                if (status === 200) {
                    this.parentItem.goToPage('main');
                    return;
                }
                console.error(msg);
                this.errorsElement.textContent = msgrus;
            })
        })

        return this.htmlElement;
    }
}
