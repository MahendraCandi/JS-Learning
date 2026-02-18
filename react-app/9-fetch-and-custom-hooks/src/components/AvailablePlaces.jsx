import Places from './Places.jsx';
import Error from './Error.jsx';
import {useEffect, useState} from "react";
import {sortPlacesByDistance} from "../loc.js";
import {fetchAvailablePlaces} from "../fetch-utils.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setIsLoading(true);
        const places = await fetchAvailablePlaces();
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude)
          setAvailablePlaces(sortedPlaces);
          setIsLoading(false);
        })
      } catch (e) {
        setError(e);
      }
    }

    fetchPlaces();
  }, []);

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
