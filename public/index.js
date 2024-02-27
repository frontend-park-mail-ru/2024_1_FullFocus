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
        },
        profile: {
            href: '/me',
            text: 'Профиль'
        }
    }
};

Object
    .entries(config.menu)
    .forEach(([key, {href, text}], index) => {
        const menuItemElement = document.createElement('a');
        menuItemElement.href = href;
        menuItemElement.textContent = text;
        menuItemElement.dataset.section = key;

        if (index === 0) {
            menuItemElement.classList.add('active');
        }

        menuElement.appendChild(menuItemElement);
    });


function createInput(type, text, name) {
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.placeholder = text;

    return input;
}

const loginMenuItem = menuElement.querySelector('[data-section="login"]');
loginMenuItem.addEventListener('click', (e) => {
    e.preventDefault();

    contentElement.innerHTML = '';

    document.querySelector('.active').classList.remove('active');
    e.target.classList.add('active');

    const form = document.createElement('form');

    const emailInput = createInput('email', 'Почта', 'email');
    const passwordInput = createInput('password', 'Пароль', 'password');

    const submitBtn = document.createElement('input');
    submitBtn.type = 'submit';
    submitBtn.value = 'Войти';

    form.appendChild(emailInput);
    form.appendChild(passwordInput);
    form.appendChild(submitBtn);

    contentElement.appendChild(form);
})

