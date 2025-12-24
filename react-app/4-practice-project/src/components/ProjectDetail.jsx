import {useState} from "react";

export default function ProjectDetail({project, handleAddTask, handleClearTask, handleDeleteProject}) {
  const [task, setTask] = useState('');

  const d = new Date(project.date);
  const formatedProjectDate = d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const submitAddTask = () => {
    if (task === '') return;
    handleAddTask(project, task);
    setTask('');
  }

  return (
    <>
      <div className={"w-[35rem] mt-16 flex flex-col gap-4"}>
        <div className={"flex justify-between"}>
          <h2 className={"text-3xl font-bold text-stone-700 mt-4"}>
            {project.title}
          </h2>
          <button className={"text-stone-700 hover:text-red-500"}
                  onClick={() => handleDeleteProject(project)}>
            Delete
          </button>
        </div>
        <p className={"font-bold text-stone-400 text-xl mb-4"}>
          {formatedProjectDate}
        </p>
        <textarea className={"resize-y  w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"}
                  value={project.description} />

        <hr className={"my-2 border-stone-200 border-2"}/>

        <h3 className={"text-3xl font-bold text-stone-700 mb-2"}>Tasks</h3>
        <div className={"flex justify-start gap-4"}>
          <input type="text"
                 className={"w-[16rem] h-7 bg-stone-200"}
                 value={task}
                 onChange={(event) => setTask(event.target.value)}/>
          <p>
            <button className={"h-7"} onClick={submitAddTask}>Add Task</button>
          </p>
        </div>
        <div>

          {
            project.tasks.length === 0 ?
              <p>
                This Project doesn't have any tasks yet.
              </p>
              :
              <ul className={"bg-stone-200 p-2 rounded-md"}>
                {
                  project.tasks.map((t) => (
                    <li className={"my-5"} key={t}>
                      <div className={"flex justify-between px-3"}>
                        <p>{t}</p>
                        <button onClick={() => handleClearTask(project, t)}>Clear</button>
                      </div>
                    </li>
                  ))
                }
              </ul>
          }
        </div>
      </div>
    </>
  );
}
