import completeLogo from "../assets/quiz-complete.png";

// todo complete logic inside summary!
export default function Summary({answeredList, questionList}) {

  let totalSkipped = [];
  let totalCorrect = [];
  let totalIncorrect = [];
  for (let answered in answeredList) {
    if (answered.answer === null) {
      totalSkipped.push(answered);
    }
  }


  return (
    <div id="summary">
      <img src={completeLogo} alt="quiz complete"/>
      <h2>Quiz Completed!</h2>
      <section id={"summary-stats"}>
        <div>
          <p className={"number"}>
            0%
          </p>
          <p className={"text"}>
            Skipped
          </p>
        </div>

        <div>
          <p className={"number"}>
            45%
          </p>
          <p className={"text"}>
            Answered Correctly
          </p>
        </div>

        <div>
          <p className={"number"}>
            45%
          </p>
          <p className={"text"}>
            Answered Incorrectly
          </p>
        </div>
      </section>
      <ol>
        <li>
          <h3>1</h3>
          <p className={"question"}>
            What do you do?
          </p>
          <p className={"user-answer correct"}>
            Yeeayy
          </p>
        </li>

        <li>
          <h3>2</h3>
          <p className={"question"}>
            What is this?
          </p>
          <p className={"user-answer wrong"}>
            Boo
          </p>
        </li>

        <li>
          <h3>2</h3>
          <p className={"question"}>
            Where is it?
          </p>
          <p className={"user-answer skipped"}>
            Boo
          </p>
        </li>
      </ol>
    </div>
  );
}
