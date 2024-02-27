console.log('epic');

const rootElement = document.getElementById('root');

const config = {
    menu: {
        main: {
            href: '/',
            text: 'Ozon'
        },
        login: {
            href: '/login',
            text: 'Авторизация'
        },
        signup: {
            href: '/signup',
            text: 'Регистрация'
        }
    }
};

Object
    .entries(config.menu)
    .forEach(([key, {href, text}]) => {
        const menuElement = document.createElement('a');
        menuElement.href = href;
        menuElement.textContent = text;

        rootElement.appendChild(menuElement);
    });
