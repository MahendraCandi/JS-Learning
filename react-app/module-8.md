# Module 8, Ref and DOM

To hold a state but without triggering a render.
Very useful to bind a DOM.

## Using ref to manipulate element (DOM)

This example show how to trigger click on input with type 'file' using ref.
In CSS file, the input type 'file' has been hidden from the screen.
But, the component should call the function when a button is clicked.

Thus, ref is very useful to hold element information.

```javascript
// CSS:
// input[type='file'] {
//   display: none;
// }

function App() {
    const filePicker = React.useRef();

    function handle() {
        // trigger click on input 'file'
        filePicker.current.click();
    }

  return (
    <div id="app">
      <p>Please select an image</p>
      <p>
        // this input 'file' is hidden
        // this element will binding to ref because of 'ref' property
        <input ref={filePicker} data-testid="file-picker" type="file" accept="image/*" />

        // the onClick function will trigger click on file 'input'
        <button onClick={handle}>Pick Image</button>
      </p>
    </div>
  );
}

export default App;
```

## ref cannot trigger a render

We can change the ref value in realtime but we cannot show it in the interface.
It is because no render was trigger, like using useState.

However, we can still log the value using console.

```javascript
export default function Player() {

  // instantiate a ref variable
  // this ref will bind to element input text
  // because of the binding, this ref will have exact information with the input element
  const nameRef = useRef(null);

  // a function to see information that ref had.
  // the nameRef.current will has exact information with the input.
  let nameOnChangeRef = (e) => {
    console.log(nameRef.current.value);
  };

  return (
    <section id="player">
      // try to print the ref value into screen, but it will not be appeared
      // because there is no render page.
      <h2>Ref value: {nameRef.current ? nameRef.current.value : ''}</h2>
      <p>
        <input type="text"
               ref={nameRef}
               onChange={nameOnChangeRef} />
      </p>
    </section>
  );
}
```

## using forwardRef for old React version (18 and below)

When passing a ref to a component, in React 19 and above, we can just passed it like other props.
However, in React 18 and below, we need to wrap the component using forwardRef to pass the ref into our component.

New React version (19 and above). Just define the ref as a prop.

`dialog` is an HTML element that can be used as a modal dialog.
Has a built-in function showModal() to show the dialog.
In this example, the showModal() will be called in the parent component using ref.

```javascript
export default function ResultModal({ ref, result, targetTime }) {
  return (
    <dialog ref={ref}>
    ...
    </dialog>
  );
}
```

Old React version (18 and below).

Notice that the example passing the ref by using forwardRef.
The forwardRef function accept two parameters: the properties and the ref.

```javascript

const ResultModal = forwardRef(( { result, targetTime }, ref) => {
  return (
    <dialog ref={ref}>
    ...
    </dialog>
  );
});

export default ResultModal;
```

Example of using the ref in parent component.

```javascript

export default function App() {
  const dialogModalRef = useRef(null);

  function stopTimer() {
    dialogModalRef.current.showModal();
  }

  return (
    <>
    ...
    <ResultModal ref={dialogModalRef} />
    <button onClick={stopTimer}>Stop Timer</button>
    ...
    </>
  );

}
```

## Using useImperativeHandle

When we want to bind an element but only expose specific properties or functions to the parent component
or we want to have single responsibility for the element.

`inputRef` is representing the input element
second parameter is a function return a custom object.

This custom object has functions that will exposed to parent component
by using the custom object, we can have full control over the element that will be bound to the parent component
example we want to change the dialog element to div. the parent element then don't need to adjust the ref.current to div.

```javascript
export default function ResultModal({ ref, result, targetTime }) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      // custom function that will exposed to parent component
      open() {
        // if dialog element is changed to div, then open() function should be adjusted to manipulate div.
        // but the parent component doesn't need to be adjusted. they only know open() function.
        inputRef.current.showModal();
      }
    }
  });

  return (
    <dialog ref={inputRef}>
    ...
    </dialog>
  );
}
```

This is example of how parent will use the child component.\
As a result, if the child component change to div, the parent component will not need to change.

```javascript

export default function App() {
  const dialogModalRef = useRef(null);

  function stopTimer() {
    dialogModalRef.current.open(); // call custom function open()
  }

  return (
    <>
    ...
    <ResultModal ref={dialogModalRef} />
    <button onClick={stopTimer}>Stop Timer</button>
    ...
    </>
  );

}
```

## Using portal

Used to render a component into DOM outside of the parent component.
Useful when we want to avoid nested rendering for that component.
Example good for rendering a modal dialog from nested child components into index.html.

The example below is rendering a html dialog element into modal div inside index.html.

```javascript
import {createPortal} from "react-dom";

export default function ResultModal() {
  return createPortal(
    <dialog ref={inputRef}>
    ...
    </dialog>,
    document.getElementById('modal') // this ID is defined in index.html
  );
}
```

The parent component which called the ResultModal component.

```javascript
export default function TimeChallenge() {
  return (
    <>
    ...
    <ResultModal />
    ...
    </>
  );
}
```

```javascript
function App() {
  return (
    <>
      <Player />
      <div id="challenges">
        <TimeChallenge />
        <TimeChallenge />
        <TimeChallenge />
        <TimeChallenge />
      </div>
    </>
  );
}
export default App;
```

```javascript
// script main.jsx
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

As a result, ResultModal will appear under modal div not inside each TimeChallenge component.

```html
// index.html
<html lang="en">
  <head>
    <title>Refs & Portals</title>
  </head>
  <body>
    <div id="modal"></div>
    <div id="root"></div>
    </div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```
