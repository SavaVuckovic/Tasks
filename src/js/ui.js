import uniqid from 'uniqid';
import formatDueDate from './date_helper';
import {
  getTasks,
  createTask,
  completeTask,
  deleteTask,
  deleteProjectTasks,
  sortTasksByPriority
} from './tasks';
import {
  getProjects,
  getActiveProjectID,
  setActiveProjectID,
  createProject,
  deleteProject
} from './projects';

// select important DOM elements
const newProject = document.querySelector('#new-project');
const newTask = document.querySelector('#new-task');
const projectList = document.querySelector('#project-list');
const tasksList = document.querySelector('#tasks-list');
const newProjectModal = document.querySelector('#new-project-modal');
const newTaskModal = document.querySelector('#new-task-modal');
const deleteModal = document.querySelector('#delete-modal');

// add event listeners
export function addEventListeners() {
  newProject.addEventListener('click', openNewProjectModal);
  newTask.addEventListener('click', openNewTaskModal);
}

// render projects
export function renderProjects(projects) {
  // clear projects list
  clearContent(projectList);
  // create project elements in the UI for each project
  const projectElements = projects.map(project => {
    const projectElem = createProjectElement(project);
    projectList.appendChild(projectElem);
  });
}

// render tasks
export function renderTasks(allTasks) {
  // clear tasks list
  clearContent(tasksList);
  // render to the UI only tasks that belong to active project
  const projectTasks = allTasks.filter(task => task.projectID === getActiveProjectID());
  const sortedTasks = sortTasksByPriority(projectTasks);
  sortedTasks.forEach(task => {
    const taskElem = createTaskElement(task);
    tasksList.appendChild(taskElem);
  });
}

// creates single project element
function createProjectElement(project) {
  // clone the template
  const projectTemplate = document.querySelector('#project-template .project');
  const newProject = projectTemplate.cloneNode(true);
  // populate with correct info
  newProject.querySelector('.name').innerText = project.name;
  newProject.querySelector('.description').innerText = project.description;
  if (project.id === getActiveProjectID()) {
    newProject.classList.add('active');
  }
  // add event listeners
  newProject.addEventListener('click', () => {
    setActiveProjectID(project.id);
    renderProjects(getProjects());
    renderTasks(getTasks());
  });
  newProject.querySelector('.fa-trash-alt').addEventListener('click', () => openDeleteModal(project.id));

  return newProject;
}

// create single task element
function createTaskElement(task) {
  // clone the template
  const taskTemplate = document.querySelector('#task-template .task');
  const newTask = taskTemplate.cloneNode(true);
  // populate with correct info, set border color based on priority
  if (task.complete) {
    newTask.classList.add('complete');
  } else {
    newTask.classList.add(task.priority);
  }
  newTask.querySelector('.title').innerText = task.title;
  newTask.querySelector('.description').innerText = task.description;
  newTask.querySelector('.due-date').innerText = `Due date: ${formatDueDate(task.dueDate)}`;
  // add event listeners
  newTask.querySelector('.fa-trash-alt').addEventListener('click', () => openDeleteModal(task));
  newTask.querySelector('.fa-check').addEventListener('click', () => {
    completeTask(task);
    renderTasks(getTasks());
  });

  return newTask;
}

// create new project form
function createNewProjectForm() {
  // clone the template
  const formTemplate = document.querySelector('#project-form-template form');
  const form = formTemplate.cloneNode(true);
  // add submit event listener
  form.addEventListener('submit', e => {
    e.preventDefault();
    // generate unique ID
    const id = uniqid();
    // extract form values
    const name = e.target.elements['name'].value;
    const description = e.target.elements['description'].value;
    // pass that object to create function & close the modal
    createProject(id, name, description);
    renderProjects(getProjects());
    renderTasks(getTasks());
    closeModal(newProjectModal);
  });

  return form;
}

// open new project modal
function openNewProjectModal() {
  // show the modal
  newProjectModal.style.display = 'block';
  // populate the modal body with a form for new project
  const body = document.querySelector('div#new-project-modal .modal-body');
  const form = createNewProjectForm();
  body.appendChild(form);
  // close button
  const close = document.querySelector('div#new-project-modal .modal-close');
  close.addEventListener('click', () => closeModal(newProjectModal));
}

// create new task form
function createNewTaskForm() {
  // clone the template
  const formTemplate = document.querySelector('#task-form-template form');
  const form = formTemplate.cloneNode(true);
  // add submit event listener
  form.addEventListener('submit', e => {
    e.preventDefault();
    // extract form values
    const taskObj = {
      projectID: getActiveProjectID(),
      title: e.target.elements['title'].value,
      description: e.target.elements['description'].value,
      dueDate: e.target.elements['due-date'].value,
      priority: e.target.elements['priority'].value,
    };
    createTask(taskObj);
    renderTasks(getTasks());
    closeModal(newTaskModal);
  });

  return form;
}

// open new task modal
function openNewTaskModal() {
  // show the modal
  newTaskModal.style.display = 'block';
  // populate the modal body with a form for new task
  const body = document.querySelector('div#new-task-modal .modal-body');
  const form = createNewTaskForm();
  body.appendChild(form);
  // close button
  const close = document.querySelector('div#new-task-modal .modal-close');
  close.addEventListener('click', () => closeModal(newTaskModal));
}

// create delete form
function createDeleteForm(callback) {
  // clone the template
  const formTemplate = document.querySelector('#delete-form-template form');
  const form = formTemplate.cloneNode(true);
  // set event listeners
  form.querySelector('#delete-btn').addEventListener('click', callback);
  form.addEventListener('submit', e => {
    e.preventDefault();
    closeModal(deleteModal);
  });

  return form;
}

// open delete modal
function openDeleteModal(item) {
  // show the modal
  deleteModal.style.display = 'block';
  // populate the modal body with delete form
  const body = document.querySelector('div#delete-modal .modal-body');
  let callbackFunc;
  if (typeof item === 'string') {
    // project ID was passed in
    callbackFunc = () => {
      deleteProject(item);
      deleteProjectTasks(item);
      renderProjects(getProjects());
      renderTasks(getTasks());
    }
  } else {
    // task object was passed in
    callbackFunc = () => {
      deleteTask(item.title);
      renderTasks(getTasks());
    };
  }
  const form = createDeleteForm(callbackFunc);
  body.appendChild(form);
  // close button
  const close = document.querySelector('div#delete-modal .modal-close');
  close.addEventListener('click', () => closeModal(deleteModal));
}

// close the modal that is passed in
function closeModal(modal) {
  // empty modal body content
  const modalBody = document.querySelector(`div#${modal.getAttribute('id')} .modal-body`);
  clearContent(modalBody);
  // hide the modal
  modal.style.display = 'none';
}

// used for clearing element contents in the UI
function clearContent(list) {
  while (list.hasChildNodes()) {
    list.removeChild(list.lastChild);
  }
}