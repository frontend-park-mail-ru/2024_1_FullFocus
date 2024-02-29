import { ajax } from "../../shared/api/ajax";
import { LoginForm } from "../../widgets/components/forms/loginForm/loginForm";
// import { createInput } from "../../shared/lib/createInput";

export class Login {
    constructor(parent, name) {
        this.parentItem = parent;
        this.name = name;
        this.htmlElement = null;
    }

    render() {
        this.htmlElement = document.createElement('div');
        const formObj = new LoginForm(this);
        formObj.render();

        this.htmlElement.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = this.htmlElement.querySelector('#emailLogin');
            const email = emailInput.value.trim();
            const passwordInput = this.htmlElement.querySelector('#passwordLogin');
            const password = passwordInput.value;

            ajax('POST', '/login', {password: password, email: email}, (status) => {
                if (status === 200) {
                    this.parentItem.goToPage('profile');
                    return;
                }

                alert('error');
            })
        })

        // this.htmlElement = form;
        this.parentItem.addChild(this.htmlElement);
    }
}
