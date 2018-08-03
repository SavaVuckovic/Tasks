// select important DOM elements
const newProject = document.querySelector('#new-project');
const newTask = document.querySelector('#new-task');
const projectList = document.querySelector('#project-list');
const tasksList = document.querySelector('#tasks-list');

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

// open new project modal


// open new task modal


// open delete modal


// expand task


// shrink task


// add event listeners


export default {
  renderProjects,
  renderTasks
};