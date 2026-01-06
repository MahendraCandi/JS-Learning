# Module 10, Context API & useReducer Hook


Context API used to share data accross components without having to pass props down manually from parent to child components.
The idea is by act as a "wrapper" to wrap components, this wrapper can be used to stored states that can be accessed by all components.

Usually, we use lifting state up and prop drilling to pass data from parent to child components.

<img alt="mod-10-lifting-state-and-prop-drilling.png" src="img/mod-10-lifting-state-and-prop-drilling.png" width="700"/>

However, what if there are many nested components and we want to share data from a deep component to another?
If we use prop drilling, it will be very tedious to pass data from deep component to parent component.

In this case, we can use Context API.
