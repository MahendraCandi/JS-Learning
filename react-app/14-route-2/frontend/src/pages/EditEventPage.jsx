import {useActionData, useRouteLoaderData} from "react-router-dom";
import {routeId} from "../utils/constant";
import EventForm from "../components/EventForm";

const EditEventPage = () => {
  const loaderResponse = useRouteLoaderData(routeId.EVENT_DETAIL);
  const errorResponse = useActionData(); // see action function in EventForm
  return (
    <EventForm event={loaderResponse.data} method={"PATCH"} error={errorResponse}/>
  );
}

export default EditEventPage;
