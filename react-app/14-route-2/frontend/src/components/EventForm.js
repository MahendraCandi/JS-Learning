import {Form, redirect, useNavigate, useNavigation} from 'react-router-dom';

import classes from './EventForm.module.css';
import {ErrorResponse, upsertEvent} from "../utils/events-fetch";

function EventForm({ method, event, error }) {
  const navigate = useNavigate();

  // Navigation is an object that contains information about the current navigation.
  // This object contains states like "loading", "submitting", "idle"
  // that can be useful to display a spinner or disable button during a form submission.
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
      <p className={classes.danger}>{error?.message}</p>
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={event?.title} />
        <span className={classes.danger}>{error?.detail.title}</span>
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event?.image}/>
        <span className={classes.danger}>{error?.detail.image}</span>
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event?.date} />
        <span className={classes.danger}>{error?.detail.date}</span>
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event?.description} />
        <span className={classes.danger}>{error?.detail.description}</span>
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Save'}</button>
      </div>
    </Form>
  );
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const response = await upsertEvent(request.method, {
    id: params.id, // Can be undefined if creating a new event
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

export default EventForm;
