// get projects from localStorage
function fetchProjects() {
  const projects = localStorage.getItem('projects') === null ? [] : JSON.parse(localStorage.getItem('projects'));
  return projects;
}

// get tasks from localStorage
function fetchTasks() {
  const tasks = localStorage.getItem('tasks') === null ? [] : JSON.parse(localStorage.getItem('tasks'));
  return tasks;
}

// save projects to localStorage
function saveProject(project) {
  if (localStorage.getItem('projects') === null) {
    const projects = [];
    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));
  } else {
    const projects = JSON.parse(localStorage.getItem('projects'));
    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));
  }
}

// save tasks to localStorage


// delete task project localStorage


// delete task from localStorage

export default {
  fetchProjects,
  fetchTasks,
  saveProject
};
