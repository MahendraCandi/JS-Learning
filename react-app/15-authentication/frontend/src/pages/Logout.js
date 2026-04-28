import {removeAuthToken} from "../auth";
import {redirect} from "react-router-dom";

export function action() {
  removeAuthToken();
  return redirect("/");
}
