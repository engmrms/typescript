"use strict";
var _a, _b, _c, _d;
const b1 = 5;
let x1;
x1 = {
    name: "max",
    privalge: ["test"],
    startedDate: new Date(),
};
const x2 = {
    name: "max",
    startedDate: new Date(),
};
console.log(x1);
function printEmployeeInformation(employee) {
    console.log(employee.name);
    if ("privalge" in employee)
        console.log(employee.privalge);
}
function add(a, b) {
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
    loadCargo(amount) {
        console.log("Loading Cargo ... " + amount);
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck)
        vehicle.loadCargo(5);
}
useVehicle(v1);
useVehicle(v2);
function movingAnimal(animal) {
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
if (userInput)
    userInput.value = "SALAM";
const errorBag = {
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
const empRes = (_b = (_a = empInfo) === null || _a === void 0 ? void 0 : _a.job) === null || _b === void 0 ? void 0 : _b.title;
console.log(empRes);
const userfield = "";
const feedback = (userfield !== null && userfield !== void 0 ? userfield : "Default");
console.log(feedback);
const adventurer = {
    name: "Alice",
    cat: {
        name: "Dinah",
    },
};
const dogName = (_d = (_c = adventurer) === null || _c === void 0 ? void 0 : _c.dog) === null || _d === void 0 ? void 0 : _d.name;
console.log(dogName);
//# sourceMappingURL=advancedTYpe.js.map