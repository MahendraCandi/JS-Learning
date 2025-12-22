import SideBar from "./components/SideBar.jsx";
import NoProjectSelectedPage from "./components/NoProjectSelectedPage.jsx";

function App() {
  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar />
      <NoProjectSelectedPage />
    </main>
  );
}

export default App;
