export function validation(validateInput) {
    let isvalid = true;
    if (validateInput.required) {
        isvalid = isvalid && validateInput.value.toString().trim().length > 0;
    }
    if (validateInput.maxLength != null &&
        typeof validateInput.value === "string") {
        isvalid =
            isvalid && validateInput.value.trim().length < validateInput.maxLength;
    }
    if (validateInput.minLength != null &&
        typeof validateInput.value === "string") {
        isvalid =
            isvalid && validateInput.value.trim().length > validateInput.minLength;
    }
    if (validateInput.max != null && typeof validateInput.value === "number") {
        isvalid = isvalid && validateInput.value <= validateInput.max;
    }
    if (validateInput.min != null && typeof validateInput.value === "number") {
        isvalid = isvalid && validateInput.value >= validateInput.min;
    }
    return isvalid;
}
//# sourceMappingURL=validation.js.map