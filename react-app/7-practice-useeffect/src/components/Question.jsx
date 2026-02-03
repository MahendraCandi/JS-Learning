import ProgressBar from "./ProgressBar.jsx";
import {useEffect} from "react";

const TIMER = 7000;

export default function Question({id, question, answerList, onNextQuestion}) {

  useEffect(() => {
    const timeout = setTimeout(() => {
      onNextQuestion(id, "Skipped", question);
    }, TIMER);
    return () => clearTimeout(timeout);
  }, [onNextQuestion]);

  return (
    <>
      <section id={"question"}>
        <ProgressBar maxTimer={TIMER} refresh={question} />
        <h2>{question}</h2>
      </section>
      <section id={"answers"}>
        <div className={"answer"}>
          {
            answerList.map(answer => <button key={answer} onClick={() => onNextQuestion(id, answer, question)} >{answer}</button>)
          }
        </div>
      </section>
    </>
  );
}
