import {Link} from "react-router-dom";

const DUMMY_EVENTS = [
  {
    id: "1",
    name: "Hotel A",
  },
  {
    id: "2",
    name: "Hotel B",
  },
  {
    id: "3",
    name: "Hotel C",
  }
]

const EventsPage = () => {
  return (
    <>
      <h1>Events Page</h1>
      <ul>
        {
          DUMMY_EVENTS.map((e) =>
            <li key={e.id}><Link to={e.id}>{e.name}</Link></li>
          )
        }
      </ul>
    </>
  )
}

export default EventsPage;
