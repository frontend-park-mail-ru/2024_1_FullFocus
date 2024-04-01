import './style.scss';
import { SignUpFormCard } from '@/widgets/signupFormCard';
import { EmptyContainer } from '@/shared/uikit/emptyContainer';
import { WithNavbar } from '@/widgets/layout';

export class SignUp extends EmptyContainer {
    parentItem: WithNavbar;
    name: string;
    formObj: SignUpFormCard;

    /**
     * Constructor for SignUp page object
     * @param {Element} parent - parent object
     * @param {string} name - name of the page
     */
    constructor(parent: WithNavbar, name: string) {
        super(parent.contentElement, { className: 'signup-page' });

        this.parentItem = parent;
        this.name = name;
    }

    /**
     * Renders signup page
     */
    render() {
        super.render();

        this.formObj = new SignUpFormCard(this.htmlElement, this.parentItem, {
            className: 'signup-form-card-main',
        });
        this.formObj.render();
    }
}
