import {getAuthToken} from "../auth";
import {Navigate} from "react-router-dom";

export function PrivateRoute({ children }) {
  const auth = getAuthToken();

  if (!auth) {
    Navigate({to: '/auth?mode=login', replace: true});
  }

  return (<>{children}</>)
}
