import {Outlet} from "react-router-dom";
import MainNavigation from "../component/MainNavigation";
import classes from "./Root.module.css";

const Root = () => {
  return (
    <>
      <MainNavigation />

      <main className={classes.content}>
        {/*outlet will render all children mentioned in Route creation*/}
        <Outlet />
      </main>

    </>
  );
}

export default Root;
