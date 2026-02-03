import completeLogo from "../assets/quiz-complete.png";

// return:
// {
//   id: 'q5',
//   answer: 'The lifecycle phase a React component is in.'
//   question: 'What does the term "React state" imply?',
//   isCorrect: false
//   isSkipped: true
// }
const validateAnswer = (answerList) => {
  return answerList.map(userAnswer => {
    if (userAnswer.answer === "Skipped") {
      return {
        ...userAnswer,
        isCorrect: false,
        isSkipped: true,
      };
    }

    const correctAnswer = SYSTEM_ANSWER.find(systemAnswer =>
        systemAnswer.id === userAnswer.id && systemAnswer.answer === userAnswer.answer);

    if (correctAnswer) {
      return {
        ...userAnswer,
        isCorrect: true,
        isSkipped: false,
      }
    } else {
      return {
        ...userAnswer,
        isCorrect: false,
        isSkipped: false,
      }
    }
  });
}

function calculatePercentage(total, questionList) {
  return Number((total / questionList.length) * 100).toFixed(0);
}

function findAnswerClassName(answeredQuestion) {
  console.log(answeredQuestion)
  if (answeredQuestion.isSkipped) return "skipped";

  if (answeredQuestion.isCorrect) {
    return "correct";
  }

  return "wrong";
}

export default function Summary({answeredList, questionList}) {
  const reviewedAnswer = validateAnswer(answeredList);
  const correctPercentage = calculatePercentage(reviewedAnswer.filter(a => a.isCorrect === true).length, questionList);
  const incorrectPercentage = calculatePercentage(reviewedAnswer.filter(a => a.isCorrect === false).length, questionList);
  const skippedPercentage = calculatePercentage(reviewedAnswer.filter(a => a.isSkipped === true).length, questionList);

  return (
    <div id="summary">
      <img src={completeLogo} alt="quiz complete"/>
      <h2>Quiz Completed!</h2>
      <section id={"summary-stats"}>
        <div>
          <p className={"number"}>{skippedPercentage}%</p>
          <p className={"text"}>
            Skipped
          </p>
        </div>

        <div>
          <p className={"number"}>{correctPercentage}%</p>
          <p className={"text"}>
            Answered Correctly
          </p>
        </div>

        <div>
          <p className={"number"}>{incorrectPercentage}%</p>
          <p className={"text"}>
            Answered Incorrectly
          </p>
        </div>
      </section>

      <ol>
        {
          reviewedAnswer.map((answeredQuestion, index) => (
              <li key={answeredQuestion.id}>
                <h3>{index + 1}</h3>
                <p className={"question"}>
                  {answeredQuestion.question}
                </p>
                <p className={"user-answer " + findAnswerClassName(answeredQuestion) }>
                  {answeredQuestion.answer}
                </p>
              </li>
          ))
        }
      </ol>
    </div>
  );
}

const SYSTEM_ANSWER = [
  {
    id: 'q1',
    answer: 'A library to build user interfaces with help of declarative code.'
  },
  {
    id: 'q2',
    answer: 'Enabling the use of state and other React features in functional components.'
  },
  {
    id: 'q3',
    answer: 'A JavaScript extension that adds HTML-like syntax to JavaScript.'
  },
  {
    id: 'q4',
    answer: 'By defining a JavaScript function that returns a renderable value.'
  },
  {
    id: 'q5',
    answer: 'An object in a component that holds values and may cause the component to render on change.'
  },
  {
    id: 'q6',
    answer: 'By using the map() method to iterate over an array of data and returning JSX.'
  },
  {
    id: 'q7',
    answer: 'Using the #if template syntax.'
  },
];

