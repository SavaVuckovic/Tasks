import Project from './project';
import Task from './task';
import ui from './ui';
import '../scss/main.scss';
import '../index.html';

const projects = [];
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

// create a project
function createProject(id, p) {
  const project = new Project(id, p);
  projects.push(project);
}

// set active project
export function setActiveProject(id) {
  activeProjectID = id;
  ui.renderProjects(projects, activeProjectID);
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
  // test
  projectsData.forEach((p, index) => {
    createProject(index, p);
  });

  setActiveProject(projects[0].id);
  ui.addEventListeners();
});