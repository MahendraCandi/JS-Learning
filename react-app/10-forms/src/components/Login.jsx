// about form and submit button default behavior:
// by default a form will submit HTTP request to the server.
// this request will have a GET method.
// also the default behavior all the input will be sent as query parameter.
// the target server is the root of the domain.
// to solve this problem we can:
// 1. change the type into button, because the default type is submit
// 2. add onSubmit attribute in tag form and pass event attribute to prevent default behaviour
import {Input} from "./Input.jsx";
import {useState} from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: {
      value: '',
      isValid: false,
      validator: (value) => value.length > 0 && value.includes('@')
    },
    password: {
      value: '',
      isValid: false,
      validator: (value) => value.length > 0
    }
  });
  const [isFormValid, setIsFormValid] = useState(null);

  const handleChange = (identifier, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [identifier]: {
        ...prevState[identifier],
        value
      }
    }));
  }

  const submitHandler = (event) => {
    event.preventDefault();

    const isValid = Object.values(formData).every(field => field.isValid);
    if (!isValid) {
      console.log("Form is not valid!");
      setIsFormValid(false);
      return;
    }

    console.log("Submitted!");
    console.log(formData.email.value, formData.password.value);
  }

  const validateValue = (identifier, value) => {
    setFormData(
      (prevState) => ({
        ...prevState,
        [identifier]: {
          ...prevState[identifier],
          isValid : prevState[identifier].validator(value)
        }
      })
    )
  }

  return (
    <form onSubmit={submitHandler}>
      <h2>Login</h2>

      <div className="control-row">
        <Input identifier="email"
               label="Email"
               handleChange={handleChange}
               handleInputBlur={validateValue}
               isValid={formData.email.isValid}
               errorMessage={"Please enter a valid email"}
              value={formData.email.value}
        />
        <Input identifier="password"
               label="Password"
               handleChange={handleChange}
               handleInputBlur={validateValue}
               isValid={formData.password.isValid}
               errorMessage={"Please enter a valid password"}
               type="password"
               value={formData.password.value}
        />
      </div>
      <div className="control-error">
        {isFormValid !== null && !isFormValid && <p>Form not valid!</p>}
      </div>
      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
