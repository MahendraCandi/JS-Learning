import {useEffect, useState} from "react";

export default function AddProjectForm({ handleSaveProject, project }) {

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
      <form className="mt-4 text-right" action="">
        <div className={"flex justify-end gap-4 mb-[2rem]"}>
          <button className="text-stone-600 hover:text-stone-950">Cancel</button>
          <button onClick={handleSave} className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">Save</button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className={"flex justify-start"}>
              <label htmlFor="" className={"text-sm font-bold uppercase text-stone-500"}>Title</label>
            </div>
            <input type="text"
                   className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
                   name="title"
                   value={projectInput.title}
                   onChange={changeProjectInput}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className={"flex justify-start"}>
              <label htmlFor="" className={"text-sm font-bold uppercase text-stone-500"}>Description</label>
            </div>
            <textarea className="resize-y  w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
                      name="description"
                      value={projectInput.description}
                      onChange={changeProjectInput}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className={"flex justify-start"}>
              <label htmlFor="" className={"text-sm font-bold uppercase text-stone-500"}>Title</label>
            </div>
            <input type="date"
                   className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
                   name="date"
                   value={projectInput.date}
                   onChange={changeProjectInput}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
