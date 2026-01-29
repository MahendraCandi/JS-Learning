import ProgressBar from "./ProgressBar.jsx";

export default function Question({question, answerList}) {
  return (
    <>
      <section id={"question"}>
        <ProgressBar timer={15000} />
        <h2>{question}</h2>
      </section>
      <section id={"answers"}>
        <div className={"answer"}>
          {
            answerList.map(answer => <button key={answer}>{answer}</button>)
          }
        </div>
      </section>
    </>
  );
}
