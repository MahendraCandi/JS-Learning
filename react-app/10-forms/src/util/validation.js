export function isEmail(value) {
  const isValid = value.includes('@');
  return {isValid, message: isValid ? undefined : 'Please enter a valid email address'};
}

export function isNotEmpty(value) {
  const isValid = value.trim() !== '';
  return {isValid, message: isValid ? '' : 'Cannot be empty'};
}

export function hasMinLength(value, minLength) {
  const valid = value.length >= minLength;
  return {isValid: valid, message: valid ? '' : `Must be at least ${minLength} characters`}
}

export function isEqualsToOtherValue(value, otherValue) {
  return value === otherValue;
}

export function validators(...fns) {
  return (value) => {
    let isValidResult = [];
    let messages = [];
    fns.forEach(fn => {
      const {isValid, message} = fn(value);
      isValidResult.push(isValid);
      messages.push(message);
    })

    return {isValid: isValidResult.every(Boolean), messages};
  };
}
