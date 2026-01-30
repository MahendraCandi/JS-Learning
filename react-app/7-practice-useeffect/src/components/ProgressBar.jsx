import {useEffect, useState} from "react";

export default function ProgressBar({maxTimer, refresh}) {
  const [remainingTime, setRemainingTime] = useState(maxTimer)

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

  }, [refresh])

  return <progress value={remainingTime} max={maxTimer} />
}
