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

/**
 * Creates a new event in the backend.
 * Should throw an error if the event is invalid.
 *
 * The API will return a 201 status code if successful
 * or a 422 status code with an error response if the event is invalid.
 * Error response:
 * <pre>
 *   {
 *     "message": "Adding the event failed due to validation errors.",
 *     "errors": {
 *         "image": "Invalid image."
 *     }
 *   }
 * </pre>
 *
 * @param method The HTTP method to use: 'POST' or 'PATCH'
 * @param event The event to create:
 *              <pre>
 *                {
 *                  "id": "", // mandatory for PATCH
 *                  "title": "",
 *                  "date": "", // format YYYY-MM-DD
 *                  "image": "", // the link to the image
 *                  "description": ""
 *                }
 *              </pre>
 */
export async function upsertEvent(method, event) {
  let url = "http://localhost:8080/events";

  if (method === 'PATCH') {
    if (event.id === undefined) {
      throw new Error("Event ID is undefined");
    }

    url += `/${event.id}`;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });

  if (response.status === 422) {
    const responseBody = await response.json();
    return new ErrorResponse(422, responseBody.message, responseBody.errors);
  }

  if (!response.ok) {
    throw new FetchException("Failed to create event", response.status);
  }
}

/**
 * Deletes an event from the backend.
 * @param eventId
 * @return {Promise<void>}
 */
export async function deleteEvent(eventId) {
  const response = await fetch(`http://localhost:8080/events/${eventId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({eventId: eventId}),
  });

  if (!response.ok) {
    throw new FetchException("Failed to delete event", response.status);
  }
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

export class ErrorResponse {
  httpStatus;
  message;
  detail;

  constructor(httpStatus, message, detail) {
    this.httpStatus = httpStatus;
    this.message = message;
    this.detail = detail;
  }
}
