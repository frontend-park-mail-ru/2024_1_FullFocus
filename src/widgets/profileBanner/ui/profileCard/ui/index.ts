import profileCardTmpl from './index.template.pug';
import './index.style.scss';
import { Component } from '@/shared/@types/index.component';
import { ProfileCardProps } from './index.types';

export class ProfileCard extends Component<HTMLDivElement, ProfileCardProps> {
    constructor(parent: Element, props: ProfileCardProps) {
        super(parent, profileCardTmpl, props);
    }
}
