/**
 * Validates Password fields
 * @param {HTMLElement} fieldElement - element to validate
 * @returns {boolean} true if input is correct, false if it's not
 */
export function validatePassword(fieldElement) {
    const password = fieldElement.value;
    return /^.{10,30}$/.test(password);
}
