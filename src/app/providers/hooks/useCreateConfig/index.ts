/* eslint-disable multiline-comment-style */
/* eslint-disable max-lines-per-function */
import { Main } from '@/pages/main';
import { Login } from '@/pages/login';
import { SignUp } from '@/pages/signup';
import { LogOut } from '@/pages/logout';
import { Component } from '@/shared/@types/index.component';
import { UserLogged } from '@/widgets/navbar';
import { Profile } from '@/pages/profile';
import { CartPage } from '@/pages/cart';
import { Page404 } from '@/pages/404';

interface ConfigItem {
    // User login status
    logged: UserLogged;
    // URL to the page
    url: string;
    // Props for navbarlink
    navbarLink?: {
        className: string;
        text: string;
    };
    // Children
    children?: {
        default?: string;
        pages: {
            [name: string]: {
                url: string;
                renderChild: (
                    pageComponent: Component<Element>,
                    params?: { [name: string]: string },
                ) => void;
            };
        };
    };
    // Router params
    router: {
        // Update functions
        update?: {
            // Update with query params
            updateParams: (
                page: Component<Element>,
                params: { [name: string]: string },
            ) => void;
            // Update to default state
            updateDefault: (page: Component<Element>) => void;
        };
        // To which pages navigation is needed
        navigation?: Array<string>;
        // Function to create a component
        component: (
            parent: Element,
            params: { [name: string]: string },
            ...redirect: Array<() => void>
        ) => Component<Element>;
    };
}

export function createConfig() {
    const config: {
        page404: (parent: Element) => Component<Element>;
        pages: {
            [name: string]: ConfigItem;
        };
    } = {
        page404: (parent: Element) => {
            return new Page404(parent);
        },
        pages: {
            main: {
                url: '/',
                logged: 'both',
                navbarLink: {
                    className: 'navbar-link-main',
                    text: 'Главная',
                },
                router: {
                    update: {
                        updateParams: (
                            page: Main,
                            params: { [name: string]: string },
                        ) => {
                            page.updateWithParams(params);
                        },
                        updateDefault: (page: Main) => {
                            page.updateDefault();
                        },
                    },
                    navigation: ['cart'],
                    component: (
                        parent: Element,
                        params: { [name: string]: string },
                        navigateToCart: () => void,
                    ) => {
                        return new Main(parent, navigateToCart, params);
                    },
                },
            },
            login: {
                url: '/login',
                logged: 'unlogged',
                navbarLink: {
                    className: 'navbar-link-login',
                    text: 'Войти',
                },
                router: {
                    navigation: ['main'],
                    component: (
                        parent: Element,
                        params: { [name: string]: string },
                        navigateToMain: () => void,
                    ) => {
                        return new Login(parent, navigateToMain);
                    },
                },
            },
            signup: {
                url: '/signup',
                logged: 'unlogged',
                navbarLink: {
                    className: 'navbar-link-signup',
                    text: 'Регистрация',
                },
                router: {
                    navigation: ['main'],
                    component: (
                        parent: Element,
                        params: { [name: string]: string },
                        navigateToMain: () => void,
                    ) => {
                        return new SignUp(parent, navigateToMain);
                    },
                },
            },
            cart: {
                url: '/cart',
                logged: 'logged',
                navbarLink: {
                    className: 'navbar-link-cart',
                    text: 'Корзина',
                },
                router: {
                    navigation: ['main', 'profile-orders'],
                    component: (
                        parent: Element,
                        params: { [name: string]: string },
                        navigateToMain: () => void,
                        navigateToOrderPage: () => void,
                    ) => {
                        return new CartPage(
                            parent,
                            navigateToMain,
                            navigateToOrderPage,
                        );
                    },
                },
            },
            profile: {
                url: '/profile',
                logged: 'logged',
                router: {
                    component: (parent: Element) => {
                        return new Profile(parent);
                    },
                },
                children: {
                    default: 'info',
                    pages: {
                        info: {
                            url: '/info',
                            renderChild: (profilePage: Profile) => {
                                profilePage.changePage('info');
                            },
                        },
                        orders: {
                            url: '/orders',
                            renderChild: (profilePage: Profile) => {
                                profilePage.changePage('orders');
                            },
                        },
                        order: {
                            url: '/order',
                            renderChild: (
                                profilePage: Profile,
                                params: { [name: string]: string },
                            ) => {
                                profilePage.changePage('oneOrder', params);
                            },
                        },
                    },
                },
                navbarLink: {
                    className: 'navbar-link-profile',
                    text: 'Профиль',
                },
            },

            logout: {
                url: '/logout',
                logged: 'logged',
                navbarLink: {
                    className: 'navbar-link-logout',
                    text: 'Выйти',
                },
                router: {
                    navigation: ['main'],
                    component: (
                        parent: Element,
                        params: { [name: string]: string },
                        navigateToMain: () => void,
                    ) => {
                        return new LogOut(parent, navigateToMain);
                    },
                },
            },
        },
    };

    return config;
}
