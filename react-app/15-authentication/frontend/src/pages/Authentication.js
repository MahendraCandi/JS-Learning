import AuthForm from '../components/AuthForm';
import {redirect} from "react-router-dom";
import {setAuthToken, setExpirationDate} from "../auth";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action ({request}) {
  const params = new URL(request.url).searchParams;
  const mode = params.get('mode') || 'login';

  if (mode !== 'login' && mode !== 'signup') {
    throw Response.json({
      status: 500,
      message: 'Invalid mode',
    });
  }

  const formData = await request.formData();

  const authBody = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const response = await fetch('http://localhost:8080/' + mode, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authBody),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw Response.json({
      status: 500,
      message: 'Could not authenticate.',
    });
  }
  const json = await response.json();
  setAuthToken(json.token);

  let expirationDate = new Date();
  expirationDate.setMinutes(expirationDate.getMinutes() + 1);
  setExpirationDate(expirationDate);

  return redirect('/');
}
