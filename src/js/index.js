import ui from './ui';
import '../scss/main.scss';
import '../index.html';

// test data
const projects = [
  {
    name: 'Example Project',
    description: 'Short project description'
  },
  {
    name: 'Another Example Project',
    description: 'Short project description'
  }
];

const tasks = [
  {
    title: 'Do Something',
    priority: 'high',
  },
  {
    title: 'Do Something',
    priority: 'high',
  },
  {
    title: 'Do Something',
    priority: 'medium',
  },
  {
    title: 'Do Something',
    priority: 'low',
  },
  {
    title: 'Do Something',
    priority: 'low',
  }
];

// when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  ui.renderProjects(projects);
  ui.renderTasks(tasks);
  ui.addEventListeners();
  // test
  ui.openDeleteModal();
});