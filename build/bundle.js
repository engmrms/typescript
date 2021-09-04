var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("components/base", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Component = void 0;
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
    exports.Component = Component;
});
define("decorator/autobind", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AutoBind = void 0;
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
    exports.AutoBind = AutoBind;
});
define("models/project", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Project = exports.ProjectStatus = void 0;
    var ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus["Active"] = "active";
        ProjectStatus["Finished"] = "finished";
    })(ProjectStatus = exports.ProjectStatus || (exports.ProjectStatus = {}));
    class Project {
        constructor(id, title, description, people, status) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.people = people;
            this.status = status;
        }
    }
    exports.Project = Project;
});
define("state/project-state", ["require", "exports", "models/project"], function (require, exports, project_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.projectState = exports.ProjectState = void 0;
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
            const newProject = new project_js_1.Project(Math.random().toString(), title, description, numPeople, project_js_1.ProjectStatus.Active);
            this.projects.push(newProject);
            this.updateListener();
        }
        moveProject(projectId, newStatus) {
            const project = this.projects.find((prj) => prj.id === projectId);
            if (project && project.status !== newStatus) {
                project.status = newStatus;
                this.updateListener();
            }
        }
        updateListener() {
            for (const listnerfn of this.listner) {
                listnerfn(this.projects.slice());
            }
        }
    }
    exports.ProjectState = ProjectState;
    exports.projectState = ProjectState.getInstance();
});
define("util/validation", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validation = void 0;
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
    exports.validation = validation;
});
define("components/project-input", ["require", "exports", "components/base", "decorator/autobind", "state/project-state", "util/validation"], function (require, exports, base_js_1, autobind_js_1, project_state_js_1, validation_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectInput = void 0;
    class ProjectInput extends base_js_1.Component {
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
                project_state_js_1.projectState.addProject(title, desc, people);
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
            if (!validation_js_1.validation(titleValidation) ||
                !validation_js_1.validation(descValidation) ||
                !validation_js_1.validation(peopleValidation)) {
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
        autobind_js_1.AutoBind
    ], ProjectInput.prototype, "submitHandler", null);
    exports.ProjectInput = ProjectInput;
});
define("models/ddInterfaces", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("components/project-item", ["require", "exports", "components/base", "decorator/autobind"], function (require, exports, base_js_2, autobind_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectItem = void 0;
    class ProjectItem extends base_js_2.Component {
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
            event.dataTransfer.setData("text/plain", this.project.id);
            event.dataTransfer.effectAllowed = "move";
        }
        dragEndedHnadler(event) {
            //console.log("end", event);
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
        autobind_js_2.AutoBind
    ], ProjectItem.prototype, "dragStartedHandler", null);
    exports.ProjectItem = ProjectItem;
});
define("components/project-list", ["require", "exports", "components/base", "decorator/autobind", "state/project-state", "components/project-item"], function (require, exports, base_js_3, autobind_js_3, project_state_js_2, project_item_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectList = void 0;
    class ProjectList extends base_js_3.Component {
        constructor(type) {
            super("project-list", "app", false, `${type}-projects`);
            this.type = type;
            this.assginedProjects = [];
            this.configure();
            this.renderContent();
        }
        dragLeaveHnadler(_) {
            const listEl = this.elemnt.querySelector("ul");
            listEl.classList.remove("droppable");
        }
        dropHandler(event) {
            const projectId = event.dataTransfer.getData("text/plain");
            project_state_js_2.projectState.moveProject(projectId, this.type);
        }
        dragOverHandler(event) {
            var _a;
            if (event.dataTransfer && ((_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.types[0]) === "text/plain") {
                event.preventDefault();
                const listEl = this.elemnt.querySelector("ul");
                listEl.classList.add("droppable");
            }
        }
        configure() {
            this.elemnt.addEventListener("dragover", this.dragOverHandler);
            this.elemnt.addEventListener("dragleave", this.dragLeaveHnadler);
            this.elemnt.addEventListener("drop", this.dropHandler);
            project_state_js_2.projectState.addListner((projects) => {
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
                new project_item_js_1.ProjectItem(listId, prjItem);
            }
        }
    }
    __decorate([
        autobind_js_3.AutoBind
    ], ProjectList.prototype, "dragLeaveHnadler", null);
    __decorate([
        autobind_js_3.AutoBind
    ], ProjectList.prototype, "dropHandler", null);
    __decorate([
        autobind_js_3.AutoBind
    ], ProjectList.prototype, "dragOverHandler", null);
    exports.ProjectList = ProjectList;
});
define("app", ["require", "exports", "components/project-input", "components/project-list", "models/project"], function (require, exports, project_input_js_1, project_list_js_1, project_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const prjInput = new project_input_js_1.ProjectInput();
    const activePrjList = new project_list_js_1.ProjectList(project_js_2.ProjectStatus.Active);
    const finishedPrjList = new project_list_js_1.ProjectList(project_js_2.ProjectStatus.Finished);
});
//# sourceMappingURL=bundle.js.map