// Init
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
            render: renderMain
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
            render: renderProfile
        }
    }
};

const state = {
    activeMenuItem: null,
    menuElements: {},
};


// Helpful functions
function ajax(method, url, body = null, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState != XMLHttpRequest.DONE) return;
        callback(xhr.status, xhr.responseText);
    })

    if (body) {
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf8');
        xhr.send(JSON.stringify(body));
        return;
    }

    xhr.send();
}

function createInput(type, text, name) {
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.placeholder = text;

    return input;
}

function goToPage(menuElement) {
    contentElement.innerHTML = '';

    state.activeMenuItem.classList.remove('active');
    menuElement.classList.add('active');
    state.activeMenuItem = menuElement;

    const element = config.menu[menuElement.dataset.section].render();
    contentElement.appendChild(element);
}

// Render functions
function renderMenu() {
    Object
        .entries(config.menu)
        .forEach(([key, { href, text }], index) => {
            const menuItemElement = document.createElement('a');
            menuItemElement.href = href;
            menuItemElement.textContent = text;
            menuItemElement.dataset.section = key;

            if (index === 0) {
                menuItemElement.classList.add('active');
                state.activeMenuItem = menuItemElement;
            }

            menuElement.appendChild(menuItemElement);

            state.menuElements[key] = menuItemElement;
        });
    
    menuElement.addEventListener('click', (e) => {
        const { target } = e;

        if (target.tagName.toLowerCase() === 'a') {
            e.preventDefault();

            goToPage(e.target);
        }
    })
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

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        ajax('POST', '/login', {password: password, email: email}, (status) => {
            if (status === 200) {
                goToPage(state.menuElements.profile);
                return;
            }

            alert('error');
        })
    })

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

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const age = ageInput.value.trim();

        ajax('POST', '/signup', {email: email, password: password, age: age}, (status) => {
            if (status === 200) {
                goToPage(state.menuElements.profile);
                return;
            }

            alert('error');
        })
    })

    return form;
}

function renderProfile() {
    const profileElement = document.createElement('div');

    ajax('GET', '/me', null, (status, responseString) => {
        const isAuthorized = status === 200;

        if (!isAuthorized) {
            goToPage(state.menuElements.login);
            return;
        }

        const { email, age } = JSON.parse(responseString);
        const span = document.createElement('span');
        span.textContent = `Почта ${email} возраст ${age}`;

        profileElement.appendChild(span);
    })

    return profileElement;
}

function renderMain() {
    const feedElement = document.createElement('div');

    ajax('GET', '/feed', null, (status, responseString) => {
        const products = JSON.parse(responseString);
        if (products && Array.isArray(products)) {
            const div = document.createElement('div');
            feedElement.appendChild(div);

            products.forEach(({name, cost}) => {
                const prodPara = document.createElement('p');
                prodPara.innerText = `${name} - ${cost} руб.`;
                div.appendChild(prodPara);
            })
        }
    })

    return feedElement;
}

function renderDefault() {
    const container = document.createElement('div');
    return container;
}

renderMenu();
goToPage(state.menuElements.main)
