"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function Logger(logString) {
    console.log("looger Factory");
    return function (constructor) {
        console.log("looger REndering");
        console.log(logString);
        const nconst = new constructor();
        console.log("logger function .....");
    };
}
function WithTemplate(template, hookId) {
    console.log("Template Factory");
    return function (originalConstructor) {
        return class extends originalConstructor {
            constructor(..._) {
                super();
                console.log("template  REndering");
                const hokElement = document.getElementById(hookId);
                if (hokElement) {
                    hokElement.innerHTML = template;
                    hokElement.querySelector("h1").textContent = this.name;
                }
            }
        };
    };
}
let Persons = class Persons {
    constructor() {
        this.name = "max";
        console.log(".... the inititation of class");
    }
};
Persons = __decorate([
    Logger("yes logger string......."),
    WithTemplate("<h1>my Template</h1>", "app")
], Persons);
// const pres = new Persons();
function Log(target, name) {
    console.log("proport decorated");
    console.log(target);
    console.log(name);
}
function Log2(target, name, descreptor) {
    console.log("set decorated");
    console.log(target);
    console.log(name);
    console.log(descreptor);
}
function Log3(target, name, descreptor) {
    console.log("method decorated");
    console.log(target);
    console.log(name);
    console.log(descreptor);
}
function Log4(target, name, position) {
    console.log("paramter decorated");
    console.log(target);
    console.log(name);
    console.log(position);
}
class Product {
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    set price(value) {
        value = this._price;
    }
    getPriceTax(tax) {
        return this.price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceTax", null);
function Autobind(target, methodName, descrptor) {
    const originalMethod = descrptor.value;
    const asjDescrptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return asjDescrptor;
}
class Print {
    constructor() {
        this.message = "This is work!!!";
    }
    showMessage() {
        console.log(this);
        console.log(this.message);
    }
}
__decorate([
    Autobind
], Print.prototype, "showMessage", null);
const pr = new Print();
pr.showMessage();
const btn = document.querySelector("button");
btn.addEventListener("click", pr.showMessage);
const registerValidation = {};
function Test(target, propName) {
    var _a, _b;
    registerValidation[target.constructor.name] = Object.assign(Object.assign({}, registerValidation[target.constructor.name]), { [propName]: [
            ...((_b = (_a = registerValidation[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propName]) !== null && _b !== void 0 ? _b : []),
            "required",
        ] });
}
function Positive(target, propName) {
    var _a, _b;
    registerValidation[target.constructor.name] = Object.assign(Object.assign({}, registerValidation[target.constructor.name]), { [propName]: [
            ...((_b = (_a = registerValidation[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propName]) !== null && _b !== void 0 ? _b : []),
            "positive",
        ] });
}
function validate(obj) {
    const objValidator = registerValidation[obj.constructor.name];
    let invalid = true;
    if (!objValidator)
        return true;
    for (const prop in objValidator) {
        for (const validItem of objValidator[prop]) {
            switch (validItem) {
                case "required":
                    invalid = invalid && !!obj[prop];
                    break;
                case "positive":
                    invalid = invalid && obj[prop] > 0;
                    break;
            }
        }
    }
    return invalid;
}
class Course {
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
__decorate([
    Test
], Course.prototype, "title", void 0);
__decorate([
    Positive
], Course.prototype, "price", void 0);
const formEl = document.querySelector("form");
formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const titleEl = document.getElementById("title");
    const priceEl = document.getElementById("price");
    const title = titleEl.value;
    const price = +priceEl.value;
    const createCourse = new Course(title, price);
    if (!validate(createCourse)) {
        alert("Invalid Form");
        return;
    }
    console.log(createCourse);
});
//# sourceMappingURL=decorated.js.map