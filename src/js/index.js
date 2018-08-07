import uniqid from 'uniqid';
import Project from './project';
import Task from './task';
import ui from './ui';
import storage from './storage';
import '../scss/main.scss';
import '../index.html';

let projects;
let activeProjectID;

// test data
const projectsData = [
  {
    name: 'Example Project',
    description: 'Short project description'
  },
  {
    name: 'Another Example Project',
    description: 'Short project description'
  }
];

const tasksData = [
  {
    title: 'Do Something',
    priority: 'high',
    projectID: 0
  },
  {
    title: 'Do Something 2',
    priority: 'high',
    projectID: 0
  },
  {
    title: 'Do Something 3',
    priority: 'medium',
    projectID: 0
  },
  {
    title: 'Do Something 4',
    priority: 'low',
    projectID: 1
  },
  {
    title: 'Do Something 5',
    priority: 'low',
    projectID: 0
  }
];

// returns active project ID
export function getActiveProjectID() {
  return activeProjectID;
}

// set active project
export function setActiveProject(id) {
  activeProjectID = id;
  ui.renderProjects(projects, activeProjectID);
  ui.renderTasks(tasksData, activeProjectID);
}

// create a project
export function createProject(projectObj) {
  const project = new Project(uniqid(), projectObj);
  projects.push(project);
  storage.saveProject(project);
  ui.renderProjects(projects, activeProjectID);
  ui.renderTasks(tasksData, activeProjectID);
}

// create a task
export function createTask(taskObj) {
  const task = new Task(taskObj);
  tasksData.push(taskObj);
  ui.renderTasks(tasksData, activeProjectID);
}

// delete task
export function deleteTask(taskName, projectID) {
  // find task index
  tasksData.forEach(task => {
    if (task.title === taskName && task.projectID === projectID) {
      const index = tasksData.indexOf(task);
      tasksData.splice(index, 1);
      ui.renderTasks(tasksData, activeProjectID);
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
    const defaultProjectObj = {
      name: 'Default Project',
      description: 'Project description goes here'
    };
    createProject(defaultProjectObj);
  }

  // add modal listeners
  ui.addEventListeners();
});
