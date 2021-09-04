namespace App{
    
  export  abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
      
}