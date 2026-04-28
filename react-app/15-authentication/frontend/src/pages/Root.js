import {Outlet, useLoaderData, useSubmit} from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import {useEffect} from "react";
import {getExpirationDate} from "../auth";

function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    const expirationDate = new Date(getExpirationDate());
    const timeout = expirationDate.getTime() - Date.now();

    const submitLogout = async () => {
      await submit(null, {action: '/logout', method: 'post'})
    }

    console.log('token will expire in', timeout, 'ms');
    setTimeout(() => {
      console.log('token expired');
      submitLogout();
    }, timeout)

  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
