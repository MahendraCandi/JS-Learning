export async function fetchAvailablePlaces() {
  const response = await fetch('http://localhost:3000/places');
  if (!response.ok) {
    console.error(response);
    throw new Error("Failed to fetch available places");
  }

  const json = await response.json();
  return json.places;
}

export async function updateUserPlaces(userPlaces) {
  console.log(userPlaces, 'updateUserPlaces');
  const response = await fetch(
    `http://localhost:3000/user-places`,
    {
      method: 'PUT',
      body: JSON.stringify({places: userPlaces}),
      headers: {'Content-Type': 'application/json'}
    });

  if (!response.ok) {
    console.error(response);
    throw new Error("Failed to update user places");
  }

  const json = await response.json();
  return json.message;
}
