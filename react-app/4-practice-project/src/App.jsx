import SideBar from "./components/SideBar.jsx";
import NoProjectSelectedPage from "./components/NoProjectSelectedPage.jsx";
import {useState} from "react";
import AddProjectForm from "./components/AddProjectForm.jsx";

const screen = Object.freeze({
  NO_PROJECT_SELECTED: 1,
  CREATE_PROJECT: 2,
  OPEN_PROJECT: 3,
})

class Project {
  constructor(title, description, date) {
    this.title = title;
    this.description = description;
    this.date = date;
  }
}

function App() {
  const [mainScreen, setMainScreen] = useState(screen.NO_PROJECT_SELECTED);

  const [projects, setProjects] = useState([
    new Project("Project 1", "Project 1 description", "2021-01-01"),
    new Project("Project 2", "Project 2 description", "2021-01-01"),
  ]);

  const [selectedProject, setSelectedProject] = useState();

  const handleSaveProject = (title, description, date) => {
    setProjects((prevState) => {
      return [
        ...prevState,
        new Project(title, description, date)
      ]
    });
    setSelectedProject(null);
    setMainScreen(screen.NO_PROJECT_SELECTED);
  }

  const handleOpenProject = (project) => {
    setSelectedProject(project);
    setMainScreen(screen.OPEN_PROJECT);
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar projects={projects} handleOpenProject={handleOpenProject}
               setMainScreen={() => setMainScreen(screen.CREATE_PROJECT)} />

      {mainScreen === screen.NO_PROJECT_SELECTED &&
        <NoProjectSelectedPage
          setMainScreen={() => setMainScreen(screen.CREATE_PROJECT)}/>
      }

      {mainScreen === screen.CREATE_PROJECT &&
        <AddProjectForm handleSaveProject={handleSaveProject} project={null}  />}

      {mainScreen === screen.OPEN_PROJECT && selectedProject !== null &&
        <AddProjectForm handleSaveProject={handleSaveProject} project={selectedProject}  />}
    </main>
  );
}

export default App;
