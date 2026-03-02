export function Input({identifier, label, handleChange, handleInputBlur, clearErrorMessages, errorMessages, ...props}) {
  console.log(errorMessages, "input");
  return (
    <div className="control no-margin">
      <label htmlFor={identifier}>{label}</label>
      <input id={identifier} type={identifier}
             name={identifier}
             onChange={(event) => handleChange(identifier, event.target.value)}
             onBlur={event => {
               handleInputBlur(identifier, event.target.value);
             }}
             onFocus={() => {
               clearErrorMessages(identifier);
             }}
             {...props}
      />
      <div className={"control-error"}>
        {
          errorMessages[identifier].map(
            (message, index) => <p key={index}>{message}</p>)
        }
      </div>
    </div>
  );

}
