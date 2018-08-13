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
    const projects = [project];
    localStorage.setItem('projects', JSON.stringify(projects));
  } else {
    const projects = JSON.parse(localStorage.getItem('projects'));
    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));
  }
}

// save tasks to localStorage
function saveTask(task) {
  if (localStorage.getItem('tasks') === null) {
    const tasks = [task];
    localStorage.setItem('tasks', JSON.stringify([task]));
  } else {
    const tasks = fetchTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

// delete project from localStorage


// delete task from localStorage

export default {
  fetchProjects,
  fetchTasks,
  saveProject,
  saveTask
};
