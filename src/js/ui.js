// select important DOM elements
const newProject = document.querySelector('#new-project');
const newTask = document.querySelector('#new-task');
const projectList = document.querySelector('#project-list');
const tasksList = document.querySelector('#tasks-list');
const newProjectModal = document.querySelector('#new-project-modal');
const newTaskModal = document.querySelector('#new-task-modal');
const deleteModal = document.querySelector('#delete-modal');

// render projects
function renderProjects(projects) {
  projects.forEach(project => {
    // project div
    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project');
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
  close.addEventListener('click', () => {
    // clear body contents & hide the modal
    while (body.hasChildNodes()) {
      body.removeChild(body.lastChild);
    }
    newProjectModal.style.display = 'none';
  });
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
  close.addEventListener('click', () => {
    // clear body contents & hide the modal
    while (body.hasChildNodes()) {
      body.removeChild(body.lastChild);
    }
    newTaskModal.style.display = 'none';
  });
}

// open delete modal
function openDeleteModal() {
  // show the modal
  deleteModal.style.display = 'block';
  // populate the modal body with delete form
  const body = document.querySelector('div#delete-modal .modal-body');
  const form = document.createElement('form');
  form.setAttribute('id', 'delete-form');
  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'Delete';
  deleteBtn.setAttribute('id', 'delete-btn');
  const cancelBtn = document.createElement('button');
  cancelBtn.innerText = 'Cancel';
  cancelBtn.setAttribute('id', 'cancel-btn');
  cancelBtn.addEventListener('click', () => {
    // clear body contents & hide the modal
    while (body.hasChildNodes()) {
      body.removeChild(body.lastChild);
    }
    deleteModal.style.display = 'none';
  });
  form.appendChild(deleteBtn);
  form.appendChild(cancelBtn);
  body.appendChild(form);
  // close button
  const close = document.querySelector('div#delete-modal .modal-close');
  close.addEventListener('click', () => {
    // clear body contents & hide the modal
    while (body.hasChildNodes()) {
      body.removeChild(body.lastChild);
    }
    deleteModal.style.display = 'none';
  });
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