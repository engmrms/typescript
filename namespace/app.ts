//drag & drop Interfaces

/// <reference path="components/project-input.ts" />
/// <reference path="components/project-list.ts" />

namespace App{
 

const prjInput = new ProjectInput();

const activePrjList = new ProjectList(ProjectStatus.Active);
const finishedPrjList = new ProjectList(ProjectStatus.Finished);

}