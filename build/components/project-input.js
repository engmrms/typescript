var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from './base.js';
import { AutoBind } from '../decorator/autobind.js';
import { projectState } from '../state/project-state.js';
import { validation } from '../util/validation.js';
export class ProjectInput extends Component {
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
//# sourceMappingURL=project-input.js.map