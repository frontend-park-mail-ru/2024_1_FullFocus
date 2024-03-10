/**
 * Validates Text fields
 * @param {HTMLElement} fieldElement - element to validate
 * @returns {boolean} true if input is correct, false if it's not
 */
export function validateText(fieldElement) {
    const text = fieldElement.value;
    return /^[a-zA-Z0-9_.]{8,20}$/.test(text);
}
