import {Await, Link, useRouteLoaderData} from "react-router-dom";
import EventItem from "../components/EventItem";
import {fetchEvent, fetchEvents} from "../utils/events-fetch";
import LoaderResponse from "../utils/loader-response";
import {routeId} from "../utils/constant";
import EventsList from "../components/EventsList";
import {Suspense} from "react";

const EventDetailPage = () => {
  const {event, events} = useRouteLoaderData(routeId.EVENT_DETAIL);
  return (
    // Controlling two suspense.
    // The first one will be available after the event is fetched. will not show a loading fallback.
    // The second one will be available after the events are fetched, while waiting will show a loading fallback.
    <>
      <Suspense fallback={<p style={{textAlign:'center'}}>Loading...</p>}>
        <Await resolve={event} >
          {
            (event) =>
              <>
                <EventItem event={event.data}/>
                <p>
                  <Link to={".."} relative={"path"}>Back</Link>
                </p>
              </>
          }
        </Await>
      </Suspense>

      <Suspense fallback={<p style={{textAlign:'center'}}>Loading...</p>}>
        <Await resolve={events}>
          {
            (events) => {
              return <EventsList events={events.data}/>
            }
          }
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetailPage;

// about the parameters:
// - "request" is a React Router object that holds information about the current request.
// - "params" is similar to React Router useParams
export async function loader({ request, params }) {
  return {
    // using await to make sure the fetch is finished before rendering the page.
    // thus will make move to the page after the fetch is finished.
    event: await fetchEvent(params.id).then((e) => new LoaderResponse(e)),
    events: fetchEvents().then((e) => new LoaderResponse(e)),
  }
}
