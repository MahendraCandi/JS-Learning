import {useRef, useState, useCallback, useEffect} from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import {fetchUserPlaces, updateUserPlaces} from "./fetch-utils.jsx";
import Error from "./components/Error.jsx";

function App() {
  const selectedPlace = useRef();
  const [userPlaces, setUserPlaces] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorOperation, setErrorOperation] = useState(null);

  useEffect(() => {
    fetchUserPlaces().then(places => setUserPlaces(places));
  }, []);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    if (userPlaces.some(p => p.id === selectedPlace.id)) {
      return;
    }

    try {
      await updateUserPlaces([selectedPlace, ...userPlaces]);
      setUserPlaces((prevPickedPlaces) => {
        return [selectedPlace, ...prevPickedPlaces];
      });
    } catch (e) {
      console.error(e);
      setErrorOperation(e.message || 'Failed to update user places.');
    }
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    try {
      await updateUserPlaces(userPlaces.filter((place) => place.id !== selectedPlace.current.id));
      setUserPlaces((prevPickedPlaces) =>
        prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
      );
    } catch (e) {
      console.error(e);
      setErrorOperation('Failed to remove user places.');
    }

    setModalIsOpen(false);
  }, []);

  return (
    <>
      <Modal open={errorOperation !== null} onClose={() => setErrorOperation(null)}>
        <Error
          title={"Failed do operation."}
          message={errorOperation}
          onConfirm={() => setErrorOperation(null)}
        />
      </Modal>

      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
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
          fallbackText="Select the places you would like to visit below."
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
