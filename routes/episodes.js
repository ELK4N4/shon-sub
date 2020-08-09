const express = require('express');
const router = express.Router();

const validation = require('../validation');
const Project = require('../models/Project');
const Episode = require('../models/Episode');
const User = require('../models/User');
const getData = require('../data');
const adminOnly = require('./auth/adminOnly');
const usersOnly = require('./auth/usersOnly');
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


/// SPECIFIC EPISODES OF SPECIFIC PROJECT ///


//GET specific episode of exist project - usersOnly
router.get('/:episode', usersOnly, async (req, res) => {
    const data = await getData('projects', req.user);
    

    const project = await Project.findOne({name: req.project});
    if(!project){
        return res.status(404).send('Project Not Found');
    }

    const episode = project.episodes.find(episode => {
        if(episode.episodeNumber == req.params.episode) {
            episode.views++;
            return true;
        }
        return false
    });

    


    if(episode) {
        await project.save();


        let episodeIndex = project.episodes.findIndex(episode => {
            if(episode.episodeNumber == req.params.episode) {
                return true;
            }
            return false
        });;


        let recommendedEpisodes = [];
        let toggle = true;
        let rotations = 0;
        let rightIndex = 0;
        let leftIndex = 0;
        let counter = 0;
        while (counter < 4 && rotations <= project.episodes.length) {

            if (toggle) {
                rightIndex++;
                if (project.episodes[episodeIndex + rightIndex]) {
                    recommendedEpisodes.push(project.episodes[episodeIndex + rightIndex]);
                    counter++;
                }
                toggle = !toggle;
            } //PAY ATTENTION: There is no Else ↓ here ↓ in purpose
            if (!toggle) {
                leftIndex--;
                if (project.episodes[episodeIndex + leftIndex]) {
                    recommendedEpisodes.push(project.episodes[episodeIndex + leftIndex]);
                    counter++;
                }
                toggle = !toggle;
            }
            rotations++;
        }

        recommendedEpisodes.sort(function(a, b){
            return b.episodeNumber - a.episodeNumber
        });

        recommendedEpisodes.reverse();

        
        for (let index = 0; index < episode.comments.length; index++) {
            episode.comments[index].user = await User.findOne({_id: episode.comments[index].addedBy});
        }

        return res.status(200).render('projects/episodes/episode.ejs',{data, project, episode, recommendedEpisodes});
    }

    return res.status(404).send('Episode Not Found');
});

//POST new episode to exist project - adminOnly
router.post('/', adminOnly, uploadEpisode.single('cover'), async (req, res) => {

    //const fileName = req.file != null ? req.file.filename : null;
    const fileName = req.body.image != '' ? req.body.image : null;


    const {error} = validation.episodeValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const newEpisode = {
        episodeName: req.body.episodeName,
        episodeNumber: req.body.episodeNumber,
        link: req.body.link,
        coverImageName: fileName
    };



    const projectName = req.project;

    const project = await Project.findOne({name: projectName});
    if(!project){
        return res.status(404).send('Project Not Found');
    }

    const epidoseExist = project.episodes.find(episode => episode.episodeNumber == req.body.episodeNumber);

    if(epidoseExist && project.episodes.length > 0) { 
        return res.status(404).send('Episode ' + req.body.episodeNumber + ' is exist');
    }


    project.episodes.push(newEpisode);

    await project.save();

    res.status(200).redirect(`/projects/${projectName}`);
});

//DELETE episode from exist project - adminOnly
router.delete('/:episode', adminOnly, async (req, res) => {
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


    res.send(deleted.episodes[epidoseIndex]);
});



//UPDATE episode - adminOnly
router.put('/:episode', adminOnly, uploadEpisode.single('cover'), async (req, res) => {
    const {error} = validation.episodeValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const fileName = req.body.image != '' ? req.body.image : null;

    const project = await Project.findOne({name: req.project});

    let newEpisode = req.body;
    newEpisode.coverImageName = fileName;

    if(!project){
        return res.status(404).send('Project Not Found');
    }

    let epidoseExist = project.episodes.find(episode => episode.episodeNumber == req.params.episode);

    if(!epidoseExist) {
        return res.status(404).send('Episode ' + req.params.episode + ' not found');
    }

    
    
    const updatedEpisode = Object.assign(epidoseExist, newEpisode);

   

    const checkEpisode = await Project.updateOne(
        { "name" : req.project, "episodes.episodeNumber": req.params.episode }, 
        { "$set": { "episodes.$": updatedEpisode }}
    );

    if(checkEpisode.ok){
        return res.send(updatedEpisode);
    }

    res.status(404).send('Error');
});


/*** COMMENTS ***/

commentsRouter = require('./comments');
router.use('/:episode/comments/', (req, res, next) => {
    const episodeNumber = req.params.episode;
    req.episode = episodeNumber;
    next();
}, commentsRouter);


module.exports = router;
