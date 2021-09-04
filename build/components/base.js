export class Component {
    constructor(templateId, hostId, isInsertedStart, elementId) {
        this.templateId = templateId;
        this.hostId = hostId;
        this.isInsertedStart = isInsertedStart;
        this.elementId = elementId;
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostId);
        const importNode = document.importNode(this.templateElement.content, true);
        this.elemnt = importNode.firstElementChild;
        if (elementId)
            this.elemnt.id = elementId;
        this.attach(isInsertedStart);
    }
    attach(started) {
        this.hostElement.insertAdjacentElement(started ? "afterbegin" : "beforeend", this.elemnt);
    }
}
//# sourceMappingURL=base.js.map