export function validatePassword(fieldElement) {
    const password = fieldElement.value;
    return /^[a-zA-Z0-9-_@%]{10,20}$/.test(password);
}
