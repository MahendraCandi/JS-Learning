import ProgressBar from "./ProgressBar.jsx";

const TIMER = 7000;

export default function Question({id, question, answerList, onNextQuestion}) {

  return (
    <>
      <section id={"question"}>
        <ProgressBar key={id} // ProgressBar will re-render automatically when the value in 'key' is changing
                     maxTimer={TIMER}
                     onTimeUp={() => onNextQuestion(id, "Skipped", question)}
        />
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
