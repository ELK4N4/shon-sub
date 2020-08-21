const Project = require('./models/Project');
const User = require('./models/User');
let data = {};


module.exports = async (pageName, pageHebName, user) => {
    const activeProjects = await Project.find({process: "active"});
    const doneProjects = await Project.find({process: "done"});
    const freezeProjects = await Project.find({process: "freeze"});
    const plannedProjects = await Project.find({process: "planned"});
    const allProjects = {activeProjects, doneProjects, freezeProjects, plannedProjects};
    const usersCount = await User.countDocuments({});
    
    if(!typeof usersCount === 'number') {
        usersCount = 'Error';
    }

    data = {
        page: {
            name: pageName,
            hebName: pageHebName
        },
        user: user,
        allProjects: allProjects,
        usersCount: usersCount
    }
    return data;
}