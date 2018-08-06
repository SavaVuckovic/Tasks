import { setActiveProject } from './index';

// select important DOM elements
const newProject = document.querySelector('#new-project');
const newTask = document.querySelector('#new-task');
const projectList = document.querySelector('#project-list');
const tasksList = document.querySelector('#tasks-list');
const newProjectModal = document.querySelector('#new-project-modal');
const newTaskModal = document.querySelector('#new-task-modal');
const deleteModal = document.querySelector('#delete-modal');

// render projects
function renderProjects(projects, activeProjectID) {
  // clear projects list
  while (projectList.hasChildNodes()) {
    projectList.removeChild(projectList.lastChild);
  }
  projects.forEach(project => {
    // project div
    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project');
    if (project.id === activeProjectID) {
      projectDiv.classList.add('active');
    }
    // add listener for selecting active project
    projectDiv.addEventListener('click', () => setActiveProject(project.id));
    // name
    const name = document.createElement('h3');
    name.innerText = project.name;
    // description
    const description = document.createElement('p');
    description.innerText = project.description;
    // populate and append to project list
    projectDiv.appendChild(name);
    projectDiv.appendChild(description);
    projectList.appendChild(projectDiv);
  });
}

// render tasks
function renderTasks(tasks) {
  tasks.forEach(task => {
    // task div
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    // render border color based on priority
    taskDiv.classList.add(task.priority);
    // title
    const title = document.createElement('h3');
    title.innerText = task.title;
    // expand icon
    const expand = document.createElement('i');
    expand.classList.add('fas');
    expand.classList.add('fa-arrow-down');
    // populate and append to tasks list
    taskDiv.appendChild(title);
    taskDiv.appendChild(expand);
    tasksList.appendChild(taskDiv);
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
  // description input
  const descriptionInput = document.createElement('input');
  descriptionInput.setAttribute('type', 'text');
  descriptionInput.setAttribute('name', 'description');
  descriptionInput.setAttribute('placeholder', 'Project Description');
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
    console.log('submitted');
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
  // description input
  const descriptionInput = document.createElement('input');
  descriptionInput.setAttribute('type', 'text');
  descriptionInput.setAttribute('name', 'description');
  descriptionInput.setAttribute('placeholder', 'Task Description');
  // due date input
  const dueDateWrapper = document.createElement('div');
  dueDateWrapper.classList.add('input-wrapper');
  const dueDateLabel = document.createElement('label');
  dueDateLabel.setAttribute('for', 'due-date');
  dueDateLabel.innerText = 'Due Date';
  const dueDateInput = document.createElement('input');
  dueDateInput.setAttribute('type', 'date');
  dueDateInput.setAttribute('name', 'due-date');
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
    console.log('submitted');
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
function createDeleteForm() {
  const form = document.createElement('form');
  form.setAttribute('id', 'delete-form');
  // delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'Delete';
  deleteBtn.setAttribute('id', 'delete-btn');
  deleteBtn.setAttribute('type', 'submit');
  // deleteBtn.addEventListener('click' , () => {});
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
    console.log('submitted');
    closeModal(deleteModal);
  });

  return form;
}

// open delete modal
function openDeleteModal() {
  // show the modal
  deleteModal.style.display = 'block';
  // populate the modal body with delete form
  const body = document.querySelector('div#delete-modal .modal-body');
  const form = createDeleteForm();
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

// expand task


// shrink task


// add event listeners
function addEventListeners() {
  newProject.addEventListener('click', openNewProjectModal);
  newTask.addEventListener('click', openNewTaskModal);
}

export default {
  renderProjects,
  renderTasks,
  addEventListeners,
  openDeleteModal
};