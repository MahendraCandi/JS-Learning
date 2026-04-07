import classes from './EventItem.module.css';
import {Link, redirect, useSubmit} from "react-router-dom";
import {deleteEvent} from "../utils/events-fetch";

function EventItem({ event }) {
  const submit = useSubmit();
  async function startDeleteHandler() {
    const confirm = window.confirm("Are you sure you want to delete this event?");
    if (confirm) {
      // This submit function act like a form submit.
      // The first argument is target where we could pass HTMLFormElement, FormData, or object.
      // The second argument is submit options to navigations.
      //
      // If we passed an object example: `submit({aPayload: '1234'}, {method: "DELETE"})`.
      // Later in deleteAction function, we can access the payload by `request.formData.get('aPayload')`.
      await submit(null, {method: "DELETE"});
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to={"edit"}>Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;

export async function deleteAction({ request, params}) {
  const eventId = params.id;
  await deleteEvent(eventId);
  return redirect('/events');
}
