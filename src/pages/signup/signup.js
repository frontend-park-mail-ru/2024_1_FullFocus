import { ajax } from "../../shared/api/ajax";
import { SignUpForm } from "../../widgets/components/forms/signupForm/signupForm";

export class SignUp {
    constructor(parent, name) {
        this.parentItem = parent;
        this.name = name;
        this.htmlElement = null;
    }

    render() {
        this.htmlElement = document.createElement('div');
        const formObj = new SignUpForm(this);
        formObj.render();

        this.htmlElement.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = this.htmlElement.querySelector('#emailSignup');
            const email = emailInput.value.trim();
            const passwordInput = this.htmlElement.querySelector('#passwordSignup');
            const password = passwordInput.value;
            const ageInput = this.htmlElement.querySelector('#ageSignup');
            const age = ageInput.value.trim();

            ajax('POST', '/signup', {email: email, password: password, age: age}, (status) => {
                if (status === 200) {
                    this.parentItem.goToPage('profile');
                    return;
                }

                alert('error');
            })
        })

        this.parentItem.addChild(this.htmlElement);
    }
}