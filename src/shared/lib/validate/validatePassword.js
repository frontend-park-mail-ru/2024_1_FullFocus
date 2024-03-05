export function validatePassword(fieldElement) {
    const password = fieldElement.value;
    return /^.{10,30}$/.test(password);
}
