import profileCardTmpl from './profileCard.pug'
import { domFromHtml } from '../../shared/lib/domFromHtml/domFromHtml';

export class ProfileCard {
    constructor(parent, email) {
        this.parentItem = parent;
        this.email = email;
    }

    render() {
        const component = profileCardTmpl({email: this.email});
        return domFromHtml(component);
    }
}
