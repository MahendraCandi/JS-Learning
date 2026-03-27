import {useRouteLoaderData} from "react-router-dom";
import {routeId} from "../utils/constant";
import EventForm from "../components/EventForm";

const EditEventPage = () => {
  const loaderResponse = useRouteLoaderData(routeId.EVENT_DETAIL);
  return (
    <EventForm event={loaderResponse.data} method={"PATCH"}/>
  );
}

export default EditEventPage;
