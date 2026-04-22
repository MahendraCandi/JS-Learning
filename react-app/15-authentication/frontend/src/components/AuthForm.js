import {Form, Link, useActionData, useNavigation, useSearchParams} from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {
  const response = useActionData();
  const navigation = useNavigation();

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';

  return (
    <Form method="post" className={classes.form}>
      <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
      {
        response?.message && <p style={{color : "red"}}>{response.message}</p>
      }
      <p>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required />
        {
          response?.errors?.email && <p style={{color : "red"}}>{response.errors.email}</p>
        }
      </p>
      <p>
        <label htmlFor="image">Password</label>
        <input id="password" type="password" name="password" required />
      </p>
      <div className={classes.actions}>
        <Link to={`/auth?mode=${isLogin ? 'signup' : 'login'}`}>
          {isLogin ? 'Create new user' : 'Login'}
        </Link>
        <button disabled={navigation.state === 'submitting'}>{navigation.state === 'submitting' ? 'Submitting...' : 'Save'}</button>
      </div>
    </Form>

  );
}

export default AuthForm;
