import '../scss/main.scss';
import '../index.html';
import storage from './storage';
import { setTasks } from './tasks';
import { 
  setProjects, 
  setActiveProjectID, 
  createDefaultProject } from './projects';
import { 
  renderProjects,
  renderTasks,
  addEventListeners 
} from './ui'

export default function initEverything() {
  // get projects and tasks from localStorage and render them
  const projects = storage.fetchProjects();
  const tasks = storage.fetchTasks();
  setProjects(projects);
  setTasks(tasks);

  if (projects.length > 0) {
    setActiveProjectID(projects[0].id);
  } else {
    createDefaultProject();
  }

  renderProjects(projects);
  renderTasks(tasks);
  // add modal listeners
  addEventListeners();
}

// when DOM is ready, initialize everything
document.addEventListener("DOMContentLoaded", initEverything);
