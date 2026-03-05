import {useActionState} from "react";
import {isEmpty} from "../util/validation.js";

function opinionAction(previousState, formState,) {

  const userName = formState.get("userName");
  const title = formState.get("title");
  const body = formState.get("body");

  console.log(userName, title, body);

  let errors = [];
  if (isEmpty(userName)) {
    errors.push("User name is required!");
  }

  if (isEmpty(title)) {
    errors.push("Title is required!");
  }

  if (isEmpty(body)) {
    errors.push("Body is required!");
  }

  if (errors.length > 0) {
    return {errors, enteredValue: {userName, title, body}};
  }

  // todo create submit
  return {
    errors: null,
  };
}

export function NewOpinion() {

  const [
    formState,
    formAction
  ] = useActionState(opinionAction, {errors: null});

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" defaultValue={formState.enteredValue?.userName}/>
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" defaultValue={formState.enteredValue?.title}/>
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5} defaultValue={formState.enteredValue?.body}></textarea>
        </p>

        {
            formState.errors &&
            <ul className="error">
              {
                formState.errors.map((error) => (<p key={error} className="error">{error}</p>))
              }
            </ul>
        }

        <p className="actions">
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  );
}
