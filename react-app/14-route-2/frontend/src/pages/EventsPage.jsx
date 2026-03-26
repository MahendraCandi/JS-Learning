import EventsList from "../components/EventsList";
import {useLoaderData} from "react-router-dom";
import {fetchEvents} from "../events-fetch";

const EventsPage = () => {
  // useLoaderData gets data from router 'loader'.
  const availableEvents = useLoaderData();
  return (
    <EventsList events={availableEvents}/>
  )
}

export default EventsPage;

// Since this loader only used in this page, it is recommended to the loader function inside the this page.
/**
 * A loader function that fetches events from the backend.
 */
export const loader = async () => {
  try {
    return await fetchEvents();
  } catch (e) {
    // todo handle error later
    return [];
  }
}
