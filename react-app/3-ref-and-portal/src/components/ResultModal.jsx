import {forwardRef} from "react";

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
const ResultModal = forwardRef(( { result, targetTime }, ref) => {
  return (
    <dialog ref={ref} className={"result-modal"}>
      <h2>You {result}</h2>
      <p>
        The target time was <strong>{targetTime} seconds</strong>.
      </p>
      <p>
        You stopped the timer with <strong>... seconds left</strong>
      </p>
      <form method={"dialog"}>
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ResultModal;
