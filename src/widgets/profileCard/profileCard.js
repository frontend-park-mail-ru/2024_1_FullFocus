import profileCardTmpl from './profileCard.pug'
import { domFromHtml } from '../../shared/lib/domFromHtml/domFromHtml';

export class ProfileCard {
    /**
     * Constructor for ProfileCard 
     * @param {any} parent - parent object
     * @param {string} email - user's email 
     */
    constructor(parent, email) {
        this.parentItem = parent;
        this.email = email;
    }

    /**
     * Renders profile card
     * @returns {HTMLElement} rendered html element
     */
    render() {
        const component = profileCardTmpl({email: this.email});
        return domFromHtml(component);
    }
}
