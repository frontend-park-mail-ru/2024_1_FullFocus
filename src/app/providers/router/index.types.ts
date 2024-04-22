import { Component } from '@/shared/@types/index.component';

export interface RouterConfig {
    page404: (parent: Element) => Component<Element>;
    pages: { [name: string]: Page };
}

type UserLogged = 'logged' | 'unlogged' | 'both';

export interface Page {
    url: string;
    logged: UserLogged;
    navigation?: string[];
    slugParamName?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component?: (...args: any) => Component<Element>;
    updateParams?: (
        page: Component<Element>,
        params: { [name: string]: string },
    ) => void;
    updateDefault?: (page: Component<Element>) => void;
    base?: string;
    renderChild?: (
        component: Component<Element>,
        params: { [name: string]: string },
    ) => void;
}
