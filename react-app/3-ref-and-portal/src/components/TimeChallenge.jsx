import {useRef, useState} from "react";
import ResultModal from "./ResultModal.jsx";

export function TimeChallenge({title, targetTime}) {
  const [isRunning, setIsRunning] = useState(false);
  const [isOpenResult, setIsOpenResult] = useState(false)
  const timeoutId = useRef(0);

  function startTimer() {
    setIsRunning(true);
    let currentTimeoutId = setTimeout(() => stopTimer(), targetTime * 1000);
    timeoutId.current = currentTimeoutId;
    setIsOpenResult(false);
    console.log('start ' + currentTimeoutId)
  }

  function stopTimer() {
    setIsRunning(false);
    clearTimeout(timeoutId.current);
    setIsOpenResult(true);
    console.log('stop ' + timeoutId.current);
  }

  return (
    <>
      <ResultModal result={"something"}
                   targetTime={targetTime}
                   isOpen={isOpenResult}
                   handleClose={() => setIsOpenResult(false)}/>
      <section className={"challenge"}>
        <h2>{title}</h2>
        <p className={"challenge-time"}>
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={() => isRunning === true ? stopTimer() : startTimer()}>
            {isRunning ? 'Stop Timer' : 'Start Challenge'}
          </button>
        </p>
        <p className={isRunning ? 'active' : undefined}>
          {isRunning ? 'Time is running' : 'Inactive'}
        </p>
      </section>
    </>
  );
}
