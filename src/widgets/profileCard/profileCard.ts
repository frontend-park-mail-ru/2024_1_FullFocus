import profileCardTmpl from './profileCard.pug';

export class ProfileCard {
    parent: Element;

    /**
     * Constructor for ProfileCard
     * @param {Element} parent - parent object
     */
    constructor(parent: Element) {
        this.parent = parent;
    }

    /**
     * Renders profile card
     */
    render() {
        const component = profileCardTmpl();
        this.parent.insertAdjacentHTML('beforeend', component);
    }
}
