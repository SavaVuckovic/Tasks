import uniqid from 'uniqid';
import Project from './project';
import Task from './task';
import ui from './ui';
import storage from './storage';
import '../scss/main.scss';
import '../index.html';

let activeProjectID;
let projects = [];
let tasks = [];

// returns active project ID
export function getActiveProjectID() {
  return activeProjectID;
}

// set active project
export function setActiveProject(id) {
  activeProjectID = id;
  ui.renderProjects(projects, activeProjectID);
  ui.renderTasks(tasks, activeProjectID);
}

// create a project
export function createProject(projectObj) {
  const project = new Project(uniqid(), projectObj);
  projects.push(project);
  storage.saveProject(project);
  ui.renderProjects(projects, activeProjectID);
  ui.renderTasks(tasks, activeProjectID);
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
  tasks.forEach(task => {
    if (task.title === taskName && task.projectID === projectID) {
      const index = tasks.indexOf(task);
      tasks.splice(index, 1);
      ui.renderTasks(tasks, activeProjectID);
    }
  });
}

// when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // get projects from localStorage and render them
  projects = storage.fetchProjects();
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

  // get tasks from localStorage and render them
  tasks = storage.fetchTasks();
  if (tasks.length > 0) {
    ui.renderTasks(tasks, getActiveProjectID)
  }

  // add modal listeners
  ui.addEventListeners();
});
