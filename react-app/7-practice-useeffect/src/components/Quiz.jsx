import Question from "./Question.jsx";
import QUESTIONS_DUMMY from "../questions.js";
import {useCallback, useState} from "react";
import Summary from "./Summary.jsx";

const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
}

const shuffledQuestions = shuffle(QUESTIONS_DUMMY);

export default function Quiz() {
  const [userAnsweredList, setUserAnsweredList] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(shuffledQuestions[0]);
  const [isShowSummary, setIsShowSummary] = useState(false);

  const saveAndUpdateUserAnsweredToList = useCallback((questionKey, answer, question) => {
    setUserAnsweredList([
      ...userAnsweredList,
      {
        id: questionKey,
        answer,
        question
      }
    ]);
  }, [userAnsweredList]);

  const goToNextQuestion = useCallback((id, answer, question) => {
    saveAndUpdateUserAnsweredToList(id, answer, question);

    const nextQuestionIndex = userAnsweredList.length + 1;
    if (nextQuestionIndex >= QUESTIONS_DUMMY.length) {
      setIsShowSummary(true);
      return;
    }

    setCurrentQuestion(QUESTIONS_DUMMY[nextQuestionIndex]);
  }, [userAnsweredList]);

  return (
    <div id={"quiz"}>
      {
        isShowSummary ?
          <Summary answeredList={userAnsweredList} questionList={QUESTIONS_DUMMY}/>
          :
          <Question
            id={currentQuestion.id}
            question={currentQuestion.text}
            answerList={shuffle(currentQuestion.answers)}
            onNextQuestion={goToNextQuestion}
          />
      }
    </div>
  );
}
