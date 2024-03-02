import { ajax } from "../../shared/api/ajax";
import { ProfileCard } from "../../widgets/components/profileCard/profileCard";
import { EmptyContainer } from "../../shared/uikit/emptyContainer/emptyContainer";

export class Profile {
    constructor(parent, name) {
        this.parentItem = parent;
        this.name = name;
        this.htmlElement = null;
    }

    render() {
        this.htmlElement = new EmptyContainer('profile-page').render();
        ajax('GET', '/me', null, (status, responseString) => {
            const isAuthorized = status === 200;

            if (!isAuthorized) {
                this.parentItem.goToPage('login');
                return;
            }

            const { email } = JSON.parse(responseString);
            const profileCardObj = new ProfileCard(this, email);
            this.htmlElement.appendChild(profileCardObj.render());
        })

        return this.htmlElement;
    }
}