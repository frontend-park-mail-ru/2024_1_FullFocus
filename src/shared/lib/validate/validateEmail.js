export function validateEmail(fieldElement) {
    const email = fieldElement.value;
    return /^[a-zA-Z0-9_.]+@(mail|gmail|yandex)\.(com|ru)$/.test(email);
}
