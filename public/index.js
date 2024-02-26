console.log('epic');

const rootElement = document.getElementById('root');

const menuElement1 = document.createElement('a');
menuElement1.href = '/';
menuElement1.textContent = 'Ozon';

const menuLogin = document.createElement('a');
menuLogin.href = '/login';
menuLogin.textContent = 'Авторизация';

const menuRegister = document.createElement('a');
menuRegister.href = '/signup';
menuRegister.textContent = 'Регистрация';

rootElement.appendChild(menuElement1);
rootElement.appendChild(menuLogin);
rootElement.appendChild(menuRegister);
