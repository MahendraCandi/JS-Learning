import {Outlet} from "react-router-dom";
import MainNavigation from "./MainNavigation";

const Root = () => {
  return (
    <>
      <MainNavigation />

      {/*outlet will render all children mentioned in Route creation*/}
      <Outlet />
    </>
  );
}

export default Root;
