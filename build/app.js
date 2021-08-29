"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function validation(validateInput) {
    let isvalid = true;
    if (validateInput.required) {
        isvalid = isvalid && validateInput.value.toString().trim().length > 0;
    }
    if (validateInput.maxLength != null &&
        typeof validateInput.value === "string") {
        isvalid =
            isvalid && validateInput.value.trim().length < validateInput.maxLength;
    }
    if (validateInput.minLength != null &&
        typeof validateInput.value === "string") {
        isvalid =
            isvalid && validateInput.value.trim().length > validateInput.minLength;
    }
    if (validateInput.max != null && typeof validateInput.value === "number") {
        isvalid = isvalid && validateInput.value < validateInput.max;
    }
    if (validateInput.min != null && typeof validateInput.value === "number") {
        isvalid = isvalid && validateInput.value > validateInput.min;
    }
    return isvalid;
}
function AutoBind(target, methodName, decseptor) {
    const originalMethod = decseptor.value;
    const adjDescreptor = {
        configurable: true,
        enumerable: false,
        get() {
            const bounded = originalMethod.bind(this);
            return bounded;
        },
    };
    return adjDescreptor;
}
class ProjectInput {
    constructor() {
        this.templateElement = document.getElementById("project-input");
        this.hostElement = document.getElementById("app");
        const importNode = document.importNode(this.templateElement.content, true);
        this.formElement = importNode.firstElementChild;
        this.titleElement = this.formElement.querySelector("#title");
        this.descriptionElement = this.formElement.querySelector("#description");
        this.peopleElement = this.formElement.querySelector("#people");
        this.formElement.id = "user-input";
        this.attached();
        this.configure();
    }
    attached() {
        this.hostElement.insertAdjacentElement("afterbegin", this.formElement);
    }
    submitHandler(event) {
        event.preventDefault();
        const eneteredValue = this.gatherUserInput();
        if (eneteredValue) {
            console.log(eneteredValue);
            this.clearEntered();
        }
    }
    configure() {
        this.formElement.addEventListener("submit", this.submitHandler);
    }
    gatherUserInput() {
        const enteredTitle = this.titleElement.value;
        const enteredDesc = this.descriptionElement.value;
        const enteredPeople = this.peopleElement.value;
        const titleValidation = { value: enteredTitle, required: true, minLength: 3, maxLength: 10 };
        const descValidation = { value: enteredDesc, required: true, minLength: 5 };
        const peopleValidation = { value: +enteredPeople, equired: true, min: 3, max: 10 };
        if (!validation(titleValidation) ||
            !validation(descValidation) ||
            !validation(peopleValidation)) {
            alert("Invalid entered fields ....");
            return;
        }
        else {
            return [enteredTitle, enteredDesc, +enteredPeople];
        }
    }
    clearEntered() {
        this.titleElement.value = "";
        this.descriptionElement.value = "";
        this.peopleElement.value = "";
    }
}
__decorate([
    AutoBind
], ProjectInput.prototype, "submitHandler", null);
const prjInput = new ProjectInput();
//# sourceMappingURL=app.js.map