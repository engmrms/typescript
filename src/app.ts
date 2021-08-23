class ProjectInput {
    templateElement:HTMLTemplateElement;
    hostElement:HTMLDivElement;
    formElement :HTMLFormElement;
    titleElement:HTMLInputElement;
    descriptionElement:HTMLInputElement;
    peopleElement:HTMLInputElement;

    constructor (){
        this.templateElement = document.getElementById("project-input")! as HTMLTemplateElement;
        this.hostElement = document.getElementById("app")! as HTMLDivElement;
        const importNode = document.importNode(this.templateElement.content,true);
        this.formElement = importNode.firstElementChild as HTMLFormElement;
        this.titleElement = this.formElement.querySelector("#title") as HTMLInputElement;
        this.descriptionElement = this.formElement.querySelector("#description") as HTMLInputElement;
        this.peopleElement = this.formElement.querySelector("#people") as HTMLInputElement;
        this.formElement.id="user-input";
        this.attached();
        this.configure();

    }

    
    private attached(){
        this.hostElement.insertAdjacentElement("afterbegin",this.formElement)
    }
    private submitHandler(event:Event){
        event.preventDefault();
        console.log(this.titleElement.value)
    }
    private configure(){
        this.formElement.addEventListener("submit",this.submitHandler.bind(this))
    }
}

const prjInput = new ProjectInput();