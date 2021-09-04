 
import {Project,ProjectStatus} from '../models/project.js'     


type Listner<T> = (items: T[]) => void;

class State<T> {
  protected listner: Listner<T>[] = [];

  addListner(listnerFn: Listner<T>) {
    this.listner.push(listnerFn);
  }
}

export class ProjectState extends State<Project> {
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
    this.updateListener();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((prj) => prj.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListener();
    }
  }

  private updateListener() {
    for (const listnerfn of this.listner) {
      listnerfn(this.projects.slice());
    }
  }
}

export const projectState = ProjectState.getInstance();
 