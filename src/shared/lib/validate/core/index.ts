/**
 * Validates login
 * @param {string} login - login string to validate
 * @returns {string|null} message if login is wrong or null if everything is fine
 */
export function validateLogin(login: string): string | null {
    if (!/^[a-zA-Z0-9]{4,32}$/.test(login)) {
        return 'логин должен содержать от 4 до 32 букв английского алфавита или цифр';
    }
    return null;
}

/**
 * Validates password
 * @param {string} password - password string to validate
 * @returns {string|null} message if password is wrong or null if everything is fine
 */
export function validatePassword(password: string): string | null {
    if (!/^[a-zA-Z0-9]{8,32}$/.test(password)) {
        return 'пароль должен содержать от 8 до 32 букв английского алфавита или цифр';
    }
    return null;
}

export function validateEmail(password: string): string | null {
    if (!/^[a-zA-Z0-9_.]{1,16}@(mail|gmail|yandex)\.(com|ru)$/.test(password)) {
        return 'почта введена в неверном формате';
    }
    return null;
}

export function validatePhoneNumber(password: string): string | null {
    if (!/^[0-9]{11}$/.test(password)) {
        return 'номер телефона должен состоять из ровно 11 цифр';
    }
    return null;
}

export function validateRepeatPassword(
    password: string,
    repeatPassword: string,
): string | null {
    if (password !== repeatPassword) {
        return 'пароли должны совпадать';
    }
    return null;
}

export function validateDefault(sequence: string): string | null {
    if (sequence.length < 1) {
        return 'поле не должно быть пустым';
    }
    return null;
}

export function validateMaxInputLength(sequence: string): string | null {
    if (sequence.length >= 500) {
        return 'поле не должно иметь более пятисот символов';
    }
    return null;
}

export function validateMark(sequence: string): string | null {
    if (
        parseInt(sequence) < 1 ||
        parseInt(sequence) > 5 ||
        isNaN(parseInt(sequence))
    ) {
        return 'поле должно быть цифрой от 1 до 5';
    }

    if (sequence.length < 1) {
        return 'поле не должно быть пустым';
    }
    return null;
}
