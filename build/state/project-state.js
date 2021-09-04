import { Project, ProjectStatus } from '../models/project.js';
class State {
    constructor() {
        this.listner = [];
    }
    addListner(listnerFn) {
        this.listner.push(listnerFn);
    }
}
export class ProjectState extends State {
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
export const projectState = ProjectState.getInstance();
//# sourceMappingURL=project-state.js.map