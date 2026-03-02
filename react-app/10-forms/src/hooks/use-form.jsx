import {useState} from "react";

/**
 * Example parameters:
 * <code>
 *   useForm({
 *     email: '',
 *     password: '',
 *   }, {
 *     email: (value) => isNotEmpty(value) && isEmail(value),
 *     password: (value) => hasMinLength(value, 6),
 *   });
 * @param initialValues
 * @param validator
 */
export function useForm(initialValues, validator) {
  const [formData, setFormData] = useState(Object.fromEntries(
    Object.entries(initialValues)
      .map(([key, value]) =>
        [key, {
          value: value,
        }]
      )
  ));

  const [errorMessages, setErrorMessages] = useState(
    Object.fromEntries(
      Object.entries(initialValues)
        .map(([key]) => [key, []])
    )
  );
  const [validators, setValidators] = useState(validator);

  const handleChange = (identifier, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [identifier]: {
        ...prevState[identifier],
        value
      }
    }));
  }

  const clearErrorMessages = (identifier) => {
    // clear error messages for a specific identifier
    setErrorMessages(prevState => ({
      ...prevState,
      [identifier]: []
    }));
  }

  const validateInput = (identifier, value) => {
    const {isValid, message} = validators[identifier](value);
    if (isValid) {
      clearErrorMessages(identifier);
    } else {
      setErrorMessages(prevState => ({
        ...prevState,
        [identifier]:
          Array.from(new Set([...prevState[identifier], message])),
      }));
    }

    return isValid;
  }

  const validateAllInput = () => {
    return Object.keys(validators).map((key) => {
      const value = formData[key].value;
      return validateInput(key, value);
    }).every(value => value === true);
  };

  const anyError = Object.values(errorMessages)
    .every(values => values.length > 0);

  const form = {
    handleChange, validateInput, validateAllInput, anyError, clearErrorMessages
  }

  return {form, formData, errorMessages};
}
