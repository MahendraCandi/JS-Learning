import EventForm from "../components/EventForm";
import {createEvent, ErrorResponse} from "../utils/events-fetch";
import {redirect, useActionData} from "react-router-dom";

const NewEventPage = () => {
  const errorResponse = useActionData();
  return (
    <EventForm method={"POST"} error={errorResponse}/>
  );
}

export default NewEventPage;

export async function action({ request, params }) {
  const formData = await request.formData();
  const response = await createEvent({
    title: formData.get("title"),
    date: formData.get("date"),
    image: formData.get("image"),
    description: formData.get("description"),
  });

  // error path
  if (response instanceof ErrorResponse) {
    return response;
  }

  // Success path
  return redirect("/events");
}
