import Places from './Places.jsx';
import Error from './Error.jsx';
import {sortPlacesByDistance} from "../loc.js";
import {fetchAvailablePlaces} from "../fetch-utils.jsx";
import {useFetch} from "../hooks/use-fetch.jsx";

const fetchAndSortPlaces = async () => {
  const places = await fetchAvailablePlaces();

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      resolve(sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude))
    })
  })
}

export default function AvailablePlaces({ onSelectPlace }) {

  const {data: availablePlaces, isLoading, error} = useFetch(
    [],
    fetchAndSortPlaces
  );

  if (error !== null) {
    return <Error title={"Failed to load places."} message={error.message} onConfirm={() => setError(null)} />
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
      isLoading={isLoading}
      loadingText={"Loading places..."}
    />
  );
}
