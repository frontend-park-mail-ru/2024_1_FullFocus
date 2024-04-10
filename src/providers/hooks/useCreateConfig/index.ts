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
    logged: UserLogged;
    url: string;
    navbarLink?: {
        className: string;
        text: string;
    };
    router: {
        navigation?: Array<string>;
        component: (
            params: { [name: string]: string },
            ...redirect: Array<() => void>
        ) => Component<Element>;
    };
}

export function createConfig(parent: Element) {
    const config: {
        page404: () => Component<Element>;
        pages: {
            [name: string]: ConfigItem;
        };
    } = {
        page404: () => {
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
                    navigation: ['cart'],
                    component: (
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
                        params: { [name: string]: string },
                        navigateToMain: () => void,
                    ) => {
                        return new SignUp(parent, navigateToMain);
                    },
                },
            },
            profile: {
                url: '/profile',
                logged: 'logged',
                router: {
                    component: () => {
                        return new Profile(parent);
                    },
                },
            },
            profileInfo: {
                url: '/profile/info',
                logged: 'logged',
                navbarLink: {
                    className: 'navbar-link-profile',
                    text: 'Профиль',
                },
                router: {
                    component: () => {
                        return new Profile(parent, 'info');
                    },
                },
            },
            profileOrders: {
                logged: 'logged',
                url: '/profile/orders',
                router: {
                    component: () => {
                        return new Profile(parent, 'orders');
                    },
                },
            },
            profileOrder: {
                url: '/profile/order',
                logged: 'logged',
                router: {
                    component: (params: { [name: string]: string }) => {
                        return new Profile(parent, 'oneOrder', params);
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
                    navigation: ['main', 'profileOrders'],
                    component: (
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
