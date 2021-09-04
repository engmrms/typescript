import { ProjectInput } from './components/project-input.js';
import { ProjectList } from './components/project-list.js';
import { ProjectStatus } from './models/project.js';
const prjInput = new ProjectInput();
const activePrjList = new ProjectList(ProjectStatus.Active);
const finishedPrjList = new ProjectList(ProjectStatus.Finished);
//# sourceMappingURL=app.js.map