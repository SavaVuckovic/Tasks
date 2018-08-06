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
    title: 'Do Something',
    priority: 'high',
    projectID: 0
  },
  {
    title: 'Do Something',
    priority: 'medium',
    projectID: 0
  },
  {
    title: 'Do Something',
    priority: 'low',
    projectID: 1
  },
  {
    title: 'Do Something',
    priority: 'low',
    projectID: 0
  }
];

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

// when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // test
  projectsData.forEach((p, index) => {
    createProject(index, p);
  });

  setActiveProject(projects[0].id);
  ui.addEventListeners();
});