import { Component } from '@/shared/@types/index.component';

export interface RouterConfig {
    page404: () => Component<Element>;
    pages: { [name: string]: Page };
}

type UserLogged = 'logged' | 'unlogged' | 'both';

export interface Page {
    url: string;
    navigation: string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: (...args: any) => Component<Element>;
    logged: UserLogged;
}
