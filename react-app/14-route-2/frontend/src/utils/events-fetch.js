/**
 * Fetches events from the backend.
 * Will return an array of events:
 *
 * <pre>
 *   [
 *     {
 *       "id": "e1",
 *       "title": "A dummy event",
 *       "date": "2023-02-22",
 *       "image": "https://blog.hubspot.de/hubfs/Germany/Blog_images/Optimize_Marketing%20Events%20DACH%202021.jpg",
 *       "description": "Join this amazing event and connect with fellow developers."
 *     }
 *   ]
 * </pre>
 *
 */
export async function fetchEvents() {
    const response = await fetch("http://localhost:8080/events");
    if (!response.ok) {
        throw new FetchException("Failed to fetch events", response.status);
    }

    const json = await response.json();
    return json.events;
}

/**
 * Fetches a single event from the backend.
 * Will return a single event object.
 *
 * <pre>
 * {
 *   "event": {
 *     "id": "e1",
 *     "title": "A dummy event",
 *     "date": "2023-02-22",
 *     "image": "https://blog.hubspot.de/hubfs/Germany/Blog_images/Optimize_Marketing%20Events%20DACH%202021.jpg",
 *     "description": "Join this amazing event and connect with fellow developers."
 *   }
 * }
 * </pre>
 *
 * @param eventId The event ID
 */
export async function fetchEvent(eventId) {
  const response = await fetch(`http://localhost:8080/events/${eventId}`);
  if (!response.ok) {
    throw new FetchException("Failed to fetch event", response.status);
  }

  const json = await response.json();
  return json.event;
}

export class FetchException extends Error {
  errorMessage;
  status;

  constructor(errorMessage, status) {
    super(errorMessage);
    this.errorMessage = errorMessage;
    this.status = status;
  }
}
