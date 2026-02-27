import Header from './components/Header.jsx';
import Login from './components/Login.jsx';

// todo
//  1. DONE - avoid form submit default behavior by adding onSubmit on tag form
//  2. try binding form using multiple state, one object in state, and using ref
//  3. try binding form with many inputs using FormData
//  4. explain the different button with type submit and type button
function App() {
  return (
    <>
      <Header />
      <main>
        <Login />
      </main>
    </>
  );
}

export default App;
