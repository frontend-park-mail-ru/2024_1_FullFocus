import { Main } from '@/pages/main';
import { Login } from '@/pages/login';
import { SignUp } from '@/pages/signup';
import { LogOut } from '@/pages/logout';
import { Page } from '@/providers';
import { Component } from '@/shared/@types/component';
import { NavbarLinkProps } from '@/widgets/navbar/ui/navbarLink/types';
import { UserLogged } from '@/widgets/navbar/ui/types';

function createConfig(parent: Element) {
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

export function getConfig(parent: Element) {
    const config = createConfig(parent);

    const routerConfig: { [name: string]: Page } = {};
    const navbarConfig: {
        [name: string]: { props: NavbarLinkProps; logged: UserLogged };
    } = {};

    Object.entries(config).forEach(([name, item]) => {
        routerConfig[name] = {
            url: item.url,
            navigation: item.router.navigation ?? null,
            component: item.router.component,
        };

        navbarConfig[name] = {
            props: {
                className: item.navbarLink.className,
                text: item.navbarLink.text,
                href: item.url,
            },
            logged: item.navbarLink.logged,
        };
    });

    return { routerConfig, navbarConfig };
}
