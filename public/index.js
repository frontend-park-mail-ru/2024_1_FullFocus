console.log('epic');

const rootElement = document.getElementById('root');
const menuElement = document.createElement('header');
const contentElement = document.createElement('main');

rootElement.appendChild(menuElement);
rootElement.appendChild(contentElement);

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
        const menuItemElement = document.createElement('a');
        menuItemElement.href = href;
        menuItemElement.textContent = text;

        menuElement.appendChild(menuItemElement);
    });
