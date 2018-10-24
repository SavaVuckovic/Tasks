import uniqid from 'uniqid';
import {
  Task,
  getTasks,
  setTasks,
  createTask,
  completeTask,
  deleteTask,
  deleteProjectTasks,
  sortTasksByPriority
} from '../src/js/tasks';

test('Task instance', () => {
  const id = uniqid();
  const task = new Task(id, 'Title', 'Description', '2018-10-12', 'high');

  expect(task.projectID).toBe(id);
  expect(task.title).toBe('Title');
  expect(task.description).toBe('Description');
  expect(task.dueDate).toBe('2018-10-12');
  expect(task.priority).toBe('high');
  expect(task.complete).toBeFalsy();
});