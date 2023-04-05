const myProjects = [];

class Project {
  constructor(title) {
    this.title = title;
    return title;
  }
}

function makeNewProject(title) {
  let addProject = new Project(title);
  myProjects.push(addProject);
  return myProjects;
}

export { makeNewProject, myProjects };
