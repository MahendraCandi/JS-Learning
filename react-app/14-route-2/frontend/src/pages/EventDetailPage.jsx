import {Link, useParams} from "react-router-dom";

const EventDetailPage = () => {
  const params = useParams();
  return (
    <>
      <h1>Event Detail Page</h1>
      <p>
        Event id: <strong>{params.id}</strong>
      </p>
      <p>
        <Link to={".."} relative={"path"}>Back</Link>
      </p>
    </>
  );
}

export default EventDetailPage;
