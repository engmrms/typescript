type Combinable = string | number;
type Numerical = number | boolean;

type Universal = Combinable & Numerical;
const b1: Universal = 5;

type Admin = {
  name: string;
  privalge?: string[];
};

type User = {
  name: string;
  startedDate: Date;
};

type AdminUser = Admin & User;

let x1: AdminUser;
x1 = {
  name: "max",
  privalge: ["test"],
  startedDate: new Date(),
};
const x2: AdminUser = {
  name: "max",
  startedDate: new Date(),
};
console.log(x1);

function printEmployeeInformation(employee: Admin | User) {
  console.log(employee.name);
  if ("privalge" in employee) console.log(employee.privalge);
}
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;

function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string")
    return a.toString() + a.toString();
  return a + b;
}

const result = add("mohammad ", "saleh");
result.split(" ");

printEmployeeInformation(x2);

class Car {
  drive() {
    console.log("Drive ....");
  }
}
class Truck {
  drive() {
    console.log("Truck Drive ....");
  }
  loadCargo(amount: number) {
    console.log("Loading Cargo ... " + amount);
  }
}
type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) vehicle.loadCargo(5);
}

useVehicle(v1);
useVehicle(v2);

interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

function movingAnimal(animal: Bird | Horse) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
      break;
  }
  console.log("Animal Speed .." + speed);
  //if ("runningSpeed" in animal)
  //console.log("Animal Speed .." + animal.runningSpeed);
}

movingAnimal({ type: "horse", runningSpeed: 500 });

// const userInput = <HTMLInputElement>document.getElementById("userInput")!;
// const userInput = document.getElementById("userInput")! as HTMLInputElement;
// userInput.value = "SALAM";

const userInput = document.getElementById("userInput");
if (userInput) (userInput as HTMLInputElement).value = "SALAM";

type ErrorContainer = {
  [prop: string]: string;
};

const errorBag: ErrorContainer = {
  email: "Invlid Email",
  username: "Should started with letter",
};

const empInfo = {
  name: "mohammad",
  age: 25,
  job: {
    //   title: "CEO",
    desciption: "this is my job",
  },
};
// const empRes = empInfo?.job?.title;
// console.log(empRes);

const userfield = "";
const feedback = userfield ?? "Default";
console.log(feedback);

const adventurer = {
  name: "Alice",
  cat: {
    name: "Dinah",
  },
};

// const dogName = adventurer?.dog?.name;
// console.log(dogName);
