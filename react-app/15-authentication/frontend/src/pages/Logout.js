import {removeAuthToken, removeExpirationDate} from "../auth";
import {redirect} from "react-router-dom";

export function action() {
  removeAuthToken();
  removeExpirationDate();
  return redirect("/");
}
