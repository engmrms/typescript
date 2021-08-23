"use strict";
class ProjectInput {
    constructor() {
        this.templateElement = document.getElementById("project-input");
        this.hostElement = document.getElementById("app");
        const importNode = document.importNode(this.templateElement.content, true);
        this.formElement = importNode.firstElementChild;
        this.titleElement = this.formElement.querySelector("#title");
        this.descriptionElement = this.formElement.querySelector("#description");
        this.peopleElement = this.formElement.querySelector("#people");
        this.formElement.id = "user-input";
        this.attached();
        this.configure();
    }
    attached() {
        this.hostElement.insertAdjacentElement("afterbegin", this.formElement);
    }
    submitHandler(event) {
        event.preventDefault();
        console.log(this.titleElement.value);
    }
    configure() {
        this.formElement.addEventListener("submit", this.submitHandler.bind(this));
    }
}
const prjInput = new ProjectInput();
//# sourceMappingURL=app.js.map