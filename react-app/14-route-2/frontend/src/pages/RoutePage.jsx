import {Outlet} from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

const RoutePage = () => {
  return (
    <>
      <MainNavigation />
      <Outlet/>
    </>
  );
}

export default RoutePage;
