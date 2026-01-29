import {useEffect, useState} from "react";

export default function ProgressBar({timer}) {
  const [remainingTime, setRemainingTime] = useState(timer);

  // Separate use this use effect by split it into another component so that only this component will re-rendered.
  // this approach will increase ReactJs application significantly.
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevState) => prevState - 10);
    }, 10);

    return () => {
      clearInterval(interval);
    }
  }, []);

  return <progress value={remainingTime} max={timer} />
}
