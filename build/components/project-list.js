var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from './base.js';
import { AutoBind } from '../decorator/autobind.js';
import { projectState } from '../state/project-state.js';
import { ProjectItem } from './project-item.js';
export class ProjectList extends Component {
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
        projectState.moveProject(projectId, this.type);
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
        projectState.addListner((projects) => {
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
            new ProjectItem(listId, prjItem);
        }
    }
}
__decorate([
    AutoBind
], ProjectList.prototype, "dragLeaveHnadler", null);
__decorate([
    AutoBind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    AutoBind
], ProjectList.prototype, "dragOverHandler", null);
//# sourceMappingURL=project-list.js.map