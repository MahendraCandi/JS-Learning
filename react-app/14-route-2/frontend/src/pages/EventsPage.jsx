import {useEffect, useState} from "react";
import {fetchEvents} from "../events-fetch";
import EventsList from "../components/EventsList";

const EventsPage = () => {
  const [availableEvents, setAvailableEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchEventsWrapper = async () => {
      setIsLoading(true);
      let events;
      try {
        events = await fetchEvents();
      } catch (e) {
        console.error(e);
        setError(e);
      }
      setAvailableEvents(events);
      setIsLoading(false);
    }

    fetchEventsWrapper();
  }, []);

  return (
    <>
      <div style={{textAlign: "center"}}>
        {
          isLoading && <p>Loading...</p>
        }
        {
          error && <p style={{color: "red"}}>{error.message}</p>
        }
      </div>

      {
        !isLoading && !error && availableEvents.length > 0 && <EventsList events={availableEvents}/>
      }
    </>
  )
}

export default EventsPage;
