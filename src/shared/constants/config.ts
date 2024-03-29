type UserLogged = 'logged' | 'unlogged' | 'both';

type Config = {
    [segment: string]: {
        [page: string]: {
            href: string;
            text: string;
            name: string;
            userLogged: UserLogged;
        };
    };
};

export const config: Config = {
    menu: {
        main: {
            href: '/',
            text: 'Главная',
            name: 'main',
            userLogged: 'both',
        },
        login: {
            href: '/login',
            text: 'Авторизация',
            name: 'login',
            userLogged: 'unlogged',
        },
        signup: {
            href: '/signup',
            text: 'Регистрация',
            name: 'signup',
            userLogged: 'unlogged',
        },
        profile: {
            href: '/me',
            text: 'Профиль',
            name: 'profile',
            userLogged: 'logged',
        },
        logout: {
            href: '/isLoggedIn',
            text: 'Выйти',
            name: 'logout',
            userLogged: 'logged',
        },
    },
};
