import classes from './Auth.module.css';
import {useActionState} from "react";
import {useDispatch} from "react-redux";
import {authActions} from "../store/authentication-slice";

const Auth = () => {
  const dispatch = useDispatch();

  const loginFormAction = (prevState, formState) => {
    const email = formState.get('email');
    const password = formState.get('password');

    let errors = [];
    if (email.length === 0 || email.includes('@') === false) {
      errors.push('Please enter a valid email address!');
    }

    if (password.length < 6) {
      errors.push('Please enter a valid password!');
    }
    if (errors.length > 0) {
      return {errors, enteredValue: {email, password}};
    }

    dispatch(authActions.login({ name: "John Doe", email }));
    return {errors: null};
  }

  const [formState, formAction] = useActionState(loginFormAction, {errors: null});

  return (
    <main className={classes.auth}>
      <section>
        <form action={formAction}>
          <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name='email' defaultValue={formState.enteredValue?.email}/>
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' name='password' defaultValue={formState.enteredValue?.password} />
          </div>
          <div>
            {
              formState.errors &&
              <ul className="errors">
                {
                  formState.errors.map((error) => (<p key={error} className="errors">{error}</p>))
                }
              </ul>
            }
          </div>
          <button>Login</button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
