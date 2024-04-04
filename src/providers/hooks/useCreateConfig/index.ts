import { Main } from '@/pages/main';
import { Login } from '@/pages/login';
import { SignUp } from '@/pages/signup';
import { LogOut } from '@/pages/logout';
import { Component } from '@/shared/@types/index.component';
import { UserLogged } from '@/widgets/navbar/ui/index.types';
import { Profile } from '@/pages/profile';

export function createConfig(parent: Element) {
    const config: {
        [name: string]: {
            url: string;
            navbarLink: {
                className: string;
                text: string;
                logged: UserLogged;
            };
            router: {
                navigation?: string;
                component: (redirect?: () => void) => Component<Element>;
            };
        };
    } = {
        main: {
            url: '/',
            navbarLink: {
                className: 'navbar-link-main',
                text: 'Главная',
                logged: 'both',
            },
            router: {
                component: () => {
                    return new Main(parent);
                },
            },
        },
        login: {
            url: '/login',
            navbarLink: {
                className: 'navbar-link-login',
                text: 'Войти',
                logged: 'unlogged',
            },
            router: {
                navigation: 'main',
                component: (navigateToMain: () => void) => {
                    return new Login(parent, navigateToMain);
                },
            },
        },
        signup: {
            url: '/signup',
            navbarLink: {
                className: 'navbar-link-signup',
                text: 'Регистрация',
                logged: 'unlogged',
            },
            router: {
                navigation: 'main',
                component: (navigateToMain: () => void) => {
                    return new SignUp(parent, navigateToMain);
                },
            },
        },
        profile: {
            url: '/profile',
            navbarLink: {
                className: 'navbar-link-profile',
                text: 'Профиль',
                logged: 'logged',
            },
            router: {
                component: () => {
                    return new Profile(parent);
                },
            },
        },
        logout: {
            url: '/logout',
            navbarLink: {
                className: 'navbar-link-logout',
                text: 'Выйти',
                logged: 'logged',
            },
            router: {
                navigation: 'main',
                component: (navigateToMain: () => void) => {
                    return new LogOut(parent, navigateToMain);
                },
            },
        },
    };

    return config;
}
