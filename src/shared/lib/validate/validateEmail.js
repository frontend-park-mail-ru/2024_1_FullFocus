/**
 * Validates Email fields
 * @param {HTMLElement} fieldElement - element to validate
 * @returns {boolean} true if input is correct, false if it's not
 */
export function validateEmail(fieldElement) {
    const email = fieldElement.value;
    return /^[a-zA-Z0-9_.]+@(mail|gmail|yandex)\.(com|ru)$/.test(email);
}
