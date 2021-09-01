//drag & drop Interfaces

interface DragProject {
  dragStartedHandler(event: DragEvent): void;
  dragEndedHnadler(event: DragEvent): void;
}
interface DropProject {
  dragOverHandler(event: DragEvent): void;
  dragLeaveHnadler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
}

//Project Type
enum ProjectStatus {
  Active = "active",
  Finished = "finished",
}
class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

type Listner<T> = (items: T[]) => void;

class State<T> {
  protected listner: Listner<T>[] = [];

  addListner(listnerFn: Listner<T>) {
    this.listner.push(listnerFn);
  }
}

class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (!this.instance) this.instance = new ProjectState();

    return this.instance;
  }

  addProject(title: string, description: string, numPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject);

    for (const listnerfn of this.listner) {
      listnerfn(this.projects.slice());
    }
  }
}

const projectState = ProjectState.getInstance();

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
    isvalid = isvalid && validateInput.value <= validateInput.max;
  }

  if (validateInput.min != null && typeof validateInput.value === "number") {
    isvalid = isvalid && validateInput.value >= validateInput.min;
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

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  elemnt: U;

  constructor(
    public templateId: string,
    public hostId: string,
    public isInsertedStart: boolean,
    public elementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    ) as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostId) as T;
    const importNode = document.importNode(this.templateElement.content, true);
    this.elemnt = importNode.firstElementChild as U;
    if (elementId) this.elemnt.id = elementId;
    this.attach(isInsertedStart);
  }
  private attach(started: boolean) {
    this.hostElement.insertAdjacentElement(
      started ? "afterbegin" : "beforeend",
      this.elemnt
    );
  }

  abstract renderContent(): void;
  abstract configure(): void;
}

class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements DragProject
{
  private project: Project;

  get persons() {
    if (this.project.people === 1) return "1 person";
    return `${this.project.people} persons`;
  }
  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;
    this.renderContent();
    this.configure();
  }
  @AutoBind
  dragStartedHandler(event: DragEvent) {
    console.log("start", event);
  }
  dragEndedHnadler(event: DragEvent) {
    console.log("end", event);
  }
  renderContent() {
    this.elemnt.querySelector("h2")!.textContent = this.project.title;
    this.elemnt.querySelector("h3")!.textContent = this.persons + " assigned";
    this.elemnt.querySelector("p")!.textContent = this.project.description;
  }
  configure() {
    this.elemnt.addEventListener("dragstart", this.dragStartedHandler);
    this.elemnt.addEventListener("dragend", this.dragEndedHnadler);
  }
}

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  private assginedProjects: Project[] = [];

  constructor(private type: ProjectStatus) {
    super("project-list", "app", false, `${type}-projects`);

    this.configure();
    this.renderContent();
  }

  configure() {
    projectState.addListner((projects: Project[]) => {
      const relativeProject = projects.filter(
        (item) => item.status === this.type
      );
      this.assginedProjects = relativeProject;
      this.renderProjects();
    });
  }

  renderContent() {
    const listId = `${this.type}-project-list`;
    this.elemnt.querySelector("ul")!.id = listId;
    this.elemnt.querySelector("h2")!.textContent = `${this.type
      .toString()
      .toUpperCase()} PROJECTS`;
  }

  private renderProjects() {
    const listId = `${this.type}-project-list`;
    const listEl = document.getElementById(listId)! as HTMLUListElement;
    listEl.innerHTML = "";
    for (const prjItem of this.assginedProjects) {
      new ProjectItem(listId, prjItem);
    }
  }
}

const prjInput = new ProjectInput();

const activePrjList = new ProjectList(ProjectStatus.Active);
const finishedPrjList = new ProjectList(ProjectStatus.Finished);
