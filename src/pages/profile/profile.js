import { ajax } from "../../shared/api/ajax";
import { ProfileCard } from "../../widgets/components/profileCard/profileCard";

export class Profile {
    constructor(parent, name) {
        this.parentItem = parent;
        this.name = name;
        this.htmlElement = null;
    }

    render() {
        this.htmlElement = document.createElement('div');

        ajax('GET', '/me', null, (status, responseString) => {
            const isAuthorized = status === 200;

            if (!isAuthorized) {
                this.parentItem.goToPage('login');
                return;
            }

            const { email, age } = JSON.parse(responseString);
            const profileCardObj = new ProfileCard(this, email, age);
            profileCardObj.render();
        })

        this.parentItem.addChild(this.htmlElement);
    }
}
