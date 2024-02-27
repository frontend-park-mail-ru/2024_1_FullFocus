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
            text: 'Ozon',
            render: renderDefault
        },
        login: {
            href: '/login',
            text: 'Авторизация',
            render: renderLogin
        },
        signup: {
            href: '/signup',
            text: 'Регистрация',
            render: renderSignup
        },
        profile: {
            href: '/me',
            text: 'Профиль',
            render: renderDefault
        }
    }
};

const state = {
    activeMenuItem: null,
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
            state.activeMenuItem = menuItemElement;
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

function renderLogin() {
    const form = document.createElement('form');

    const emailInput = createInput('email', 'Почта', 'email');
    const passwordInput = createInput('password', 'Пароль', 'password');

    const submitBtn = document.createElement('input');
    submitBtn.type = 'submit';
    submitBtn.value = 'Войти';

    form.appendChild(emailInput);
    form.appendChild(passwordInput);
    form.appendChild(submitBtn);

    return form;
}

function renderSignup() {
    
    const form = document.createElement('form');

    const emailInput = createInput('email', 'Почта', 'email');
    const passwordInput = createInput('password', 'Пароль', 'password');
    const ageInput = createInput('num', 'Возраст', 'age');

    const submitBtn = document.createElement('input');
    submitBtn.type = 'submit';
    submitBtn.value = 'Зарегистрироваться';

    form.appendChild(emailInput);
    form.appendChild(passwordInput);
    form.appendChild(ageInput);
    form.appendChild(submitBtn);

    return form;
}

function renderDefault() {
    const container = document.createElement('div');
    return container;
}

menuElement.addEventListener('click', (e) => {
    const {target} = e;

    if (target.tagName.toLowerCase() === 'a') {
        e.preventDefault();
        
        contentElement.innerHTML = '';

        state.activeMenuItem.classList.remove('active');
        e.target.classList.add('active');
        state.activeMenuItem = e.target;

        const element = config.menu[target.dataset.section].render();
        contentElement.appendChild(element);
    }
})
