import EventsList from "../components/EventsList";
import {useLoaderData} from "react-router-dom";
import {fetchEvents} from "../utils/events-fetch";
import LoaderResponse from "../utils/loader-response";

const EventsPage = () => {
  // useLoaderData gets data from router 'loader'.
  const response = useLoaderData();
  return (
    <EventsList events={response.data}/>
  )
}

export default EventsPage;

// Since this loader only used in this page, it is recommended to the loader function inside the this page.
/**
 * A loader function that fetches events from the backend.
 */
export const loader = async () => {
  const events = await fetchEvents(); // any error during http fetching will throw FetchException class.
  return new LoaderResponse(events);
}
