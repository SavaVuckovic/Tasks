import uniqid from 'uniqid';
import storage from './storage';

export class Project {
  constructor(id, name, description) {
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

export function setActiveProjectID(id) {
  activeProjectID = id;
}

// create a project
export function createProject(id, name, description) {
  const project = new Project(id, name, description);
  projects.push(project);
  storage.saveProject(project);
  setActiveProjectID(project.id);
}

// create a default project
export function createDefaultProject() {
  createProject(uniqid(), 'Default Project', 'Project description goes here');
}

// delete a project
export function deleteProject(id) {
  const projectToDel = projects.find(project => project.id === id);
  projects.splice(projects.indexOf(projectToDel), 1);
  storage.deleteProject(projectToDel.id);
}