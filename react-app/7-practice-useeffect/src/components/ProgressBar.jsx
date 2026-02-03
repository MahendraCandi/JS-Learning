import {useEffect, useState} from "react";

export default function ProgressBar({maxTimer, onTimeUp}) {
  const [remainingTime, setRemainingTime] = useState(maxTimer)

  useEffect(() => {
    const timeout = setTimeout(() => {
      onTimeUp();
    }, maxTimer);
    return () => clearTimeout(timeout);
  }, [onTimeUp]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("SET REMAINING TIME")
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      console.log("CLEAR REMAINING TIME")
      clearInterval(interval);
      setRemainingTime(maxTimer);
    }
  }, []) // remove property 'refresher' as dependency, use component key to re-render the component instead.

  return <progress value={remainingTime} max={maxTimer} />
}
