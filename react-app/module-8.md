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
