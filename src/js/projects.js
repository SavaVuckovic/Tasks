export class Project {
  constructor(id, { name, description }) {
    this.id = id
    this.name = name;
    this.description = description;
  }
}

let projects;
let activeProjectID;

export function getProjects() {
  return projects;
}

export function setProjects(projectsArray) {
  projects = projectsArray;
}

export function getActiveProjectID() {
  return activeProjectID;
}

export function setActiveProject(id) {
  activeProjectID = id;
}

// create a project
export function createProject(projectObj) {
  const project = new Project(uniqid(), projectObj);
  projects.push(project);
  storage.saveProject(project);
  setActiveProject(project.id);
}

// create a default project
export function createDefaultProject() {
  const defaultProjectObj = {
    name: 'Default Project',
    description: 'Project description goes here'
  };
  createProject(defaultProjectObj);
}

// delete a project
export function deleteProject(id) {
  const projectToDel = projects.filter(project => project.id === id);
  projects.splice(projects.indexOf(projectToDel), 1);
  storage.deleteProject(projectToDel.id);
  setActiveProject(0);
}