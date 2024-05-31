import userInfoTmpl from './index.template.pug';
import './index.style.scss';
import { Component } from '@/shared/@types/index.component';
import { UserInfoProps } from './index.types';

export class UserInfo extends Component<HTMLDivElement, UserInfoProps> {
    constructor(parent: Element, props: UserInfoProps) {
        super(parent, userInfoTmpl, props);
    }
}
