import {useRef, useState} from "react";

export default function Player() {
  const [titleName, setTitleName] = useState('');
  const nameRef = useRef(null);

  let nameOnChange = () => {
    console.log(nameRef.current.value);
  };

  const handleButtonClick = () => {
    setTitleName((prevState) => {
        return nameRef.current ? nameRef.current.value : prevState
      });
  };

  return (
    <section id="player">
      <h2>Welcome {titleName === '' ? 'unknown entity' : titleName}</h2>
      <p>
        <input type="text"
               ref={nameRef}
               onChange={nameOnChange} />
        <button
          onClick={handleButtonClick}
        >
          Set Name</button>
      </p>
    </section>
  );
}
