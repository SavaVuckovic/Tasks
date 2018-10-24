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

test('setting and getting tasks', () => {
  const task1 = new Task(uniqid(), 'One', 'Description 1', '2018-10-12', 'low');
  const task2 = new Task(uniqid(), 'Two', 'Description 2', '2018-10-12', 'medium');
  const tasksArray = [task1, task2];
  setTasks(tasksArray);

  expect(getTasks()).toEqual(expect.arrayContaining(tasksArray));
});

test('sorting tasks', () => {
  const tasks = [
    { priority: 'medium', complete: true },
    { priority: 'high', complete: false },
    { priority: 'low', complete: false },
    { priority: 'medium', complete: false },
    { priority: 'high', complete: true },
    { priority: 'medium', complete: false },
  ];

  const sortedTasks = sortTasksByPriority(tasks);

  expect(sortedTasks[0].priority).toBe('high');
  expect(sortedTasks[1].priority).toBe('medium');
  expect(sortedTasks[2].priority).toBe('medium');
  expect(sortedTasks[3].priority).toBe('low');
  expect(sortedTasks[4].complete).toBeTruthy();
  expect(sortedTasks[5].complete).toBeTruthy();
});

describe('operations on tasks', () => {
  const projectID = uniqid();

  test('creating a task', () => {
    createTask(projectID, 'Title', 'Description', '2018-10-12', 'high');

    expect(getTasks()).toContainEqual(expect.objectContaining({
      projectID,
      title: 'Title',
      description: 'Description',
      dueDate: '2018-10-12',
      priority: 'high',
      complete: false
    }));
  });

  test('completing a task', () => {
    const tasks = getTasks();
    const lastTask = tasks[tasks.length - 1];
    completeTask(lastTask);

    expect(getTasks()[tasks.length - 1].complete).toBeTruthy();
  });

  test('deleting a task', () => {
    deleteTask('Title');

    expect(getTasks()).not.toContainEqual(expect.objectContaining({ name: 'Title' }));
  });

  test('deleting tasks with specific project ID', () => {
    deleteProjectTasks(projectID);

    expect(getTasks()).not.toContainEqual(expect.objectContaining({ projectID }));
  });
});