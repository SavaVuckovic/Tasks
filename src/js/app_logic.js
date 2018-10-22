import uniqid from 'uniqid';
import Project from './project';
import Task from './task';
import ui from './ui';
import storage from './storage';

let projects;
let tasks;
let activeProjectID;

export default function initEverything() {
  // get projects and tasks from localStorage and render them
  projects = storage.fetchProjects();
  tasks = storage.fetchTasks();

  if (projects.length > 0) {
    setActiveProject(projects[0].id);
  } else {
    createDefaultProject();
    render();
  }

  // add modal listeners
  ui.addEventListeners();
}

// return active project ID
export function getActiveProjectID() {
  return activeProjectID;
}

// set active project ID
export function setActiveProject(id) {
  activeProjectID = id;
  render();
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

// delete all tasks that belong to specific project
export function deleteProjectTasks(projectID) {
  const tasksToDel = tasks.filter(task => task.projectID === projectID);
  tasksToDel.forEach(task => {
    tasks.splice(tasks.indexOf(task), 1);
    storage.deleteTask(task.title);
  });
}

// create a task
export function createTask(taskObj) {
  const task = new Task(taskObj);
  tasks.push(task);
  storage.saveTask(task);
  render();
}

// delete task
export function deleteTask(taskName) {
  // find task index
  tasks.forEach((task, index) => {
    if (task.title === taskName && task.projectID === activeProjectID) {
      tasks.splice(index, 1);
      storage.deleteTask(taskName);
      render();
    }
  });
}

export function completeTask(task) {
  tasks.forEach(t => {
    if (t.title === task.title) {
      t.complete = true;
    }
  });
  storage.completeTask(task);
  render();
}

export function sortTasksByPriority(tasks) {
  const low = tasks.filter(task => task.priority === 'low' && !task.complete);
  const medium = tasks.filter(task => task.priority === 'medium' && !task.complete);
  const high = tasks.filter(task => task.priority === 'high' && !task.complete);
  const complete = tasks.filter(task => task.complete);
  return [...high, ...medium, ...low, ...complete];
}

// renders projects and tasks
function render() {
  ui.renderProjects(projects);
  ui.renderTasks(tasks);
}
