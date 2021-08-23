"use strict";
const arr = [1, 2, 3, 4, 5];
const person = {
    firstname: "mohammad",
    age: 20,
};
function summation(...arg) {
    return arg.reduce((currSum, currvalue) => {
        return (currSum += currvalue);
    }, 0);
}
console.log(summation(1, 2, 3, 4, 5));
const [numb1, numb2, ...restnumb] = arr;
const { firstname: username, age } = person;
console.log(...restnumb);
console.log(username);
const copyPerson = Object.assign({}, person);
console.log(copyPerson.age);
const copyArr = [...arr, 6];
console.log(copyArr);
console.log(summation(...copyArr));
const additionalArr = [];
additionalArr.push(...arr);
//# sourceMappingURL=nexGen.js.map