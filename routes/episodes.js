const express = require('express');
const router = express.Router();

const validation = require('../validation');
const Project = require('../models/Project');
const Episode = require('../models/Episode');
const getData = require('../data');
const adminOnly = require('./auth/adminOnly');
//Setup Upload IMGs
const path = require('path');
const uploadEpisodesPath = path.join('public', Episode.coverImageBasePath);
const multer = require('multer');
const imageMimeTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif',];
const uploadEpisode = multer({
    dest: uploadEpisodesPath,
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


/// SPECIFIC EPISODES OF SPECIFIC PROJECT ///


//GET specific episode of exist project
router.get('/:episode', async (req, res) => {
    const data = await getData('projects', req.user);
    
    const project = await Project.findOne({name: req.project});
    if(!project){
        return res.status(404).send('Project Not Found');
    }
    const episode = project.episodes.find(episode => episode.episodeNumber == req.params.episode);

    if(episode) {
        return res.status(200).render('projects/episode.ejs',{data, project, episode});
    }

    return res.status(404).send('Episode Not Found');
});

//POST new episode to exist project - adminOnly
router.post('/', uploadEpisode.single('cover'), async (req, res) => {

    const fileName = req.file != null ? req.file.filename : null;

    const newEpisode = {
        episodeName: req.body.episodeName,
        episodeNumber: req.body.episodeNumber,
        link: req.body.link,
        coverImageName: fileName
    };


    const project = await Project.findOne({name: req.project});
    if(!project){
        removeImage(uploadEpisodesPath, newEpisode);
        return res.status(404).send('Project Not Found');
    }

    const epidoseExist = project.episodes.find(episode => episode.episodeNumber == req.body.episodeNumber);

    if(epidoseExist && project.episodes.length > 0) { 
        removeImage(uploadEpisodesPath, newEpisode);
        return res.status(404).send('Episode ' + req.body.episodeNumber + ' is exist');
    }

    

    project.episodes.push(newEpisode);

    await project.save();

    res.send(newEpisode);
});

//DELETE episode from exist project - adminOnly
router.delete('/:episode', async (req, res) => {
    const project = await Project.findOne({name: req.project});
    if(!project){
        return res.status(404).send('Project Not Found');
    }

    const epidoseIndex = project.episodes.findIndex(episode => episode.episodeNumber == req.params.episode);

    if(epidoseIndex == -1) { 
        return res.status(404).send('Episode ' + req.params.episode + ' not found');
    }

    //deleting specific episode
    const deleted = await Project.findOneAndUpdate( 
        { name: req.project },
        { $pull: { episodes : { episodeNumber : req.params.episode } } },
        { safe: true },
    );

    removeImage(uploadEpisodesPath, deleted.episodes[epidoseIndex]);

    res.send(deleted.episodes[epidoseIndex]);
});



//UPDATE episode - adminOnly
router.put('/:episode', uploadEpisode.single('cover'), async (req, res) => {
    const project = await Project.findOne({name: req.project});

    let newEpisode = req.body;
    if(req.file) {
        newEpisode.fileName = req.file.fileName;
    }

    if(!project){
        removeImage(uploadEpisodesPath, newEpisode);
        return res.status(404).send('Project Not Found');
    }

    let episode = project.episodes.find(episode => episode.episodeNumber == req.params.episode);

    if(!episode) {
        removeImage(uploadEpisodesPath, newEpisode);
        return res.status(404).send('Episode ' + req.params.episode + ' not found');
    }

    
    
    const updatedEpisode = Object.assign(episode, newEpisode);

    const checkEpisode = await Project.updateOne(
        { "name" : req.params.project, "episodes.episodeNumber": req.params.episode }, 
        { "$set": { "episodes.$": updatedEpisode }}
    );

    if(checkEpisode.ok){
        return res.send(updatedEpisode);
    }

    removeImage(uploadEpisodesPath, newEpisode);
    res.status(404).send('Error');
});

module.exports = router;
