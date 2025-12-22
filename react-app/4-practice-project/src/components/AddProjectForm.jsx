// todo fix me!
export default function AddProjectForm() {
  return (
    <form>
      <div>
        <button>Cancel</button>
        <button>Save</button>
      </div>
      <div>
        <div>
          <label htmlFor="">Title</label>
          <input type="text"/>
        </div>

        <div>
          <label htmlFor="">Description</label>
          <input type="text"/>
        </div>

        <div>
          <label htmlFor="">Due Date</label>
          <input type="date"/>
        </div>
      </div>
    </form>
  );
}
