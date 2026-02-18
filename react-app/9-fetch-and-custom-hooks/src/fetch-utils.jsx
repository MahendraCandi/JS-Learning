export async function fetchAvailablePlaces() {
  const response = await fetch('http://localhost:3000/places');
  if (!response.ok) {
    throw new Error("response not ok");
  }

  const json = await response.json();
  return json.places;
}
