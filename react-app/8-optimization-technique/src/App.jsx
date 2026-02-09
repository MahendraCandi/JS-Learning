import { useState } from 'react';

import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import { log } from './log.js';
import CounterConfiguration from "./components/UI/CounterConfiguration.jsx";

function App() {
  log('<App /> rendered');

  const [chosenCount, setChosenCount] = useState(0);

  // Using key in component can trigger a re-render when key value is changes.
  // very useful when we want to trigger child component being re-render after parent state changes.
  return (
    <>
      <Header />
      <main>
        <CounterConfiguration onEvent={setChosenCount} />
        <Counter key={chosenCount} initialCount={chosenCount} />
      </main>
    </>
  );
}

export default App;
