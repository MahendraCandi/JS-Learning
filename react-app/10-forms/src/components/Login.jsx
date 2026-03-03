// about form and submit button default behavior:
// by default a form will submit HTTP request to the server.
// this request will have a GET method.
// also the default behavior all the input will be sent as query parameter.
// the target server is the root of the domain.
// to solve this problem we can:
// 1. change the type into button, because the default type is submit
// 2. add onSubmit attribute in tag form and pass event attribute to prevent default behaviour
import {Input} from "./Input.jsx";
import {hasMinLength, isEmail, isNotEmpty, validators} from "../util/validation.js";
import {useForm} from "../hooks/use-form.jsx";

export default function Login() {
  const {form, formData, errorMessages} = useForm(
    {
      email: '',
      password: '',
    },
    {
      email: validators(isNotEmpty, isEmail),
      password: validators(isNotEmpty, (v) => hasMinLength(v, 6)),
    });

  const submitHandler = (event) => {
    event.preventDefault();

    if (!form.validateAllInput()) {
      console.log("Form is not valid!");
      return
    }

    console.log("Submitted!");
  }

  return (
    <form onSubmit={submitHandler}>
      <h2>Login</h2>

      <div className="control-row">
        <Input identifier="email"
               label="Email"
               handleChange={form.handleChange}
               handleInputBlur={form.validateInput}
               errorMessages={errorMessages}
               clearErrorMessages={form.clearErrorMessages}
               value={formData.email}
        />
        <Input identifier="password"
               label="Password"
               handleChange={form.handleChange}
               handleInputBlur={form.validateInput}
               errorMessages={errorMessages}
               clearErrorMessages={form.clearErrorMessages}
               type="password"
               value={formData.password}
        />
      </div>
      <p className="form-actions">
        <span className="control-error">
          {form.anyError && "Form not valid!"}
        </span>
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
