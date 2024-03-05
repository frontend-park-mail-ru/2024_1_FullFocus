export function validateText(fieldElement) {
    const text = fieldElement.value;
    return /^[a-zA-Z0-9_.]{8,20}$/.test(text);
}
