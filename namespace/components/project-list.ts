/// <reference path="base.ts"/>
/// <reference path="../decorator/autobind.ts"/>
/// <reference path="../state/project-state.ts"/>
/// <reference path="../models/ddInterfaces.ts"/>
/// <reference path="../models/project.ts"/>


namespace App{
    
    

export class ProjectList
extends Component<HTMLDivElement, HTMLElement>
implements DragTargetProject
{
private assginedProjects: Project[] = [];

constructor(private type: ProjectStatus) {
  super("project-list", "app", false, `${type}-projects`);

  this.configure();
  this.renderContent();
}
@AutoBind
dragLeaveHnadler(_: DragEvent) {
  const listEl = this.elemnt.querySelector("ul")!;
  listEl.classList.remove("droppable");
}
@AutoBind
dropHandler(event: DragEvent) {
  const projectId = event.dataTransfer!.getData("text/plain");
  projectState.moveProject(projectId, this.type);
}
@AutoBind
dragOverHandler(event: DragEvent) {
  if (event.dataTransfer && event.dataTransfer?.types[0] === "text/plain") {
    event.preventDefault();
    const listEl = this.elemnt.querySelector("ul")!;
    listEl.classList.add("droppable");
  }
}

configure() {
  this.elemnt.addEventListener("dragover", this.dragOverHandler);
  this.elemnt.addEventListener("dragleave", this.dragLeaveHnadler);
  this.elemnt.addEventListener("drop", this.dropHandler);
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

}