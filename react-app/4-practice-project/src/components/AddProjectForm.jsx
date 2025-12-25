import {useEffect, useState} from "react";
import Input from "./Input.jsx";

export default function AddProjectForm({ handleSaveProject, handleCancelSaveProject, project }) {

  const [projectInput, setProjectInput] = useState({
    title: '',
    description: '',
    date: ''
  })

  useEffect(() => {
    if (project !== null) {
      setProjectInput({
        title: project.title,
        description: project.description,
        date: project.date
      })
    }
  }, [project])

  function handleSave() {
    handleSaveProject(
      projectInput.title,
      projectInput.description,
      projectInput.date);
  }

  function changeProjectInput(e) {
    setProjectInput(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    });
  }

  return (
    <div className="w-[35rem] mt-16">
      <form className="mt-4 text-right" action="" onSubmit={ (e) => e.preventDefault()}>
        <div className={"flex justify-end gap-4 mb-[2rem]"}>
          <button onClick={handleCancelSaveProject} className="text-stone-600 hover:text-stone-950">Cancel</button>
          <button onClick={handleSave} className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">Save</button>
        </div>

        <div className="flex flex-col gap-4">
          <Input name={"title"} label="Title"
                 type="text"
                 className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
                 value={projectInput.title}
                 onChange={changeProjectInput}
          />
          <Input name={"description"} label="Description" textarea={true}
                 className="resize-y  w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
                 value={projectInput.description}
                 onChange={changeProjectInput}
          />
          <Input name={"date"} label="Due Date"
                 type="date"
                 className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
                 value={projectInput.date}
                 onChange={changeProjectInput}
          />
        </div>
      </form>
    </div>
  );
}
