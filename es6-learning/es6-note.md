## 1. let

1. var can be called from outside of script by using `window` object
2. let only can be called inside of scope
3. let cannot be declared twice in the same scope
4. let will error if used as hoisting
   ```javascript
   // let will throw error if used as hoisting
   // console.log(hoistVariable); // es6-app.js:18 Uncaught ReferenceError: Cannot access 'hoistVariable' before initialization
   let hoistVariable = 'hello';
   // hoist very useful for declaring functions
   ```

5. let TDZ (Temporal Dead Zone)
   ```javascript
    // Temporal Dead Zone
    // notice the message variable inside the function below
    { // enter new scope, TDZ starts
        let log = function () {
            console.log(message); // message declared later
        };

        // This is the TDZ and accessing log
        // would cause a ReferenceError.
        // if called log() before message is declared
        // log(); // Uncaught ReferenceError: Cannot access 'message' before initialization

        let message= 'TDZ'; // TDZ ends
        log(); // called outside TDZ
    }
   ```

## 2. const

> in Java same like final

1. cannot be reassigned
2. scope is block scoped
3. should be initialized
   ```javascript
   const RED; // will throw error
   ```

4. const will create an immutable object, however, the properties can still be re-initialized
    ```javascript
    const person = {
        name: 'John',
        age: 30
    };
    console.log("const person age: ", person.age);
    person.age = 31;
    console.log("const person age after re-initialize: ", person.age);
    ```

5. to make properties immutable, use `Object.freeze()`
    ```javascript
    Object.freeze(person);
    person.age = 32; // will be ignored
    console.log("const person age after object freeze: ", person.age);
    ```
   
6. array declared with const cannot be reassigned, but its elements can be modified
    ```javascript
    const arr = [1, 2, 3];
    arr.push(4);
    console.log("const arr after push: ", arr);
    ```
   
7. using const inside a loop
    ```javascript
    const arr2 = [1, 2, 3];
    for (const a of arr2) { // can use const or let here
        console.log("loop using of: ", a);
    }
    ```
## 3. function

1. default function parameters

    ```javascript
    function say(message = 'I am default message') {
        console.log(message);
    }
    say();
    say('I am changing the default message by passing value in as argument');
    ```

2. pass `undefined` to use default param

    ```javascript
    function makeTechStack(mainStream = 'java', backend = 'java', frontend = 'reactjs') {
        console.log(
            "Multiple default parameters passing - undefined to keep use the default one. Mainstream: ", mainStream,
            ", backend: ", backend,
            ", frontend: ", frontend);
    }
    makeTechStack(undefined, undefined, 'vuejs');
    ```
   
3. arguments evaluated at the time the function called

    ```javascript
    function putToy(toy, toyBox = []) {
        toyBox.push(toy);
        return toyBox;
    }
    console.log("evaluate arguments at the time the function called:")
    console.log(putToy('Toy Story'));
    console.log(putToy('Buzz Light Year')); // not [Toy Story, but Buzz Light Year]
    ```
   
4. use function as default parameter

    ```javascript
    function today(d = currentDate()) {
        console.log(d);
    }
    
    function currentDate() {
        return (new Date()).toDateString();
    }
    today();
    ```
   
5. parameter guard using function

    ```javascript
    function addWithValidation(a = requiredArgument(), b = requiredArgument()) {
        return a + b;
    }
    
    function requiredArgument() {
        throw new Error('missing argument!');
    }
    
    // console("guard the argument using function: ", addWithValidation(10)); // will throw error missing argument!
    console.log("guard the argument using function: ", addWithValidation(10, 20));
    
    ```
   
6. using other parameters as default parameter
    
    ```javascript
    // using other parameters as default parameter
    function addWithParameterAsDefaultParameter(a = 2, b = a, c = a + b) {
        return a + b + c;
    }
    console.log("using other parameters as default parameter. parameter signature (a = 2, b = a, c = a + b) ", addWithParameterAsDefaultParameter(10));
    ```
   
7. call `argument` object inside a function

    ```javascript
    function checkArgumentsObject(a, b = 1, c = 2) {
        console.log("arguments object inside a function scope: ", arguments);
        return a + b + c;
    }
    
    console.log('check the arguments object passed to the function:')
    console.log('pass 1 argument')
    checkArgumentsObject(10);
    console.log('pass 2 argument')
    checkArgumentsObject(10, 20);
    console.log('pass 3 argument')
    checkArgumentsObject(10, 20, 30);
    ```
   
### 4. rest parameter `...`

1. use `...` to collect all the remaining parameters into an array

    ```javascript
    const mixIngredient = (egg, meat, ...vegetables) => {
        console.log("rest parameter using mixIngredient function: ", egg, meat, vegetables);
    }
    mixIngredient('chicken', 'cow', 1, 'potato', 2, 'onion');
    ```

### 5. spread operator `...`

1. use `...` to expand elements of an array into individual parameters
    
    ```javascript
    const arr3 = [1, 2, 3];
    const arr4 = [...arr3, 4, 5]; //
    console.log("spread operator using arr3: ", arr3);
    console.log("spread operator using arr4: ", arr4); // will print [1, 2, 3, 4, 5]
    ```
   
2. spread array into function parameters
    
    ```javascript
    function subtractTwoVariable(a, b) {
        return a - b;
    }
    
    console.log("spread use to pass element inside array into function: ", subtractTwoVariable(...[10, 20]));
    ```
   
3. copy array into new array

    ```javascript
    const arr7 = [1, 2, 3];
    const arr8 = [...arr7];
    console.log("spread use to copy array `const arr8 = [...arr7]`: ", arr8);
    ```

4. copy properties of an object into new properties of an object
    
    ```javascript
    const obj1 = {
        name: 'John',
        age: 30
    };
    const obj2 = {
        ...obj1,
        address: '123 Main St'
    };
    console.log("spread use to copy object `const obj2 = {...obj1}`: ", obj2);
    ```
   
## 6. Object Literal

> a pattern to create Javascript object

1. Object property initializer shorthand
* Before ES6 object literal was a collection of name-value pairs.

```javascript
function createMachine(name, status) {
    return {
        name: name,
        status: status
    };
}
```

* In ES6, simplify the syntax into:

```javascript
// notice the remove colon (:)
function createMachine(name, status) {
    return {
        name,
        status
    };
}

// or
let name = 'chain saw';
let status = 'working';
let chainSaw = { name, status }
```

2. Computed property name
* Before ES6, use bracket notation as property name. Means, very useful for dynamic property name with space also.

```javascript
let myLaptop = "My Laptop"
let laptop = {
    [myLaptop]: 'HP PRO',
    'price': 100000
}
console.log(laptop[myLaptop]);
```

* In ES6, it can use **expression** as property name.

```javascript
const fieldPrefix = 'data#';
let myUniform = "The uniform"
let uniform = {
    [fieldPrefix + myUniform]: 'White Clothes',
    [fieldPrefix + 'color']: 'blue white'
}
console.log(uniform);
console.log(uniform[fieldPrefix + myUniform]);
```

3. Concise method syntax
* Before ES6, defining method inside object literal was very should specify name and full function.

```javascript
let car6point3 = {
    'name': 'ESEMKA',
    'distance': 56000,
    'distanceConvert': function(unit) {
        return this.distance / unit;
    }
}

console.log(car6point3);
console.log(car6point3.distanceConvert(1000));
```

* In ES6, it simplify the function specified inside object literal:

```javascript
let car6point3part2 = {
    'name': 'ESEMKA',
    'distance': 56000,
    'distanceConvert'(unit) {
        return this.distance / unit;
    },
    'another distance convert'(unit) {
        return this.distance / unit;
    }
}

console.log(car6point3part2);
console.log(car6point3part2.distanceConvert(1000));
console.log(car6point3part2['another distance convert'](100));

```

## 7. Array destructing

1. Array destructing
* Before ES6, array should be called one by one to extract into a variable.

```javascript
let scoreSevenPointOne = [100, 200, 500];

let firstScore = scoreSevenPointOne[0],
secondScore = scoreSevenPointOne[1],
threeScore = scoreSevenPointOne[2];

console.log({firstScore, secondScore, threeScore});

```

* In ES6, it simplify by using destructing syntax:

let scoreSevenPointOneTwo = [100, 200, 500];
let [firstScore, secondScore, threeScore] = scoreSevenPointOneTwo;
console.log({firstScore, secondScore, threeScore});

> Note that the square brackets [] look like the array syntax but they are not.

2. Array Destructuring Assignment and Rest syntax

* use rest three dots `...` to collect all the remaining parameters into a new array object

```javascript
let scoreSevenPointOne = [100, 200, 500, 600, 1000];

let [x, y, ...scores] = scoreSevenPointOne;
console.log({x, y, scores}); // {x: 100, y: 200, scores: Array(3)}
```

3. Default value

* It is possible to set default value for new object inside the bracket signs

```javascript
let scoreSevenPointThree = [, , 600];
let [sevenThreeA= 1, sevenThreeB = 2, sevenThreeC = 0] = scoreSevenPointThree;
console.log({sevenThreeA, sevenThreeB, sevenThreeC}); // {"sevenThreeA": 1, "sevenThreeB": 2, "sevenThreeC": 600}
```

4. Fallback value

* It is possibe to set a fallback value for array source if arrays is return null

```javascript
// notice the double pipe sign
let scoreSevenPointFour = null;
let [firstFour = 1, secondFour = 2, threeFour = 3] = scoreSevenPointFour || [];
console.log({firstFour, secondFour, threeFour}); // {"firstFour": 1,"secondFour": 2,"threeFour": 3}
```

5. Nested destructuring

```javascript
function getProfile() {
    return [
        'John',
        'Doe',
        ['Red', 'Green', 'Blue']
    ];
}

let [
    firstName,
    lastName,
    [
        color1,
        color2,
        color3
    ]
] = getProfile();

console.log(color1, color2, color3); // Red Green Blue
```

6. Swapping variables

* Easy swapping variables inside array

```javascript
let a = 10, 
    b = 20;

[a, b] = [b, a];

console.log(a); // 20
console.log(b); // 10
```

7. Function that return multiple types value

```javascript
const scoreSevenPointSeven = () => {
    return [
        100 + 10,
        "ABCD",
        { 'name': 'John' }
    ]
};

let [s77A, s77B, s77C] = scoreSevenPointSeven();
console.log({s77A, s77B, s77C}); // {"s77A": 110, "s77B": "ABCD", "s77C": {"name": "John"}}
```

## 8. Object Destructuring

* Before ES6, to assigning a properties into a variable, the properties should be called one by one.

```javascript
let person = {
    name: 'John',
    age: 30
}

let name = person.name;
let age = person.age;
```

1. Destructing object

Notice the variable `fName` and `lName`, they are representing the new variable name.
The variable `firstName` and `lastName` are the properties inside the object.

```javascript
const eight1 = {
    firstName: 'John',
    lastName: 'Doe',
}

let {firstName: fName, lastName: lName} = eight1;
console.log(fName);
console.log(lName);
```

Additionally, the object literal above can be simplified using by removing the name-value pattern.
But, only if properties between source and target are the same.

```javascript
const eight1 = {
    firstName: 'John',
    lastName: 'Doe',
}

let {firstName, lastName} = eight1;
console.log(firstName);
console.log(lastName);
```

2. Default value

```javascript
const eight1 = {
    firstName: 'John',
    lastName: 'Doe',
}

let {firstName: firstName2, lastName: lastName2, currentAge: age = 18} = eight1;
console.log(firstName2);
console.log(lastName2);
console.log(age);
```
3. Destructing a null object

Notice the double pipe sign `||` to set a fallback value if the object is null.
Useful to avoid error `Uncaught TypeError: Cannot destructure property 'name83' of 'eight3(...)' as it is null.`.

```javascript
const eight3 = null;
let {name83, age83} = eight3 || {};
console.log(name83);
console.log(age83);
```

4. Nested destructuring

```javascript
const eight1 = {
    firstName: 'John',
    lastName: 'Doe',
    company: {
        companyName: 'ABC Company',
        address: '123 Main St'
    }
}

let {company: { companyName: theCompanyName, address: theAddress }, company} = eight1;
console.log(theCompanyName);
console.log(theAddress);
console.log(company);
```
