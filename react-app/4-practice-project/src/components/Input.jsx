export default function Input({ name, label, textarea, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <div className={"flex justify-start"}>
        <label htmlFor={name}
               className={"text-sm font-bold uppercase text-stone-500"}>{label}</label>
      </div>
      {
        textarea ? <textarea name={name} {...props}/> : <input name={name} {...props}/>
      }
    </div>
  );
}
