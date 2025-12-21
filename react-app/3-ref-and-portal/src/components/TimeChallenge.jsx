import {useRef, useState} from "react";
import ResultModal from "./ResultModal.jsx";

export function TimeChallenge({title, targetTime}) {
  const [isRunning, setIsRunning] = useState(false);
  const dialogModalRef = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const intervalId = useRef(0);

  // check if time is up
  if (timeRemaining <= 0 && isRunning === true) {
    stopTimer();
  }

  function startTimer() {
    setIsRunning(true);
    intervalId.current = setInterval(() => {
      setTimeRemaining((prevState) => (prevState - 10));
    }, 10);
  }

  function stopTimer() {
    clearInterval(intervalId.current);
    setIsRunning(false);
    dialogModalRef.current.open(); // open() is a function return by useImperativeHandle()
  }

  function resetTimer() {
    setTimeRemaining(targetTime * 1000);
  }

  return (
    <>
      <ResultModal ref={dialogModalRef}
                   targetTime={targetTime}
                   timeRemaining={timeRemaining}
                   resetTimer={resetTimer}
      />
      <section className={"challenge"}>
        <h2>{title}</h2>
        <p>{timeRemaining}</p>
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
