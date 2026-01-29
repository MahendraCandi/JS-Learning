import quizLogo from './assets/quiz-logo.png';
import Quiz from "./components/Quiz.jsx";

function App() {
  return (
    <>
      <header>
        <img src={quizLogo} alt="quiz logo"/>
        <h1>REACTQUIZ</h1>
      </header>
      <Quiz />
    </>
  );
}

export default App;
