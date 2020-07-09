const express = require('express');
const router = express.Router();

const validation = require('../validation');
const Project = require('../models/Project');
const Episode = require('../models/Episode');
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

/// SPECIFIC COMMENTS OF SPECIFIC EPISODE ///

//GET all comments of exist episode - usersOnly
router.get('/', async (req, res) => {
    console.log("sadf");

    const project = await Project.findOne({name: req.project});
    if(!project){
        return res.status(404).send('Project Not Found');
    }

    const episode = project.episodes.find(episode => {
        if(episode.episodeNumber == req.episode) {
            return true;
        }
        return false;
    });

    if(episode) {
        return res.status(200).json(episode.comments);
    }

    return res.status(404).send('Episode Not Found');
});


module.exports = router;