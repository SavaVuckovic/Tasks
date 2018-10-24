import uniqid from 'uniqid';
import storage from '../src/js/storage';

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
};

global.localStorage = new LocalStorageMock();


describe('project operations', () => {
  const id = uniqid();

  test('saving and fetching projects', () => {
    storage.saveProject({ id });

    expect(storage.fetchProjects()).toEqual(expect.arrayContaining([{ id }]));
  });

  test('deleting projects', () => {
    storage.deleteProject(id);

    expect(storage.fetchProjects()).toEqual(expect.arrayContaining([]));
  });
});

describe('task operations', () => {
  const exampleTask = {
    title: 'Example',
    complete: false
  };

  test('saving and fetching tasks', () => {
    storage.saveTask(exampleTask);

    expect(storage.fetchTasks()).toEqual(expect.arrayContaining([exampleTask]));
  });

  test('completing tasks', () => {
    storage.completeTask(exampleTask);
    const task = storage.fetchTasks()[0];

    expect(task.complete).toBeTruthy();
  });

  test('deleting tasks', () => {
    storage.deleteTask('Example');

    expect(storage.fetchTasks()).toEqual(expect.arrayContaining([]));
  });
});