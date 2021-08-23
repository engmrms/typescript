"use strict";
let addfun;
addfun = (n1, n2) => {
    return n1 + n2;
};
console.log(addfun(5, 6));
class Person {
    constructor(name) {
        this.name = name;
        this.age = 20;
    }
    greet(phrase) {
        if (this.name)
            console.log(phrase + this.name);
        else
            console.log("Hi!!!!");
    }
}
let user1;
// user1 = new Person("Mohammad");
user1 = new Person();
console.log(user1);
user1.greet("Hi i am ");
//# sourceMappingURL=interfaces.js.map