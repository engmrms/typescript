"use strict";
//drag & drop Interfaces
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//Project Type
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus["Active"] = "active";
    ProjectStatus["Finished"] = "finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}
class State {
    constructor() {
        this.listner = [];
    }
    addListner(listnerFn) {
        this.listner.push(listnerFn);
    }
}
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (!this.instance)
            this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title, description, numPeople) {
        const newProject = new Project(Math.random().toString(), title, description, numPeople, ProjectStatus.Active);
        this.projects.push(newProject);
        for (const listnerfn of this.listner) {
            listnerfn(this.projects.slice());
        }
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
        isvalid = isvalid && validateInput.value <= validateInput.max;
    }
    if (validateInput.min != null && typeof validateInput.value === "number") {
        isvalid = isvalid && validateInput.value >= validateInput.min;
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
class Component {
    constructor(templateId, hostId, isInsertedStart, elementId) {
        this.templateId = templateId;
        this.hostId = hostId;
        this.isInsertedStart = isInsertedStart;
        this.elementId = elementId;
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostId);
        const importNode = document.importNode(this.templateElement.content, true);
        this.elemnt = importNode.firstElementChild;
        if (elementId)
            this.elemnt.id = elementId;
        this.attach(isInsertedStart);
    }
    attach(started) {
        this.hostElement.insertAdjacentElement(started ? "afterbegin" : "beforeend", this.elemnt);
    }
}
class ProjectItem extends Component {
    constructor(hostId, project) {
        super("single-project", hostId, false, project.id);
        this.project = project;
        this.renderContent();
        this.configure();
    }
    get persons() {
        if (this.project.people === 1)
            return "1 person";
        return `${this.project.people} persons`;
    }
    dragStartedHandler(event) {
        console.log("start", event);
    }
    dragEndedHnadler(event) {
        console.log("end", event);
    }
    renderContent() {
        this.elemnt.querySelector("h2").textContent = this.project.title;
        this.elemnt.querySelector("h3").textContent = this.persons + " assigned";
        this.elemnt.querySelector("p").textContent = this.project.description;
    }
    configure() {
        this.elemnt.addEventListener("dragstart", this.dragStartedHandler);
        this.elemnt.addEventListener("dragend", this.dragEndedHnadler);
    }
}
__decorate([
    AutoBind
], ProjectItem.prototype, "dragStartedHandler", null);
class ProjectInput extends Component {
    constructor() {
        super("project-input", "app", true, "user-input");
        this.titleElement = this.elemnt.querySelector("#title");
        this.descriptionElement = this.elemnt.querySelector("#description");
        this.peopleElement = this.elemnt.querySelector("#people");
        this.configure();
    }
    configure() {
        this.elemnt.addEventListener("submit", this.submitHandler);
    }
    renderContent() { }
    submitHandler(event) {
        event.preventDefault();
        const eneteredValue = this.gatherUserInput();
        if (Array.isArray(eneteredValue)) {
            const [title, desc, people] = eneteredValue;
            projectState.addProject(title, desc, people);
            this.clearEntered();
        }
    }
    gatherUserInput() {
        const enteredTitle = this.titleElement.value;
        const enteredDesc = this.descriptionElement.value;
        const enteredPeople = this.peopleElement.value;
        const titleValidation = {
            value: enteredTitle,
            required: true,
            minLength: 3,
            maxLength: 50,
        };
        const descValidation = { value: enteredDesc, required: true, minLength: 5 };
        const peopleValidation = {
            value: +enteredPeople,
            equired: true,
            min: 1,
            max: 10,
        };
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
class ProjectList extends Component {
    constructor(type) {
        super("project-list", "app", false, `${type}-projects`);
        this.type = type;
        this.assginedProjects = [];
        this.configure();
        this.renderContent();
    }
    configure() {
        projectState.addListner((projects) => {
            const relativeProject = projects.filter((item) => item.status === this.type);
            this.assginedProjects = relativeProject;
            this.renderProjects();
        });
    }
    renderContent() {
        const listId = `${this.type}-project-list`;
        this.elemnt.querySelector("ul").id = listId;
        this.elemnt.querySelector("h2").textContent = `${this.type
            .toString()
            .toUpperCase()} PROJECTS`;
    }
    renderProjects() {
        const listId = `${this.type}-project-list`;
        const listEl = document.getElementById(listId);
        listEl.innerHTML = "";
        for (const prjItem of this.assginedProjects) {
            new ProjectItem(listId, prjItem);
        }
    }
}
const prjInput = new ProjectInput();
const activePrjList = new ProjectList(ProjectStatus.Active);
const finishedPrjList = new ProjectList(ProjectStatus.Finished);
//# sourceMappingURL=app.js.map