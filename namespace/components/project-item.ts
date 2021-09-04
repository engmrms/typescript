/// <reference path="base.ts" />
/// <reference path="../models/ddInterfaces.ts" />
/// <reference path="../models/project.ts" />

namespace App{

    

export class ProjectItem
extends Component<HTMLUListElement, HTMLLIElement>
implements   DragProject
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
  event.dataTransfer!.setData("text/plain", this.project.id);
  event.dataTransfer!.effectAllowed = "move";
}
dragEndedHnadler(event: DragEvent) {
  //console.log("end", event);
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

}