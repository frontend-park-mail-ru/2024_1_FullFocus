/**
 * Creates input field
 * @param {string} type - field type
 * @param {string} text - placeholder
 * @param {string} name - field html name attribute
 * @returns input field
 */
export function createInput(type, text, name) {
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.placeholder = text;

    return input;
}
