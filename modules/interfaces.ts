// type Person = {
//   name: string;
//   age: number;
//   greet(phrase: string): void;
// };
// type AddFn = (n1: number, n2: number) => number;
interface AddFn {
  (n1: number, n2: number): number;
}

let addfun: AddFn;
addfun = (n1: number, n2: number) => {
  return n1 + n2;
};
console.log(addfun(5, 6));

interface Named {
  readonly name?: string;
  outputName?: string;
}
interface Greeting extends Named {
  greet(phrase: string): void;
}

class Person implements Greeting {
  age: number = 20;
  constructor(public name?: string) {}
  greet(phrase: string) {
    if (this.name) console.log(phrase + this.name);
    else console.log("Hi!!!!");
  }
}

let user1: Greeting;
// user1 = new Person("Mohammad");
user1 = new Person();

console.log(user1);
user1.greet("Hi i am ");
