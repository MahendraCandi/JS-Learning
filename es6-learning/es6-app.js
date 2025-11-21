// let vs var

// define var in another js file
// and call inside this file via window object
console.log('call var through window object: ' + window.GLOBAL_VAR);
console.log('call let through window object, the result should be undefined: ' + window.GLOBAL_LET);

// let cannot be declared twice in the same scope
let declareTwice = 'hello';
// let declareTwice = 'world';
// console.log(declareTwice); // Uncaught SyntaxError: Identifier 'declareTwice' has already been declared
// var can be declared twice in the same scope
// var x = 0;
// var x = 1
// console.log(x);

// let will throw error if used as hoisting
// console.log(hoistVariable); // es6-app.js:18 Uncaught ReferenceError: Cannot access 'hoistVariable' before initialization
let hoistVariable = 'hello';
// hoist very useful for declaring functions

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

// const
// 1. cannot be reassigned
// 2. scope is block scoped
// 3. should be initialized
//    const RED; // will throw error

// const and object
// const will create an immutable object, however, the properties can still be re-initialized
const person = {
    name: 'John',
    age: 30
};
console.log("const person age: ", person.age);
person.age = 31;
console.log("const person age after re-initialize: ", person.age);
// to make properties immutable, use Object.freeze()
Object.freeze(person);
person.age = 32; // will be ignored
console.log("const person age after object freeze: ", person.age);
// however, the object freeze will only freeze properties inside object
// NOT the nested object as properties
const nestedObject = {
    name: 'John',
    age: 30,
    address: {
        street: '123 Main St',
        city: 'New York'
    }
};
Object.freeze(nestedObject);
console.log("nested object freeze: ", nestedObject.address.street);
nestedObject.address.street = '456 Main St';
console.log("nested object freeze after re-initialize:", nestedObject.address.street);

// const and array
// similar to const and object, the array element can be modified but not reassigned the array itself
const arr = [1, 2, 3];
arr.push(4);
console.log("const arr after push: ", arr);

// const and loop
const arr2 = [1, 2, 3];
for (const a of arr2) { // can use const or let here
    console.log("loop using of: ", a);
}

// default function parameters
function say(message = 'I am default message') {
    console.log(message);
}
say();
say('I am changing the default message by passing value in as argument');

// pass `undefined` to use default param
function makeTechStack(mainStream = 'java', backend = 'java', frontend = 'reactjs') {
    console.log(
        "Multiple default parameters passing - undefined to keep use the default one. Mainstream: ", mainStream,
        ", backend: ", backend,
        ", frontend: ", frontend);
}
makeTechStack(undefined, undefined, 'vuejs');

// arguments evaluated at the time the function called
function putToy(toy, toyBox = []) {
    toyBox.push(toy);
    return toyBox;
}
console.log("evaluate arguments at the time the function called:")
console.log(putToy('Toy Story'));
console.log(putToy('Buzz Light Year')); // not [Toy Story, but Buzz Light Year]

// default parameter can use a function
console.log('default parameter can use a function:')
function today(d = currentDate()) {
    console.log(d);
}

function currentDate() {
    return (new Date()).toDateString();
}
today();

// guard the argument using function
function addWithValidation(a = requiredArgument(), b = requiredArgument()) {
    return a + b;
}

function requiredArgument() {
    throw new Error('missing argument!');
}

// console("guard the argument using function: ", addWithValidation(10)); // will throw error missing argument!
console.log("guard the argument using function: ", addWithValidation(10, 20));

// using other parameters as default parameter
function addWithParameterAsDefaultParameter(a = 2, b = a, c = a + b) {
    return a + b + c;
}
console.log("using other parameters as default parameter. parameter signature (a = 2, b = a, c = a + b) ", addWithParameterAsDefaultParameter(10));

// the arguments object inside a function scope
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

// rest parameter, a three dot (...)
// to define indefinite number of arguments
const mixIngredient = (egg, meat, ...vegetables) => {
    console.log("rest parameter using mixIngredient function: ", egg, meat, vegetables);
}
mixIngredient('chicken', 'cow', 1, 'potato', 2, 'onion');

// not only used by rest, the three dots also used by spread operator
const arr3 = [1, 2, 3];
const arr4 = [...arr3, 4, 5];
console.log("spread operator using arr3: ", arr3);
console.log("spread operator using arr4: ", arr4);

// spread use to pass element inside array into function
function subtractTwoVariable(a, b) {
    return a - b;
}

console.log("spread use to pass element inside array into function: ", subtractTwoVariable(...[10, 20]));

// push all elements inside array into another array
const arr5 = [1, 2, 3];
const arr6 = [4, 5];
arr5.push(...arr6);
console.log("spread use to push all elements inside array into another array: `arr5.push(...arr6)` ", arr5);

// copy array
const arr7 = [1, 2, 3];
const arr8 = [...arr7];
console.log("spread use to copy array `const arr8 = [...arr7]`: ", arr8);

// spread use to copy object properties
const obj1 = {
    name: 'John',
    age: 30
};
const obj2 = {
    ...obj1,
    address: '123 Main St'
};
console.log("spread use to copy object `const obj2 = {...obj1}`: ", obj2);

