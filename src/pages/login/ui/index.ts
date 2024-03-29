import './style.scss';
import { LoginFormCard } from '@/widgets/loginFormCard';
import { EmptyContainer } from '@/shared/uikit/emptyContainer';
import { WithNavbar } from '@/widgets/layout';

export class Login extends EmptyContainer {
    parentItem: WithNavbar;
    name: string;
    errorsElement: HTMLDivElement;
    formObj: LoginFormCard;

    /**
     * Constructor for Login page object
     * @param {Element} parent - parent object
     * @param {string} name - name of the page
     */
    // TODO parent: Element
    constructor(parent: WithNavbar, name: string) {
        super(parent.contentElement, { className: 'login-page' });

        this.parentItem = parent;
        this.name = name;
        this.errorsElement = null;
    }

    /**
     * Renders login page
     */
    // eslint-disable-next-line max-lines-per-function
    render() {
        // TODO parentItem.htmlElement -> parent
        super.render();

        this.formObj = new LoginFormCard(this.htmlElement, this.parentItem, {
            className: 'login-form-card-main',
        });
        this.formObj.render();
    }
}
