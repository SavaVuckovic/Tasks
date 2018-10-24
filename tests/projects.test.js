import uniqid from 'uniqid';
import {
  Project,
  getProjects,
  setProjects,
  getActiveProjectID,
  setActiveProject,
  createProject,
  createDefaultProject,
  deleteProject,
  setActiveProjectID
} from '../src/js/projects';

test('Project instance', () => {
  const id = uniqid();
  const project = new Project(id, 'Example Name', 'Example Description');

  expect(project.id).toBe(id);
  expect(project.name).toBe('Example Name');
  expect(project.description).toBe('Example Description');
});

describe('setting and getting project variables', () => {
  test('setting and getting projects', () => {
    const projectOne = new Project(uniqid(), 'One', 'Desc 1');
    const projectTwo = new Project(uniqid(), 'Two', 'Desc 2');
    const projectsArray = [projectOne, projectTwo];
    setProjects(projectsArray);

    expect(getProjects()).toEqual(expect.arrayContaining(projectsArray));
  });

  test('setting and getting active project ID', () => {
    setActiveProjectID(1);

    expect(getActiveProjectID()).toBe(1);
  });
});

describe('operation on projects', () => {
  const id = uniqid();

  test('creating a project', () => {
    createProject(id, 'Example Name', 'Example Description');

    expect(getProjects()).toContainEqual(expect.objectContaining({
      id,
      name: 'Example Name',
      description: 'Example Description'
    }));
  });

  test('creating a default project', () => {
    const expectedObj = {
      name: 'Default Project',
      description: 'Project description goes here'
    };
    createDefaultProject();

    expect(getProjects()).toContainEqual(expect.objectContaining(expectedObj));
  });

  test('deleting a project', () => {
    deleteProject(id);

    expect(getProjects()).not.toContainEqual(expect.objectContaining({ id }));
  });
});