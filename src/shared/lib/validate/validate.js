/**
 * Validates login
 * @param {string} login - login string to validate
 * @returns {string|null} message if login is wrong or null if everything is fine
 */
export function validateLogin(login) {
    if (!/^[a-zA-Z0-9]{4,32}$/.test(login)) {
        return 'логин должен содержать от 4 до 32 букв английского алфавита или цифр';
    }
    return null
}

/**
 * Validates password
 * @param {string} password - password string to validate 
 * @returns {string|null} message if password is wrong or null if everything is fine
 */
export function validatePassword(password) {
    if (!/^[a-zA-Z0-9]{8,32}$/.test(password)) {
        return 'пароль должен содержать от 8 до 32 букв английского алфавита или цифр';
    }
    return null
}
