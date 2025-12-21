import {forwardRef, useImperativeHandle, useRef, useState} from "react";
import {createPortal} from "react-dom";

// React 19 and above can use ref property directly
// export default function ResultModal({ ref, result, targetTime }) {
//   return (
//     <dialog ref={ref} className={"result-modal"}>
//       <h2>You {result}</h2>
//       <p>
//         The target time was <strong>{targetTime} seconds</strong>.
//       </p>
//       <p>
//         You stopped the timer with <strong>... seconds left</strong>
//       </p>
//       <form method={"dialog"}>
//         <button>Close</button>
//       </form>
//     </dialog>
//   );
// }

// react 18 and below should use forwardRef to use ref
const ResultModal = forwardRef(( { targetTime, timeRemaining, resetTimer }, ref) => {

  const isLost = timeRemaining <= 0;
  const score = Math.round((timeRemaining / (targetTime * 1000)) * 100);

  // useImperativeHandle(ref, () => ({}))
  // when we want to bind an element but only expose specific properties or functions to the parent component
  // or we want to have single responsibility for the element.
  //
  // `inputRef` is representing the input element
  // second parameter is a function return a custom object. this custom object has functions that will exposed to parent component
  // by using the custom object, we can have full control over the element that will be bound to the parent component
  // example we want to change the dialog element to div. the parent element then don't need to adjust the ref.current to div.
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => {
    return {
      open() {
        inputRef.current.showModal();
      }
    }
  });

  return createPortal(
    <dialog ref={inputRef} className={"result-modal"}>
      <h2>You {isLost ? 'Loss' : 'Win'}</h2>
      {!isLost && <h2>Score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds</strong>.
      </p>
      <p>
        You stopped the timer with <strong>{(timeRemaining / 1000).toFixed(2)} seconds left</strong>
      </p>
      <form method={"dialog"}>
        <button onClick={resetTimer}>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  );
});

export default ResultModal;
