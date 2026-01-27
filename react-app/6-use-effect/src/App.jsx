import {useEffect, useRef, useState} from 'react';

import Places from './components/Places.jsx';
import {AVAILABLE_PLACES} from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import {sortPlacesByDistance} from "./loc.js";

const SELECTED_PLACES_KEY = 'selectedPlaces';

function getSelectedPlacesFromStorage() {
  return JSON.parse(localStorage.getItem(SELECTED_PLACES_KEY)) || [];
}

function setSelectedPlaceToStorage(id) {
  const storedPlaceIds = getSelectedPlacesFromStorage();
  if (storedPlaceIds.indexOf(id) === -1) {
    localStorage.setItem(SELECTED_PLACES_KEY, JSON.stringify([id, ...storedPlaceIds]));
  }
}

function removeSelectedPlace(id) {
  const storedPlaceIds = getSelectedPlacesFromStorage();
  localStorage.setItem(SELECTED_PLACES_KEY, JSON.stringify(storedPlaceIds.filter((id) => id !== id.current)));
}

// this code didn't require useEffect because this code can execute synchronously
// better using useEffect for async operations with external API calls
// also this code will execute once when the page loads, so we don't need to use useEffect for that
const storedIds = getSelectedPlacesFromStorage();
const storedPlaces = storedIds.map((id) => AVAILABLE_PLACES.find((place) => place.id === id));

function App() {
  const modal = useRef();
  const selectedPlace = useRef();
  const [availablePlaces, setAvailablePlaces] = useState([])
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

  // useEffect is good for async operations with external API calls
  // useEffect will execute lastly after the component is rendered and after every re-render
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      const placesByDistance = sortPlacesByDistance(AVAILABLE_PLACES, position.coords.latitude, position.coords.longitude);
      setAvailablePlaces(placesByDistance);
    });
  }, []);

  function handleStartRemovePlace(id) {
    modal.current.open();
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    modal.current.close();
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    setSelectedPlaceToStorage(id);
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    modal.current.close();

    removeSelectedPlace(selectedPlace);
  }

  return (
    <>
      <Modal ref={modal}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText={'No places available at the moment.'}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
