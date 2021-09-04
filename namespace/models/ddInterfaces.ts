namespace App {


   export interface DragProject {
        dragStartedHandler(event: DragEvent): void;
        dragEndedHnadler(event: DragEvent): void;
      }
     export interface DragTargetProject {
        dragOverHandler(event: DragEvent): void;
        dragLeaveHnadler(event: DragEvent): void;
        dropHandler(event: DragEvent): void;
      }
}