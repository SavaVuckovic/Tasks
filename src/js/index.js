import uniqid from 'uniqid';
import Project from './project';
import Task from './task';
import ui from './ui';
import storage from './storage';
import '../scss/main.scss';
import '../index.html';

let activeProjectID;
let projects;
let tasks;

// returns active project ID
export function getActiveProjectID() {
  return activeProjectID;
}

// set active project
export function setActiveProject(id) {
  activeProjectID = id;
  ui.renderProjects(projects, id);
  ui.renderTasks(tasks, id);
}

// create a project
export function createProject(projectObj) {
  const project = new Project(uniqid(), projectObj);
  projects.push(project);
  storage.saveProject(project);
  ui.renderProjects(projects, activeProjectID);
  ui.renderTasks(tasks, activeProjectID);
}

// delete a project
export function deleteProject(id) {
  // find project index
  projects.forEach((project, index) => {
    if (project.id === id) {
      projects.splice(index, 1);
      storage.deleteProject(id);
      ui.renderProjects(projects, activeProjectID);
    }
  });
}

// create a task
export function createTask(taskObj) {
  const task = new Task(taskObj);
  tasks.push(task);
  storage.saveTask(task);
  ui.renderTasks(tasks, activeProjectID);
}

// delete task
export function deleteTask(taskName, projectID) {
  // find task index
  tasks.forEach((task, index) => {
    if (task.title === taskName && task.projectID === projectID) {
      tasks.splice(index, 1);
      storage.deleteTask(taskName);
      ui.renderTasks(tasks, activeProjectID);
    }
  });
}

// when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // get projects and tasks from localStorage and render them
  projects = storage.fetchProjects();
  tasks = storage.fetchTasks();
  if (projects.length > 0) {
    setActiveProject(projects[0].id);
  } else {
    // create default project if localStorage is empty
    const defaultProjectObj = {
      name: 'Default Project',
      description: 'Project description goes here'
    };
    createProject(defaultProjectObj);
  }

  // add modal listeners
  ui.addEventListeners();
});
