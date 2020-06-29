const express = require('express');
const router = express.Router();
const verify = require('./auth/verifyToken');
const getData = require('../data');

const Client = require('ftp');
 
let c = new Client();
c.on('ready', function() {
  
});
// connect to localhost:21 as anonymous
c.connect({
        host: "ftpupload.net",
        user: "epiz_26092518",
        password: "1xzkMfyxilj9",
        secure: false
    }
);


router.get('/projectCovers/:image', async (req, res) => {
    try {
        c.get('htdocs/uploads/projectCovers/' + req.params.image , function(err, stream) {
            if (err) {
                return res.redirect('/images/no-image.png');
            } else {
                stream.pipe(res);
            }
        });
    } catch (err) {
        //return res.redirect('/images/no-image.png');
    }



});

module.exports = router;