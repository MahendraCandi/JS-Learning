import EventsNavigation from "../components/EventsNavigation";
import {Outlet} from "react-router-dom";

const RootEventPage = () => {
  return (
    <>
      <EventsNavigation />
      <Outlet />
    </>
  )
}

export default RootEventPage;
