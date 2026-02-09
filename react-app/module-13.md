# Optimization Techniques

## Profiling React Apps

Profiling help identify the components render. We can know why a component is re-rendering.
We can check:

1. component re-rendering by state change

    ![profiler-render-by-state-changed.png](img/profiler-render-by-state-changed.png)

2. component re-rendering by props change

    ![profiler-render-by-props.png](img/profiler-render-by-props.png)

3. component re-rendering by parent re-rendering

    ![profiler-render-by-parent-rendered.png](img/profiler-render-by-parent-rendered.png)

4. etc.

Check this one out: https://chromewebstore.google.com/detail/react-developer-tools

## memo()

Memo is a React function to skip a rendering component process.

```javascript
const Counter = memo(function Counter({ initialCount }) {
    // component creation ...
});

export default Counter;
```

After using memo, in profiling there would be info "did not client render":

![profiler-using-memo.png](img/profiler-using-memo.png)

This is because the memo will validate if there is any change in the props.
If props is still same from previous render, the memo function will prevent the component from being rendered.

Also, memo only works if only the parent component is changing.

### Don't over use memo()!

1. If use in high up component will prevent the child component from rendering.
2. checking props is expensive operation cost lot performance, will only add unnecessary check.
3. Don't use it on component where props change frequently.

## Create new component rather than use memo()

By creating a new component and delegate the state into child component, we can prevent the parent being rendered.

## memo and useCallback

Since memo only check props, what if the props is a function? 
Function inside React app will also trigger be rendered every time the component rendered.

To prevent this, we can use useCallback() to wrap the function passed into props.
useCallback will prevent a function from being re-created every time the component rendered.
Suite for function passed into props.

## useMemo

its not same as memo. If memo works on component function, useMemo is works on common function.
useMemo will memoize a result of a function. This is very useful when we have complex calculation 
and don't want to re-calculate every time the component rendered.

Different with useCallback are the useMemo will memoize the result of a function and not the function itself.

### Don't over use useMemo!

1. it will cost performance to check the dependency passed into useMemo.