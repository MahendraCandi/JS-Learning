import Player from './components/Player.jsx';
import {TimeChallenge} from "./components/TimeChallenge.jsx";

function App() {
  return (
    <>
      <Player />
      <div id="challenges">
        <TimeChallenge title={"Easy"} targetTime={5} />
        <TimeChallenge title={"Not Easy"} targetTime={10} />
        <TimeChallenge title={"Getting Tough"} targetTime={20} />
        <TimeChallenge title={"PROS only"} targetTime={30} />
      </div>
    </>
  );
}

export default App;
