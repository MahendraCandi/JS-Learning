import EventsList from "../components/EventsList";
import {Await, useLoaderData} from "react-router-dom";
import {fetchEvents} from "../utils/events-fetch";
import LoaderResponse from "../utils/loader-response";
import {Suspense} from "react";

const EventsPage = () => {
  // useLoaderData gets data from router 'loader'.
  const response = useLoaderData();
  return (
    <Suspense fallback={<p style={{textAlign:'center'}}>Loading...</p>}>
      <Await resolve={response.result}>
        {
          (loadedResponse) => {
            return <EventsList events={loadedResponse.data}/>
          }
        }
      </Await>
    </Suspense>
  )
}

export default EventsPage;

// Since this loader only used in this page, it is recommended to the loader function inside the this page.
/**
 * A loader function that fetches events from the backend.
 */
export const loader = () => {
  // by using this pattern:
  // 1. not using async in function
  // 2. wrap the promise in an object
  // we can show loading fallback by using Suspense and Await components.
  return {
    result: fetchEvents().then((events) => {
      // any error during http fetching will throw FetchException class.
      return new LoaderResponse(events)
    }),
  };
}
