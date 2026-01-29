import Question from "./Question.jsx";
import QUESTIONS_DUMMY from "../questions.js";
import {useEffect, useState} from "react";

const USER_ANSWERED_KEY = "userAnsweredKey";

const getUserAnsweredList = () => {
  return JSON.parse(localStorage.getItem(USER_ANSWERED_KEY)) || []; // {id, answer}
}

const setUserAnsweredToList = (questionKey, answer) => {
  const userAnsweredList = getUserAnsweredList();
  const answeredQuestion = userAnsweredList.find(question => question.id !== questionKey);
  if (answeredQuestion === undefined) {
    userAnsweredList.push({id: questionKey, answer});
  } else {
    answeredQuestion.answer = answer;
  }
}

// todo complete local storage initializations

export default function Quiz() {
  // todo complete states
  return (
    <div id={"quiz"}>
      <Question
        question={"How do you typically render list content in React apps?"}
        answerList={["By using loop", "By using map", "By using render prop"]}
      />
    </div>
  );
}
