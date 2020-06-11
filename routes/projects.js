const express = require('express');
const router = express.Router();
const validation = require('../validation');
const Project = require('../models/Project');
const getData = require('../data');
const adminOnly = require('./auth/adminOnly');
//Setup Upload IMGs
const path = require('path');
const uploadProjectsPath = path.join('public', Project.coverImageBasePath);
const multer = require('multer');
const imageMimeTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif',];
const uploadProject = multer({
    dest: uploadProjectsPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype));
    }
});

const fs = require('fs');
const removeImage = function(uploadPath, deletedItem) {
    if(deletedItem.coverImageName) {
        fs.unlink(path.join(uploadPath, deletedItem.coverImageName), (err) => {
            if (err) {
                console.log("failed to delete local image:"+err);
            } else {
                console.log('successfully deleted local image');                                
            }
        });  
    }
};

/*** ALL PROJECTS ***/

//GET all projects
router.get('/', async (req, res) => {

    const data = await getData('projects', req.user);
    res.render('projects/index.ejs', {data});
});

//GET "new-project" Page - adminOnly
router.get('/new-project', adminOnly, async (req, res) => {

    if(!req.user.verified) {
        return res.status(404).send("Not found");
    }
    
    const data = await getData('projects', req.user);
    res.render('projects/newProject.ejs', {data});
});

//GET all episodes of exist project
router.get('/:project', async (req, res) => {
    const data = await getData('project', req.user);
    
    const projectName = req.params.project.replace(/-/g," ");

    const project = await Project.findOne({name: projectName});
    if(project){
        return res.render('projects/project.ejs',{data, project});
    }
    
    res.status(404).send('Project Not Found');
});


//POST new project - adminOnly
router.post('/', adminOnly, uploadProject.single('cover'), async (req, res) => {
    
    const fileName = req.file != null ? req.file.filename : null;
    const project = new Project({
        name: req.body.name,
        englishName: req.body.englishName,
        japaneseName: req.body.japaneseName,
        summary: req.body.summary,
        process: req.body.process,
        episodesNumber: req.body.episodesNumber,
        genre: req.body.genre,
        addedBy: req.user._id,
        coverImageName: fileName
    });
    
    const {error} = validation.newProjectValidation(req.body);
    if(error) {
        removeImage(uploadProjectsPath, project);
        return res.status(400).send(error.details[0].message);
    }
    if(!req.user.verified) {
        removeImage(uploadProjectsPath, project);
        return res.status(404).send("Not found");
    }
    const projectExist = await Project.findOne({name: req.body.name});

    if(projectExist) {
        removeImage(uploadProjectsPath, project);
        return res.status(400).send('Project already exist');
    }


    try {
        const savedProject = await project.save();
        res.status(200).redirect('/');
    } catch(err) {
        removeImage(uploadProjectsPath, project);
        res.status(400).send(err);
    }

});

//DELETE exist project - adminOnly
router.delete('/:project', async (req, res) => {
    const projectName = req.params.project.replace(/-/g," ");
    const deletedProject = await Project.findOneAndRemove({ name: projectName });
    if (deletedProject) {
        removeImage(uploadProjectsPath, deletedProject);
        res.status(200).send(deletedProject);
    }
    else {
        res.status(401).send("error");
    }
});

//UPDATE project - adminOnly
router.put('/:project', uploadProject.single('cover'), async (req, res) => {
    let updatedProject = req.body;
    if(req.file) {
        updatedProject.coverImageName = req.file.filename;
    }

    const projectName = req.params.project.replace(/-/g," ");

    updatedProject = await Project.findOneAndUpdate({name: projectName}, updatedProject, {new: true});

    if(!updatedProject){
        return res.status(404).send('Project Not Found');
    }

    res.status(200).send(updatedProject);
});



/*** SPECIFIC EPISODES ***/


episodesRouter = require('./episodes');
router.use('/:project/', (req, res, next) => {
    const projectName = req.params.project.replace(/-/g," ");
    req.project = projectName;
    next();
  }, episodesRouter);


module.exports = router;
