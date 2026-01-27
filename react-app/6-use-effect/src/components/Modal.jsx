import {useEffect, useRef} from 'react';
import {createPortal} from 'react-dom';

function Modal({ children, isModalOpen }) {
  const dialog = useRef();

  // When the first time the application launches, these lines of code will throw an error.
  // The error should be "Cannot read properties of undefined (reading 'close')". 'close' is pointing to function "dialog.current.close();"
  // The error happens because the JSX code is not executed yet.
  // As a result, the DOM is not ready yet, and the "dialog ref" is not bound with the "dialog HTML element".
  // Therefore, the "dialog reff" has an undefined value, then "dialog.current.close()" will throw an error.
  // ---
  // To solve this issue, we can use the useEffect hook to execute the state after the DOM is ready.
  useEffect(() => {
    if (isModalOpen) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [isModalOpen]);

  return createPortal(
      <dialog className="modal" ref={dialog}>
        {children}
      </dialog>,
      document.getElementById('modal')
  );
}

export default Modal;
