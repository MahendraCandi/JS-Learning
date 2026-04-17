import EventForm from "../components/EventForm";
import {useActionData} from "react-router-dom";

const NewEventPage = () => {
  const errorResponse = useActionData(); // see action function in EventForm
  return (
    <EventForm method={"POST"} error={errorResponse}/>
  );
}

export default NewEventPage;
