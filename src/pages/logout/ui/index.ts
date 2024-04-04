import pageTmpl from './index.template.pug';
import { useLogoutUser } from '@/features/auth';
import { Component } from '@/shared/@types/index.component';
import { LogOutPageProps } from './index.types';

export class LogOut extends Component<HTMLDivElement, LogOutPageProps> {
    /**
     * Constructor for LogOut page object
     * @param {any} parent - parent object
     * @param {string} name - name of the page
     */
    constructor(parent: Element, navigateToMain: () => void) {
        super(parent, pageTmpl, {
            className: 'logout-page',
            navigateToMain: navigateToMain,
        });
    }

    /**
     * Renders logout page
     */
    protected render() {
        this.renderTemplate();

        useLogoutUser()
            .then(() => {
                this.props.navigateToMain();
            })
            .catch(() => {});
    }
}
