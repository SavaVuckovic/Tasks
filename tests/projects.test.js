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

test('Project instance creation', () => {
  const projectInfo = {
    name: 'Example Name',
    description: 'Example Description'
  };
  const project = new Project(1, projectInfo);

  expect(project.id).toBe(1);
  expect(project.name).toBe('Example Name');
  expect(project.description).toBe('Example Description');
});

describe('setting and getting project variables', () => {
  test('setting and getting projects', () => {
    const projectOne = new Project(1, { name: 'One', description: 'Desc 1' });
    const projectTwo = new Project(2, { name: 'Two', description: 'Desc 2' });
    const exampleProjects = [projectOne, projectTwo];

    setProjects(exampleProjects);
    expect(getProjects()).toEqual(expect.arrayContaining(exampleProjects));
  });

  test('setting and getting active project ID', () => {
    setActiveProjectID(1);
    expect(getActiveProjectID()).toBe(1);
  });
});