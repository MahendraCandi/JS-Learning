import EventsList from "../components/EventsList";
import {useLoaderData} from "react-router-dom";

const EventsPage = () => {
  // useLoaderData gets data from router 'loader'.
  const availableEvents = useLoaderData();
  return (
    <EventsList events={availableEvents}/>
  )
}

export default EventsPage;
