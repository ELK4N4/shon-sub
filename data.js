const Project = require('./models/Project');
let data = {};


module.exports = async (pageName, user) => {
    const activeProjects = await Project.find({process: "active"});
    const doneProjects = await Project.find({process: "done"});
    const freezeProjects = await Project.find({process: "freeze"});
    const plannedProjects = await Project.find({process: "planned"});
    const allProjects = {activeProjects, doneProjects, freezeProjects, plannedProjects};
    
    data = {
        page: {
            name: pageName
        },
        user: user,
        allProjects: allProjects
    }
    return data;
}