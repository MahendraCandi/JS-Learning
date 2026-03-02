import {useState} from "react";

export function Input({identifier, label, handleChange, handleInputBlur, isValid, errorMessage, ...props}) {
  const [isEdit, setIsEdit] = useState(false);
  const [isTouch, setIsTouch] = useState(false)
  return (
    <div className="control no-margin">
      <label htmlFor={identifier}>{label}</label>
      <input id={identifier} type={identifier}
             name={identifier}
             onChange={(event) => handleChange(identifier, event.target.value)}
             onBlur={event => {
               handleInputBlur(identifier, event.target.value);
               setIsEdit(false);
             }}
             onFocus={() => {
               setIsEdit(true);
               setIsTouch(true);
             }}
             {...props}
      />
      <div className={"control-error"}>
        {
          isTouch && !isEdit && !isValid && <p>{errorMessage}</p>
        }
      </div>
    </div>
  );

}
