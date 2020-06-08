const Project = require('./models/Project');
let data = {};


module.exports = async (pageName, user) => {
    const activeProjects = await Project.find({process: "active"});
    const doneProjects = await Project.find({process: "done"});
    const freezeProjects = await Project.find({process: "freeze"});
    const allProjects = {activeProjects, doneProjects, freezeProjects};
    
    data = {
        page: {
            name: pageName
        },
        user: user,
        allProjects: allProjects
    }
    return data;
}