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
  // find project index
  projects.forEach((project, index) => {
    if (project.id === id) {
      projects.splice(index, 1);
      storage.deleteProject(id);
      // also delete all tasks belonging to that project
      tasks.forEach((task, index) => {
        if (task.projectID === id) {
          tasks.splice(index, 1);
          storage.deleteTask(task.title);
        }
      });
    }
  });
  setActiveProject(0);
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
  const low = [];
  const medium = [];
  const high = [];
  const complete = [];

  tasks.forEach(task => {
    if (task.complete) {
      complete.push(task);
    } else if (task.priority === 'low') {
      low.push(task);
    } else if (task.priority === 'medium') {
      medium.push(task);
    } else if (task.priority === 'high') {
      high.push(task);
    }
  });

  return [...high, ...medium, ...low, ...complete];
}

// renders projects and tasks
function render() {
  ui.renderProjects(projects);
  ui.renderTasks(tasks);
}
