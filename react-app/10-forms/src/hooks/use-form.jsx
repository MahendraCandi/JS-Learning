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
  const initiateForm = Object.fromEntries(
    Object.entries(initialValues)
      .map(([key, value]) =>
        [key, {
          value: value,
          isValid: false,
          validator: validator?.[key],
        }]
      )
  );

  const [formData, setFormData] = useState(initiateForm);

  const handleChange = (identifier, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [identifier]: {
        ...prevState[identifier],
        value
      }
    }));
  }

  const validateInput = (identifier, value) => {
    setFormData(
      (prevState) => (
        {
          ...prevState,
          [identifier]: {
            ...prevState[identifier],
            isValid: prevState[identifier].validator(value)
          }
        }
      )
    )
  }

  const validateAll = () => Object.values(formData).every(
    (value) => value.validator(value.value));

  const getValue = () => {
    return Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value.value])
    );
  }

  const form = {
    handleChange, validateInput, validateAll, getValue
  }

  return {form, formData};
}
