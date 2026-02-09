import {log} from '../../log.js';
import {memo} from "react";

// ...props inside memo will always trigger a re-render.
// because in the parent, the function is passed as a prop is will have different objects every time parent rendered.
// Thus useCallback is used to wrap the function in ...props.
const IconButton = memo(function IconButton({ children, icon, ...props }) {
  log('<IconButton /> rendered', 2);

  const Icon = icon;
  return (
    <button {...props} className="button">
      <Icon className="button-icon" />
      <span className="button-text">{children}</span>
    </button>
  );
});

export default IconButton;
