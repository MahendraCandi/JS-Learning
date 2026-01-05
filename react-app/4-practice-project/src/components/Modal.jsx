import {createPortal} from "react-dom";
import {useImperativeHandle, useRef} from "react";
import Button from "./Button.jsx";

export default function Modal({ref, children}) {

  const modalRef = useRef(null);
  useImperativeHandle(ref, () => {
    return {
      open() {
        modalRef.current.showModal();
      }
    }
  });

  return createPortal(
    <dialog ref={modalRef}
            className={"backdrop:bg-stone-900/90 p-4 rounded-md w-[20rem]"}>
      <div className={"flex flex-col justify-between"}>
        <div>
          {children}
        </div>

        <form method={"dialog"} className={"mt-4 text-right"}>
          <Button>Close</Button>
        </form>
      </div>
    </dialog>,
    document.getElementById('modal-root')
  );
}
