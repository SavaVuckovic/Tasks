import storage from './storage';
import { getActiveProjectID } from './projects';

export class Task {
  constructor(projectID, title, description, dueDate, priority) {
    this.projectID = projectID;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.complete = false;
  }
}

let tasks;

export function getTasks() {
  return tasks;
}

export function setTasks(tasksArray) {
  tasks = tasksArray;
}

// create a task
export function createTask(projectID, title, description, dueDate, priority) {
  const task = new Task(projectID, title, description, dueDate, priority);
  tasks.push(task);
  storage.saveTask(task);
}

export function completeTask(task) {
  const taskToComplete = tasks.find(t => t.title === task.title);
  taskToComplete.complete = true;
  storage.completeTask(task);
}

// delete task
export function deleteTask(taskName) {
  const taskToDel = tasks.find(t => t.title === taskName && t.projectID === getActiveProjectID());
  tasks.splice(tasks.indexOf(taskToDel), 1);
  storage.deleteTask(taskName);
}

// delete all tasks that belong to specific project
export function deleteProjectTasks(projectID) {
  const tasksToDel = tasks.filter(task => task.projectID === projectID);
  tasksToDel.forEach(task => {
    tasks.splice(tasks.indexOf(task), 1);
    storage.deleteTask(task.title);
  });
}

export function sortTasksByPriority(tasks) {
  const low = tasks.filter(task => task.priority === 'low' && !task.complete);
  const medium = tasks.filter(task => task.priority === 'medium' && !task.complete);
  const high = tasks.filter(task => task.priority === 'high' && !task.complete);
  const complete = tasks.filter(task => task.complete);
  return [...high, ...medium, ...low, ...complete];
}
