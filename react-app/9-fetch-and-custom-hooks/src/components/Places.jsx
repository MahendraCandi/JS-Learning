export default function Places({ title, places, fallbackText, onSelectPlace, isLoading, loadingText }) {
  console.log(places);

  let component;
  if (isLoading) {
    component = <p className={"fallback-text"}>{loadingText}</p>;
  } else if (places.length <= 0) {
    component = <p className="fallback-text">{fallbackText}</p>;
  } else {
    component = (
      <ul className="places">
        {places.map((place) => (
          <li key={place.id} className="place-item">
            <button onClick={() => onSelectPlace(place)}>
              <img src={`http://localhost:3000/${place.image.src}`} alt={place.image.alt} />
              <h3>{place.title}</h3>
            </button>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <section className="places-category">
      <h2>{title}</h2>
      {component}
    </section>
  );
}
