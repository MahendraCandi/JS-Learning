export default function ResultModal({ result, targetTime, isOpen, handleClose }) {
  return (
    <dialog className={"result-modal"} open={isOpen ? true : undefined}>
      <h2>You {result}</h2>
      <p>
        The target time was <strong>{targetTime} seconds</strong>.
      </p>
      <p>
        You stopped the timer with <strong>... seconds left</strong>
      </p>
      <form method={"dialog"}>
        <button onClick={handleClose}>Close</button>
      </form>
    </dialog>
  );
}
