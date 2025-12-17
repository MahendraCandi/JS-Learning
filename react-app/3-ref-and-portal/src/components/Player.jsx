import {useState} from "react";

export default function Player() {

  const [nameInput, setNameInput] = useState('');
  const [titleName, setTitleName] = useState('');

  return (
    <section id="player">
      <h2>Welcome {titleName === '' ? 'unknown entity' : titleName}</h2>
      <p>
        <input type="text"
               value={nameInput}
               onChange={(e) => setNameInput(e.target.value)} />
        <button
          onClick={() => setTitleName(nameInput)}
        >
          Set Name</button>
      </p>
    </section>
  );
}
