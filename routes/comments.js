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
router.get('/', usersOnly, async (req, res) => {
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

//POST comments of exist episode - usersOnly
router.post('/', usersOnly, async (req, res) => {
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
        episode.comments.push({addedBy: req.user.name, message: req.body.message});
        project.save();
        return res.status(200).json(episode.comments);
    }


    return res.status(404).send('Episode Not Found');
});

//PUT comment of exist episode - usersOnly
router.put('/', async (req, res) => {
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
        const comment = episode.comments.find(comment => {
            if(comment._id == req.body.id) {
                comment.message = req.body.message;
                return true;
            }
            return false;
        });
        if(comment) {
            project.save();
            return res.status(200).json(episode.comments);
        } else {
            return res.status(404).send('Comment Not Found');
        }
    }


    return res.status(404).send('Episode Not Found');
});

//DELETE comment of exist episode - usersOnly
router.delete('/:id', async (req, res) => {
    const project = await Project.findOne({name: req.project});
    if(!project){
        return res.status(404).send('Project Not Found');
    }

    const episode = project.episodes.find(episode => {
        if(episode.episodeNumber == req.episode) {
            episode.comments = episode.comments.filter(comment => {
                if(comment._id != req.params.id) {
                    return true;
                }
                return false;
            });
            return true;
        }
        return false;
    });


    if(episode) {
        project.save();
        return res.status(200).json(episode.comments);
    }


    return res.status(404).send('Episode Not Found');
});

module.exports = router;