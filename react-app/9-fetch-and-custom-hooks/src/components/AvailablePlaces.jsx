import Places from './Places.jsx';
import {useEffect, useState} from "react";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([])

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch('http://localhost:3000/places');
        if (!response.ok) {
          throw new Error("Damn");
        }

        const json = await response.json();
        console.log(json.places, 'json');
        console.log(json);
        setAvailablePlaces(json.places);
      } catch (e) {
        console.error(e);
        throw e;
      }
    }
    fetchPlaces();
  }, [availablePlaces]) // fixme: why this always regenerate the component

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
