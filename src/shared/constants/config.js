export const config = {
    menu: {
        main: {
            href: '/',
            text: 'Главная',
            name: 'main',
            userLogged: null,
        },
        login: {
            href: '/login',
            text: 'Авторизация',
            name: 'login',
            userLogged: false,
        },
        signup: {
            href: '/signup',
            text: 'Регистрация',
            name: 'signup',
            userLogged: false,
        },
        profile: {
            href: '/me',
            text: 'Профиль',
            name: 'profile',
            userLogged: true,
        },
        logout: {
            href: '/isLoggedIn',
            text: 'Выйти',
            name: 'logout',
            userLogged: true,
        }
    }
}