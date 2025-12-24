import SideBar from "./components/SideBar.jsx";
import NoProjectSelectedPage from "./components/NoProjectSelectedPage.jsx";
import {useState} from "react";
import AddProjectForm from "./components/AddProjectForm.jsx";
import ProjectDetail from "./components/ProjectDetail.jsx";

const screen = Object.freeze({
  NO_PROJECT_SELECTED: 1,
  CREATE_PROJECT: 2,
  OPEN_PROJECT: 3,
})

class Project {
  constructor(title, description, date, tasks = []) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.tasks = tasks;
  }
}

function App() {
  const [mainScreen, setMainScreen] = useState(screen.NO_PROJECT_SELECTED);

  const [projects, setProjects] = useState([

    // todo delete me later
    new Project("Project 1", "Project 1 description", "2025-12-24"),
    new Project("Project 2", "Project 2 description", "2025-12-23"),
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

  const handleAddTask = (project, task) => {
    projects
      .filter((p) => p === project)
      .map((p) => p.tasks.push(task));
    setProjects([...projects]);
  }

  const handleClearTask = (project, task) => {
    projects
      .filter((p) => p === project)
      .map((p) => p.tasks.splice(p.tasks.indexOf(task), 1));
    setProjects([...projects]);
  }

  const handleDeleteProject = (project) => {
    projects.splice(projects.indexOf(project), 1);
    setProjects([...projects]);
    setSelectedProject(null);
    setMainScreen(screen.NO_PROJECT_SELECTED);
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

      {
        mainScreen === screen.OPEN_PROJECT && selectedProject !== null &&
        // <AddProjectForm handleSaveProject={handleSaveProject} project={selectedProject}  />
        <ProjectDetail project={selectedProject}
                       handleAddTask={handleAddTask}
                       handleClearTask={handleClearTask}
                       handleDeleteProject={handleDeleteProject} />
      }
    </main>
  );
}

export default App;
