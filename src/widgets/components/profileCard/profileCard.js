import profileCardTmpl from './profileCard.pug'

export class ProfileCard {
    constructor(parent, email, age) {
        this.parentItem = parent;
        this.email = email;
        this.age = age;
    }

    render() {
        const component = profileCardTmpl({email: this.email, age: this.age});
        this.parentItem.htmlElement.insertAdjacentHTML('beforeend', component);
    }
}
