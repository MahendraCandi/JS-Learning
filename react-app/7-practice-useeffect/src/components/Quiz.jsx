import Question from "./Question.jsx";
import QUESTIONS_DUMMY from "../questions.js";
import {useState} from "react";
import Summary from "./Summary.jsx";

const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
}

const shuffledQuestions = shuffle(QUESTIONS_DUMMY);

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(shuffledQuestions[currentQuestionIndex]);
  const [userAnsweredList, setUserAnsweredList] = useState([]);
  const [isShowSummary, setIsShowSummary] = useState(false);

  const saveAndUpdateUserAnsweredToList = (questionKey, answer, question) => {
    setUserAnsweredList([
      ...userAnsweredList,
      {
        id: questionKey,
        answer,
        question
      }
    ]);
  }

  const goToNextQuestion = (id, answer, question) => {
    saveAndUpdateUserAnsweredToList(id, answer, question);

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex >= QUESTIONS_DUMMY.length) {
      setIsShowSummary(true);
      return;
    }

    setCurrentQuestionIndex(nextQuestionIndex);
    setCurrentQuestion(QUESTIONS_DUMMY[nextQuestionIndex]);
  }

  return (
    <div id={"quiz"}>
      {
        isShowSummary ?
          <Summary answeredList={userAnsweredList} questionList={QUESTIONS_DUMMY}/>
          :
          <Question
            id={currentQuestion.id}
            question={currentQuestion.text}
            answerList={currentQuestion.answers}
            onNextQuestion={goToNextQuestion}
          />
      }
    </div>
  );
}
