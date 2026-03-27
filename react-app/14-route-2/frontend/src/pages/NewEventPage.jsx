import EventForm from "../components/EventForm";
import {createEvent} from "../utils/events-fetch";
import {redirect} from "react-router-dom";

const NewEventPage = () => {
  return (
    <EventForm method={"POST"}/>
  );
}

export default NewEventPage;

export async function action({ request, params }) {
  const formData = await request.formData();
  await createEvent({
    title: formData.get("title"),
    date: formData.get("date"),
    image: formData.get("image"),
    description: formData.get("description"),
  });

  return redirect("/events");
}
