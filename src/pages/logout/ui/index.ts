import pageTmpl from './template.pug';
import { logoutUser } from '@/features/auth';
import { Component } from '@/shared/@types/component';
import { LogOutPageProps } from './types';

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

        logoutUser()
            .then(() => {
                this.props.navigateToMain();
            })
            .catch(() => {});
    }
}
