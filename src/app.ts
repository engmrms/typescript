interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validation(validateInput: Validatable) {
  let isvalid = true;
  if (validateInput.required) {
    isvalid = isvalid && validateInput.value.toString().trim().length > 0;
  }
  if (
    validateInput.maxLength != null &&
    typeof validateInput.value === "string"
  ) {
    isvalid =
      isvalid && validateInput.value.trim().length < validateInput.maxLength;
  }
  if (
    validateInput.minLength != null &&
    typeof validateInput.value === "string"
  ) {
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

function AutoBind(
  target: any,
  methodName: string,
  decseptor: PropertyDescriptor
) {
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
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  formElement: HTMLFormElement;
  titleElement: HTMLInputElement;
  descriptionElement: HTMLInputElement;
  peopleElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;
    const importNode = document.importNode(this.templateElement.content, true);

    this.formElement = importNode.firstElementChild as HTMLFormElement;
    this.titleElement = this.formElement.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionElement = this.formElement.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleElement = this.formElement.querySelector(
      "#people"
    ) as HTMLInputElement;
    this.formElement.id = "user-input";
    this.attached();
    this.configure();
  }

  private attached() {
    this.hostElement.insertAdjacentElement("afterbegin", this.formElement);
  }

  @AutoBind
  private submitHandler(event: Event) {
    event.preventDefault();
    const eneteredValue = this.gatherUserInput();
    if (eneteredValue) {
      console.log(eneteredValue);
      this.clearEntered();
    }
  }
  private configure() {
    this.formElement.addEventListener("submit", this.submitHandler);
  }
  private gatherUserInput(): [string, string, number] | undefined {
    const enteredTitle = this.titleElement.value;
    const enteredDesc = this.descriptionElement.value;
    const enteredPeople = this.peopleElement.value;


    const titleValidation = {value:enteredTitle, required : true , minLength:3, maxLength:10};
    const descValidation = {value:enteredDesc,required : true , minLength:5};
    const peopleValidation = {value:+enteredPeople,equired : true , min:3, max:10};

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

const prjInput = new ProjectInput();
