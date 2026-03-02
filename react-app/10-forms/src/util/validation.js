export function isEmail(value) {
  const isValid = value.includes('@');
  return {isValid, message: isValid ? undefined : 'Please enter a valid email address'};
}

export function isNotEmpty(value) {
  const isValid = value.trim() !== '';
  return {isValid, message: isValid ? '' : 'Cannot be empty'};
}

export function hasMinLength(value, minLength) {
  return value.length >= minLength;
}

export function isEqualsToOtherValue(value, otherValue) {
  return value === otherValue;
}
