import {
  setActiveProject,
  getActiveProjectID,
  createProject,
  deleteProject,
  createTask,
  deleteTask,
} from './app_logic';

// select important DOM elements
const newProject = document.querySelector('#new-project');
const newTask = document.querySelector('#new-task');
const projectList = document.querySelector('#project-list');
const tasksList = document.querySelector('#tasks-list');
const newProjectModal = document.querySelector('#new-project-modal');
const newTaskModal = document.querySelector('#new-task-modal');
const deleteModal = document.querySelector('#delete-modal');

// used for clearing projects/tasks in the UI
function clearList(list) {
  while (list.hasChildNodes()) {
    list.removeChild(list.lastChild);
  }
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
  newProject.addEventListener('click', () => setActiveProject(project.id));
  newProject.querySelector('.fa-trash-alt').addEventListener('click', () => openDeleteModal(project.id));

  return newProject;
}

// render projects
function renderProjects(projects) {
  // clear projects list
  clearList(projectList);
  // create project elements in the UI for each project
  const projectElements = projects.map(project => {
    const projectElem = createProjectElement(project);
    projectList.appendChild(projectElem);
  });
}

// create single task element
function createTaskElement(task) {
  // clone the template
  const taskTemplate = document.querySelector('#task-template .task');
  const newTask = taskTemplate.cloneNode(true);
  // populate with correct info, set border color based on priority
  newTask.classList.add(task.priority);
  newTask.querySelector('.title').innerText = task.title;
  // add delete event listener
  newTask.querySelector('.fa-trash-alt').addEventListener('click', () => openDeleteModal(task));

  return newTask;
}

// render tasks
function renderTasks(tasks, activeProjectID) {
  // clear tasks list
  clearList(tasksList);
  // render to the UI only tasks that belong to active project
  tasks
    .filter(task => task.projectID === getActiveProjectID())
    .forEach(task => {
      const taskElem = createTaskElement(task);
      tasksList.appendChild(taskElem);
    });
}

// create new project form
function createNewProjectForm() {
  const form = document.createElement('form');
  // name input
  const nameInput = document.createElement('input');
  nameInput.setAttribute('type', 'text');
  nameInput.setAttribute('name', 'name');
  nameInput.setAttribute('placeholder', 'Project Name');
  nameInput.required = true;
  // description input
  const descriptionInput = document.createElement('input');
  descriptionInput.setAttribute('type', 'text');
  descriptionInput.setAttribute('name', 'description');
  descriptionInput.setAttribute('placeholder', 'Project Description');
  descriptionInput.required = true;
  // submit button
  const submit = document.createElement('button');
  submit.setAttribute('type', 'submit');
  submit.innerText = 'Create';
  // populate form
  form.appendChild(nameInput);
  form.appendChild(descriptionInput);
  form.appendChild(submit);
  // when form is submitted
  form.addEventListener('submit', e => {
    e.preventDefault();
    // extract form values
    const projectObj = {
      name: e.target.elements['name'].value,
      description: e.target.elements['description'].value,
    };
    // pass that object to create function & close the modal
    createProject(projectObj);
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
  const form = document.createElement('form');
  // title input
  const titleInput = document.createElement('input');
  titleInput.setAttribute('type', 'text');
  titleInput.setAttribute('name', 'title');
  titleInput.setAttribute('placeholder', 'Task Title');
  titleInput.required = true;
  // description input
  const descriptionInput = document.createElement('input');
  descriptionInput.setAttribute('type', 'text');
  descriptionInput.setAttribute('name', 'description');
  descriptionInput.setAttribute('placeholder', 'Task Description');
  descriptionInput.required = true;
  // due date input
  const dueDateWrapper = document.createElement('div');
  dueDateWrapper.classList.add('input-wrapper');
  const dueDateLabel = document.createElement('label');
  dueDateLabel.setAttribute('for', 'due-date');
  dueDateLabel.innerText = 'Due Date';
  const dueDateInput = document.createElement('input');
  dueDateInput.setAttribute('type', 'date');
  dueDateInput.setAttribute('name', 'due-date');
  dueDateInput.required = true;
  dueDateWrapper.appendChild(dueDateLabel);
  dueDateWrapper.appendChild(dueDateInput);
  // priority input
  const priorityWrapper = document.createElement('div');
  priorityWrapper.classList.add('input-wrapper');
  const priorityLabel = document.createElement('label');
  priorityLabel.setAttribute('for', 'priority');
  priorityLabel.innerText = 'Priority';
  const priorityInput = document.createElement('select');
  priorityInput.setAttribute('name', 'priority');
  priorityInput.required = true;
  const priorityOptions = ['low', 'medium', 'high'];
  priorityOptions.forEach(opt => {
    const option = document.createElement('option');
    option.innerText = opt;
    option.setAttribute('value', opt);
    priorityInput.appendChild(option);
  });
  priorityWrapper.appendChild(priorityLabel);
  priorityWrapper.appendChild(priorityInput);
  // submit button
  const submit = document.createElement('button');
  submit.setAttribute('type', 'submit');
  submit.innerText = 'Create';
  // populate form
  form.appendChild(titleInput);
  form.appendChild(descriptionInput);
  form.appendChild(dueDateWrapper);
  form.appendChild(priorityWrapper);
  form.appendChild(submit);
  // when form is submitted
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
  const form = document.createElement('form');
  form.setAttribute('id', 'delete-form');
  // delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'Delete';
  deleteBtn.setAttribute('id', 'delete-btn');
  deleteBtn.setAttribute('type', 'submit');
  deleteBtn.addEventListener('click', callback);
  // cancel button
  const cancelBtn = document.createElement('button');
  cancelBtn.innerText = 'Cancel';
  cancelBtn.setAttribute('id', 'cancel-btn');
  // populate form
  form.appendChild(deleteBtn);
  form.appendChild(cancelBtn);
  // when form is submitted
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
    callbackFunc = () => deleteProject(item);
  } else {
    // task object was passed in
    callbackFunc = () => deleteTask(item.title, getActiveProjectID());
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
  while (modalBody.hasChildNodes()) {
    modalBody.removeChild(modalBody.lastChild);
  }
  // hide the modal
  modal.style.display = 'none';
}

// expand/shrink task
function toggleTaskInfo() {
  console.log('clicked');
}

// add event listeners
function addEventListeners() {
  newProject.addEventListener('click', openNewProjectModal);
  newTask.addEventListener('click', openNewTaskModal);
}

export default {
  renderProjects,
  renderTasks,
  addEventListeners
};
