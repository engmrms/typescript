"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class ProjectState {
    constructor() {
        this.listner = [];
        this.projects = [];
    }
    static getInstance() {
        if (!this.instance)
            this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title, description, numPeople) {
        const newProject = {
            id: Math.random(),
            title: title,
            desciption: description,
            people: numPeople
        };
        this.projects.push(newProject);
        for (const listnerfn of this.listner) {
            listnerfn(this.projects.slice());
        }
    }
    addListner(listnerFn) {
        this.listner.push(listnerFn);
    }
}
const projectState = ProjectState.getInstance();
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
        if (Array.isArray(eneteredValue)) {
            const [title, desc, people] = eneteredValue;
            projectState.addProject(title, desc, people);
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
class ProjectList {
    constructor(type) {
        this.type = type;
        this.assginedProjects = [];
        this.templateElement = document.getElementById("project-list");
        this.hostElement = document.getElementById("app");
        const importNode = document.importNode(this.templateElement.content, true);
        this.elemnt = importNode.firstElementChild;
        this.elemnt.id = `${this.type}-projects`;
        projectState.addListner((projects) => {
            this.assginedProjects = projects;
            this.renderProjects();
        });
        this.attach();
        this.renderContent();
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-project-list`);
        for (const prjItem of this.assginedProjects) {
            const listItem = document.createElement("li");
            listItem.textContent = prjItem.title;
            listEl.appendChild(listItem);
        }
    }
    renderContent() {
        const listId = `${this.type}-project-list`;
        this.elemnt.querySelector("ul").id = listId;
        this.elemnt.querySelector("h2").textContent = `${this.type.toUpperCase()} PROJECTS`;
    }
    attach() {
        this.hostElement.insertAdjacentElement("beforeend", this.elemnt);
    }
}
const prjInput = new ProjectInput();
const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");
//# sourceMappingURL=app.js.map