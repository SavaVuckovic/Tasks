import uniqid from 'uniqid';
import Project from './project';
import Task from './task';
import ui from './ui';
import storage from './storage';

let projects;
let tasks;
let activeProjectID;

function initEverything() {
  // get projects and tasks from localStorage and render them
  projects = storage.fetchProjects();
  tasks = storage.fetchTasks();

  if (projects.length > 0) {
    activeProjectID = projects[0].id;
    render();
  } else {
    // create default project if localStorage is empty
    const defaultProjectObj = {
      name: 'Default Project',
      description: 'Project description goes here'
    };
    createProject(defaultProjectObj);
    render();
  }

  // add modal listeners
  ui.addEventListeners();
}

// renders projects and tasks
function render() {
  ui.renderProjects(projects, activeProjectID);
  ui.renderTasks(tasks, activeProjectID);
}

// create a project
function createProject(projectObj) {
  const project = new Project(uniqid(), projectObj);
  projects.push(project);
  storage.saveProject(project);
  render();
}

// delete a project
function deleteProject(id) {
  // find project index
  projects.forEach((project, index) => {
    if (project.id === id) {
      projects.splice(index, 1);
      storage.deleteProject(id);
      render();
    }
  });
}

// create a task
function createTask(taskObj) {
  const task = new Task(taskObj);
  tasks.push(task);
  storage.saveTask(task);
  render();
}

// delete task
function deleteTask(taskName, projectID) {
  // find task index
  tasks.forEach((task, index) => {
    if (task.title === taskName && task.projectID === projectID) {
      tasks.splice(index, 1);
      storage.deleteTask(taskName);
      render();
    }
  });
}

export default initEverything;
