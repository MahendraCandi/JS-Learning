import {useEffect} from "react";

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  // A problem with function as useEffect dependencies will produce an infinite loop.
  // The reasons are:
  // 1. every time a component is re-rendered, the variable and functions inside the component will be recreated.
  // 2. even the function is recreated, the old and the new function was not the same!
  // 3. thus, the useEffect will consider the function was updated and will trigger the re-render.
  useEffect(() => {
    console.log("Set timer");
    const timeout = setTimeout(() => {
      onConfirm();
    }, 3000);

    return () => {
        console.log("Clear timer");
        clearTimeout(timeout);
    }
  }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
    </div>
  );
}
