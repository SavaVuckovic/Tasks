// select important DOM elements
const newProject = document.querySelector('#new-project');
const newTask = document.querySelector('#new-task');
const projectList = document.querySelector('#project-list');
const tasksList = document.querySelector('#tasks-list');
const newProjectModal = document.querySelector('#new-project-modal');
const newTaskModal = document.querySelector('#new-task-modal');

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
  form.innerHTML = 'TEST';
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
  addEventListeners
};