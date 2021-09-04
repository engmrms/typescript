var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from './base.js';
import { AutoBind } from '../decorator/autobind.js';
export class ProjectItem extends Component {
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
    AutoBind
], ProjectItem.prototype, "dragStartedHandler", null);
//# sourceMappingURL=project-item.js.map