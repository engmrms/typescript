"use strict";
let arrs = [];
arrs = [5, 6, 7];
arrs = ["D", "C", 7];
function merge(a, b) {
    return Object.assign(a, b);
}
const mergedValue = merge({ name: "mohammad" }, { age: 20 });
const mergedValue2 = merge({ name: "mohammad", hobbies: ["sports"] }, { age: 20 });
console.log(mergedValue.age);
// function extractAndConvert<T extends object,U extends keyof T >(objA:T , key:U) {
function extractAndConvert(objA, key) {
    console.log("object value: " + objA[key]);
}
extractAndConvert({ name: "mohammd" }, "name");
class DataSorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    ;
    removeItem(item) {
        if (this.data.indexOf(item) === -1)
            return;
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItem() {
        return this.data;
    }
}
const textStorage = new DataSorage();
textStorage.addItem("max");
textStorage.addItem("manu");
console.log(textStorage);
const numberStorage = new DataSorage();
numberStorage.addItem(5);
numberStorage.addItem(7);
console.log(numberStorage);
const objStorage = new DataSorage();
// const objj= {name1:"mohammd"};
// objStorage.addItem(objj)
// objStorage.addItem({name1:"saleh"})
// objStorage.removeItem(objj)
// console.log(objStorage);
const names = ["mohammd", "saleh"];
function createPeroanlCard(fname, lname, agr) {
    let personalcard = {};
    personalcard.firstname = fname;
    personalcard.lastname = lname;
    personalcard.age = age;
    return personalcard;
}
//# sourceMappingURL=generics.js.map