# Module 6, apply CSS in React

## 1. Split CSS across multiple files.

Usually a component has its own CSS file.\
To use CSS, just import the file into the component.

```javascript
import './Header.css';

export default function Header() {
  return (
    <header>
      <img src={logo} alt="A canvas" />
      <h1>ReactArt</h1>
      <p>A community of artists and art-lovers.</p>
    </header>
  );
}
```

However, CSS code have a disadvantage where a rule may clash to another components.

## 2. Vanilla CSS scope is not limit to a component

Because the CSS will loaded by browser like top level.
