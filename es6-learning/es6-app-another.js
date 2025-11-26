var GLOBAL_VAR = 'I am var object'; // since using module, this global var would be undefined because the this script was not defined on the html
let GLOBAL_LET = 'I am let object';

const SOMETHING_IMPORTANT = 'I am important';
const printMe = () => console.log('I am a function');
const anotherObject = {
    firstName: 'another',
    lastName: 'object'
};

export {GLOBAL_LET, SOMETHING_IMPORTANT, printMe, anotherObject};
