export default class Task {
  constructor({ projectID, title, description, dueDate, priority }) {
    this.projectID = projectID;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.complete = false;
  }
}
