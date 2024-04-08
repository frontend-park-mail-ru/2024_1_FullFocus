import pageTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { LogOutPageProps } from './index.types';

export class Page404 extends Component<HTMLDivElement, LogOutPageProps> {
    /**
     * Constructor for LogOut page object
     * @param {any} parent - parent object
     * @param {string} name - name of the page
     */
    constructor(parent: Element) {
        super(parent, pageTmpl, {
            className: 'page-404',
        });
    }
}
