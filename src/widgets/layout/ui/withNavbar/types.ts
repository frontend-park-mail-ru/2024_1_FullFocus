import { Component } from '@/shared/@types/component';
import { NavbarLink } from './navbarLink';

export interface PageItems {
    [name: string]: Component<Element, { className: string }>;
}

export interface NavbarLinkItems {
    [name: string]: NavbarLink;
}
