 import {Component} from './base.js';
 import {AutoBind} from '../decorator/autobind.js';
 import {projectState} from '../state/project-state.js';
 import {validation} from '../util/validation.js';
    
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleElement: HTMLInputElement;
    descriptionElement: HTMLInputElement;
    peopleElement: HTMLInputElement;
  
    constructor() {
      super("project-input", "app", true, "user-input");
  
      this.titleElement = this.elemnt.querySelector("#title") as HTMLInputElement;
      this.descriptionElement = this.elemnt.querySelector(
        "#description"
      ) as HTMLInputElement;
      this.peopleElement = this.elemnt.querySelector(
        "#people"
      ) as HTMLInputElement;
  
      this.configure();
    }
    configure() {
      this.elemnt.addEventListener("submit", this.submitHandler);
    }
    renderContent() {}
  
    @AutoBind
    private submitHandler(event: Event) {
      event.preventDefault();
      const eneteredValue = this.gatherUserInput();
      if (Array.isArray(eneteredValue)) {
        const [title, desc, people] = eneteredValue;
        projectState.addProject(title, desc, people);
        this.clearEntered();
      }
    }
    private gatherUserInput(): [string, string, number] | undefined {
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
  
      if (
        !validation(titleValidation) ||
        !validation(descValidation) ||
        !validation(peopleValidation)
      ) {
        alert("Invalid entered fields ....");
        return;
      } else {
        return [enteredTitle, enteredDesc, +enteredPeople];
      }
    }
    private clearEntered() {
      this.titleElement.value = "";
      this.descriptionElement.value = "";
      this.peopleElement.value = "";
    }
  }
  
 