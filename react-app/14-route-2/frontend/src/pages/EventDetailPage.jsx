import {Link, useLoaderData, useRouteLoaderData} from "react-router-dom";
import EventItem from "../components/EventItem";
import {fetchEvent} from "../utils/events-fetch";
import LoaderResponse from "../utils/loader-response";
import {routeId} from "../utils/constant";

const EventDetailPage = () => {
  const loaderResponse = useRouteLoaderData(routeId.EVENT_DETAIL);
  return (
    <>
      <EventItem event={loaderResponse.data}/>
      <p>
        <Link to={".."} relative={"path"}>Back</Link>
      </p>
    </>
  );
}

export default EventDetailPage;

// about the parameters:
// - "request" is a React Router object that holds information about the current request.
// - "params" is similar to React Router useParams
export async function loader({ request, params }) {
  const event = await fetchEvent(params.id);
  return new LoaderResponse(event);
}
